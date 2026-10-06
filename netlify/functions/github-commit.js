/**
 * Netlify Serverless Function: github-commit
 * ─────────────────────────────────────────
 * Commits one or more file changes to the portfolio GitHub repo.
 * The GitHub PAT is stored ONLY as a Netlify environment variable (GITHUB_PAT).
 * It is never exposed in source code or to the browser.
 *
 * POST /.netlify/functions/github-commit
 * Body: { message: string, files: [{ path: string, content: string }] }
 */

const OWNER  = 'Kaiserabbas';
const REPO   = 'portfolio-2027';
const BRANCH = 'main';

const GH = (path, options = {}) =>
  fetch(`https://api.github.com/repos/${OWNER}/${REPO}/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_PAT}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'qaisar-portfolio-admin/1.0',
      ...options.headers,
    },
  });

export const handler = async (event) => {
  // CORS headers for browser calls
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  if (!process.env.GITHUB_PAT) {
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: 'GITHUB_PAT environment variable not set in Netlify dashboard.' }),
    };
  }

  let message, files;
  try {
    ({ message, files } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!message || !files || !files.length) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'message and files[] are required' }) };
  }

  try {
    // 1. Get current HEAD commit SHA
    const refRes  = await GH(`git/ref/heads/${BRANCH}`);
    const refData  = await refRes.json();
    if (!refRes.ok) throw new Error(`GitHub ref error: ${refData.message}`);
    const latestSha = refData.object.sha;

    // 2. Get the tree SHA from that commit
    const commitRes  = await GH(`git/commits/${latestSha}`);
    const commitData  = await commitRes.json();
    if (!commitRes.ok) throw new Error(`GitHub commit error: ${commitData.message}`);
    const treeSha = commitData.tree.sha;

    // 3. Create a blob for each file
    const blobs = await Promise.all(
      files.map(async ({ path, content }) => {
        const blobRes  = await GH('git/blobs', {
          method: 'POST',
          body: JSON.stringify({
            content: Buffer.from(content, 'utf-8').toString('base64'),
            encoding: 'base64',
          }),
        });
        const blobData  = await blobRes.json();
        if (!blobRes.ok) throw new Error(`Blob error for ${path}: ${blobData.message}`);
        return { path, mode: '100644', type: 'blob', sha: blobData.sha };
      })
    );

    // 4. Create a new tree based on the existing one
    const treeRes  = await GH('git/trees', {
      method: 'POST',
      body: JSON.stringify({ base_tree: treeSha, tree: blobs }),
    });
    const treeData  = await treeRes.json();
    if (!treeRes.ok) throw new Error(`Tree error: ${treeData.message}`);

    // 5. Create the commit
    const newCommitRes  = await GH('git/commits', {
      method: 'POST',
      body: JSON.stringify({
        message,
        tree: treeData.sha,
        parents: [latestSha],
      }),
    });
    const newCommitData  = await newCommitRes.json();
    if (!newCommitRes.ok) throw new Error(`Commit error: ${newCommitData.message}`);

    // 6. Advance the branch reference
    const updateRes  = await GH(`git/refs/heads/${BRANCH}`, {
      method: 'PATCH',
      body: JSON.stringify({ sha: newCommitData.sha, force: false }),
    });
    const updateData  = await updateRes.json();
    if (!updateRes.ok) throw new Error(`Ref update error: ${updateData.message}`);

    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        success: true,
        commitSha: newCommitData.sha,
        commitUrl: `https://github.com/${OWNER}/${REPO}/commit/${newCommitData.sha}`,
      }),
    };
  } catch (err) {
    console.error('github-commit error:', err);
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
