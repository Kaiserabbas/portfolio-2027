import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiShieldCheckLine,
  RiLogoutBoxLine,
  RiPaletteLine,
  RiFolderAddLine,
  RiUserSettingsLine,
  RiFileAddLine,
  RiGithubLine,
  RiCheckLine,
  RiCloseLine,
  RiUploadLine,
  RiRefreshLine,
  RiSaveLine,
  RiLoaderLine,
  RiAddLine,
  RiAlertLine,
  RiCheckboxCircleLine,
  RiExternalLinkLine,
  RiSendPlaneLine,
  RiNetflixLine,
} from 'react-icons/ri';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useFontPreset, FONT_PRESETS } from '../hooks/useFontPreset';

// ─── Netlify function endpoint ─────────────────────────────────────
const COMMIT_FN = '/.netlify/functions/github-commit';
const RAW_BASE  = 'https://raw.githubusercontent.com/Kaiserabbas/portfolio-2027/main';

async function commitToGitHub(message, files) {
  const res = await fetch(COMMIT_FN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, files }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Commit failed');
  return data;
}

async function fetchCurrentJson(path) {
  const res = await fetch(`${RAW_BASE}/${path}?t=${Date.now()}`);
  if (!res.ok) throw new Error(`Could not fetch ${path}`);
  return res.json();
}

// ─── Reusable UI components ────────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${props.className || ''}`}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      rows={props.rows || 3}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none ${props.className || ''}`}
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${props.className || ''}`}
    >
      {children}
    </select>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900">
        <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
          <Icon size={17} />
        </div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-[400] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white text-sm font-medium animate-[slideInRight_0.3s_ease-out] ${type === 'success' ? 'bg-gradient-to-r from-emerald-600 to-teal-500' : 'bg-gradient-to-r from-red-600 to-rose-500'}`}>
      {type === 'success' ? <RiCheckboxCircleLine size={18} /> : <RiAlertLine size={18} />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><RiCloseLine size={16} /></button>
    </div>
  );
}

// ─── Font Selector ─────────────────────────────────────────────────
function FontSection() {
  const { activePresetId, setPreset, resetFont } = useFontPreset();

  return (
    <SectionCard title="Font Style" icon={RiPaletteLine}>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Select a font pairing. Changes apply instantly and are saved to your browser.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {FONT_PRESETS.map((preset) => {
          const active = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => active ? resetFont() : setPreset(preset.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                active
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {preset.emoji} {preset.label}
                </span>
                {active && <RiCheckLine size={16} className="text-emerald-600 dark:text-emerald-400" />}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{preset.impression}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium">H: {preset.heading}</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">B: {preset.body}</span>
              </div>
            </button>
          );
        })}
      </div>
      {activePresetId && (
        <button onClick={resetFont} className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-red-500 transition">
          <RiRefreshLine size={14} /> Reset to Default (Inter)
        </button>
      )}
    </SectionCard>
  );
}

// ─── Add Project ───────────────────────────────────────────────────
const EMPTY_PROJECT = {
  title: '', category: 'it', platform: 'webapp', featured: false,
  description: '', longDescription: '', image: '', gallery: '',
  liveUrl: '', studyUrl: '', client: '', location: '',
  duration: '', year: '', result: '', tags: '', tech: '',
};

function AddProjectSection({ onToast }) {
  const [form, setForm]       = useState(EMPTY_PROJECT);
  const [committing, setCommitting] = useState(false);

  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const buildEntry = () => ({
    id: Date.now(),
    category: form.category,
    platform: form.platform,
    featured: form.featured,
    title: form.title,
    description: form.description,
    longDescription: form.longDescription,
    image: form.image,
    gallery: form.gallery ? form.gallery.split('\n').map(s => s.trim()).filter(Boolean) : [],
    liveUrl: form.liveUrl,
    studyUrl: form.studyUrl,
    client: form.client,
    location: form.location,
    duration: form.duration,
    year: form.year,
    result: form.result,
    tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
    tech: form.tech ? form.tech.split(',').map(s => s.trim()).filter(Boolean) : [],
    sectorClass: form.category === 'landscape' ? 'sector-landscape' : 'sector-it',
    sectorLabel: form.category === 'landscape' ? 'Landscape Engineering' : 'IT & Web',
    tagClass: form.category === 'landscape' ? 'tag-green' : 'tag-blue',
  });

  const handleCommit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { onToast('Title is required', 'error'); return; }
    setCommitting(true);
    try {
      // Fetch current admin-additions.json from GitHub
      const current = await fetchCurrentJson('src/data/admin-additions.json');
      current.projects.push(buildEntry());

      await commitToGitHub(
        `feat: add project "${form.title}" via admin panel`,
        [{ path: 'src/data/admin-additions.json', content: JSON.stringify(current, null, 2) }]
      );
      onToast(`"${form.title}" committed! Netlify will rebuild in ~60s.`, 'success');
      setForm(EMPTY_PROJECT);
    } catch (err) {
      onToast(`Error: ${err.message}`, 'error');
    }
    setCommitting(false);
  };

  return (
    <SectionCard title="Add New Project" icon={RiFolderAddLine}>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Fill in the details and click <strong>Commit to GitHub</strong>. Netlify will auto-rebuild and publish within ~60 seconds.
      </p>
      <form onSubmit={handleCommit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title *">
            <Input value={form.title} onChange={e => up('title', e.target.value)} placeholder="Project title" />
          </Field>
          <Field label="Year">
            <Input value={form.year} onChange={e => up('year', e.target.value)} placeholder="e.g. 2024-2025" />
          </Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Category">
            <Select value={form.category} onChange={e => up('category', e.target.value)}>
              <option value="it">IT / Web / AI</option>
              <option value="landscape">Landscape</option>
            </Select>
          </Field>
          <Field label="Platform">
            <Select value={form.platform} onChange={e => up('platform', e.target.value)}>
              <option value="webapp">Web App</option>
              <option value="both">Web & Android</option>
            </Select>
          </Field>
          <Field label="Featured">
            <Select value={form.featured ? 'true' : 'false'} onChange={e => up('featured', e.target.value === 'true')}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </Select>
          </Field>
        </div>
        <Field label="Short Description (card)">
          <Textarea value={form.description} onChange={e => up('description', e.target.value)} rows={2} placeholder="1-2 sentence overview shown on the project card" />
        </Field>
        <Field label="Long Description (modal)">
          <Textarea value={form.longDescription} onChange={e => up('longDescription', e.target.value)} rows={4} placeholder="Detailed description shown when the project card is opened" />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Main Image URL" hint="/images/projects/filename.png">
            <Input value={form.image} onChange={e => up('image', e.target.value)} placeholder="/images/projects/..." />
          </Field>
          <Field label="Live URL">
            <Input value={form.liveUrl} onChange={e => up('liveUrl', e.target.value)} placeholder="https://..." />
          </Field>
        </div>
        <Field label="Gallery Images" hint="One URL per line">
          <Textarea value={form.gallery} onChange={e => up('gallery', e.target.value)} rows={3} placeholder={`/images/projects/img1.png\n/images/projects/img2.png`} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Client"><Input value={form.client} onChange={e => up('client', e.target.value)} placeholder="Client name" /></Field>
          <Field label="Location"><Input value={form.location} onChange={e => up('location', e.target.value)} placeholder="City, Country" /></Field>
          <Field label="Duration"><Input value={form.duration} onChange={e => up('duration', e.target.value)} placeholder="e.g. 3 months" /></Field>
          <Field label="Result"><Input value={form.result} onChange={e => up('result', e.target.value)} placeholder="Key outcome" /></Field>
        </div>
        <Field label="Tags" hint="Comma separated"><Input value={form.tags} onChange={e => up('tags', e.target.value)} placeholder="React, AI, Landscape..." /></Field>
        <Field label="Tech Stack" hint="Comma separated"><Input value={form.tech} onChange={e => up('tech', e.target.value)} placeholder="React, Node.js, Tailwind..." /></Field>

        <button type="submit" disabled={committing} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition shadow-sm disabled:opacity-60">
          {committing ? <RiLoaderLine size={16} className="animate-spin" /> : <RiGithubLine size={16} />}
          {committing ? 'Committing...' : 'Commit to GitHub'}
        </button>
      </form>
    </SectionCard>
  );
}

// ─── Add Credential ────────────────────────────────────────────────
const EMPTY_CERT = {
  id: '', title: '', issuer: '', year: '', issueDate: '',
  category: 'software', description: '', detail: '',
  icon: 'code', link: '', imageUrl: '',
};

function AddCredentialSection({ onToast }) {
  const [form, setForm]       = useState(EMPTY_CERT);
  const [committing, setCommitting] = useState(false);
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleCommit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { onToast('Title is required', 'error'); return; }
    setCommitting(true);
    try {
      const current = await fetchCurrentJson('src/data/admin-additions.json');
      current.certifications.push({
        ...form,
        id: form.id || form.title.toLowerCase().replace(/\s+/g, '-'),
        verified: true,
      });
      await commitToGitHub(
        `feat: add credential "${form.title}" via admin panel`,
        [{ path: 'src/data/admin-additions.json', content: JSON.stringify(current, null, 2) }]
      );
      onToast(`"${form.title}" committed! Netlify will rebuild in ~60s.`, 'success');
      setForm(EMPTY_CERT);
    } catch (err) {
      onToast(`Error: ${err.message}`, 'error');
    }
    setCommitting(false);
  };

  return (
    <SectionCard title="Add Credential / Certification" icon={RiFileAddLine}>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Fill the form and commit directly to GitHub. Netlify auto-rebuilds in ~60 seconds.
      </p>
      <form onSubmit={handleCommit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title *"><Input value={form.title} onChange={e => up('title', e.target.value)} placeholder="Certification name" /></Field>
          <Field label="Issuer"><Input value={form.issuer} onChange={e => up('issuer', e.target.value)} placeholder="e.g. Microverse, Coursera" /></Field>
          <Field label="Year"><Input value={form.year} onChange={e => up('year', e.target.value)} placeholder="2024" /></Field>
          <Field label="Issue Date"><Input value={form.issueDate} onChange={e => up('issueDate', e.target.value)} placeholder="January 14, 2024" /></Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Category">
            <Select value={form.category} onChange={e => up('category', e.target.value)}>
              <option value="software">Software</option>
              <option value="professional">Professional</option>
            </Select>
          </Field>
          <Field label="Icon">
            <Select value={form.icon} onChange={e => up('icon', e.target.value)}>
              <option value="code">Code</option>
              <option value="certificate">Certificate</option>
              <option value="award">Award</option>
              <option value="leaf">Leaf</option>
              <option value="shield">Shield</option>
              <option value="graduation">Graduation</option>
              <option value="id-card">ID Card</option>
              <option value="briefcase">Briefcase</option>
            </Select>
          </Field>
          <Field label="Custom ID" hint="Auto-generated if blank">
            <Input value={form.id} onChange={e => up('id', e.target.value)} placeholder="cert-id" />
          </Field>
        </div>
        <Field label="Description"><Textarea value={form.description} onChange={e => up('description', e.target.value)} rows={2} placeholder="Short description" /></Field>
        <Field label="Credential ID"><Input value={form.detail} onChange={e => up('detail', e.target.value)} placeholder="Credential ID: xxxx-xxxx" /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Verify URL"><Input value={form.link} onChange={e => up('link', e.target.value)} placeholder="https://credential.net/..." /></Field>
          <Field label="Certificate Image" hint="/images/credentials/cert.png"><Input value={form.imageUrl} onChange={e => up('imageUrl', e.target.value)} placeholder="/images/credentials/..." /></Field>
        </div>
        <button type="submit" disabled={committing} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition shadow-sm disabled:opacity-60">
          {committing ? <RiLoaderLine size={16} className="animate-spin" /> : <RiGithubLine size={16} />}
          {committing ? 'Committing...' : 'Commit to GitHub'}
        </button>
      </form>
    </SectionCard>
  );
}

// ─── Profile ───────────────────────────────────────────────────────
const profileData = {
  name: 'Qaisar Abbas',
  title: 'Landscape Engineer & Full-Stack Developer',
  email: 'Kayser.abbas@gmail.com',
  phone: '+971 55 1740572',
  linkedin: 'https://www.linkedin.com/in/kaisar-abbas/',
  location: 'Dubai, UAE',
  availability: 'Available for projects in Gulf & Remote',
};

function ProfileSection({ onToast }) {
  const [form, setForm] = useState(profileData);
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(form, null, 2))
      .then(() => onToast('Profile data copied to clipboard!', 'success'))
      .catch(() => onToast('Copy failed', 'error'));
  };

  return (
    <SectionCard title="Profile & Contact Info" icon={RiUserSettingsLine}>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Edit your info here and copy to clipboard. Then update the relevant component files (Hero.jsx, Contact.jsx).
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name"><Input value={form.name} onChange={e => up('name', e.target.value)} /></Field>
        <Field label="Title / Role"><Input value={form.title} onChange={e => up('title', e.target.value)} /></Field>
        <Field label="Email"><Input type="email" value={form.email} onChange={e => up('email', e.target.value)} /></Field>
        <Field label="Phone"><Input value={form.phone} onChange={e => up('phone', e.target.value)} /></Field>
        <Field label="LinkedIn URL"><Input value={form.linkedin} onChange={e => up('linkedin', e.target.value)} /></Field>
        <Field label="Location"><Input value={form.location} onChange={e => up('location', e.target.value)} /></Field>
        <Field label="Availability Badge"><Input value={form.availability} onChange={e => up('availability', e.target.value)} /></Field>
      </div>
      <button onClick={handleCopy} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition shadow-sm">
        <RiSaveLine size={16} /> Copy Profile Data
      </button>
    </SectionCard>
  );
}

// ─── GitHub Push — simple commit message only ──────────────────────
function GitHubSection({ onToast }) {
  const [commitMsg, setCommitMsg] = useState('');
  const [pushing, setPushing]     = useState(false);
  const [lastCommit, setLastCommit] = useState(null);

  const push = async () => {
    if (!commitMsg.trim()) { onToast('Enter a commit message.', 'error'); return; }
    setPushing(true);
    try {
      // This commits a small timestamp file to trigger Netlify rebuild
      const content = `Last admin push: ${new Date().toISOString()}\nMessage: ${commitMsg}\n`;
      const result = await commitToGitHub(commitMsg, [
        { path: 'admin-push.txt', content },
      ]);
      setLastCommit(result.commitUrl);
      onToast('Pushed to GitHub! Netlify will rebuild in ~60s.', 'success');
      setCommitMsg('');
    } catch (err) {
      onToast(`Push failed: ${err.message}`, 'error');
    }
    setPushing(false);
  };

  return (
    <SectionCard title="Commit & Push to GitHub" icon={RiGithubLine}>
      {/* Status flow */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><RiShieldCheckLine size={13} /></div>
          Admin Panel
        </div>
        <span className="text-gray-400 hidden sm:block">→</span>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-white"><RiGithubLine size={13} /></div>
          GitHub (main)
        </div>
        <span className="text-gray-400 hidden sm:block">→</span>
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center"><RiCheckboxCircleLine size={13} /></div>
          Netlify Auto-Deploy (~60s)
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Write a commit message and push. The Netlify function uses your saved GitHub token securely on the server — no token entry needed here.
      </p>

      <Field label="Commit Message">
        <Input
          value={commitMsg}
          onChange={e => setCommitMsg(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && push()}
          placeholder="feat: update portfolio content"
        />
      </Field>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={push}
          disabled={pushing}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 transition shadow-sm disabled:opacity-60"
        >
          {pushing ? <RiLoaderLine size={16} className="animate-spin" /> : <RiSendPlaneLine size={16} />}
          {pushing ? 'Pushing...' : 'Push to GitHub'}
        </button>

        <a href="https://github.com/Kaiserabbas/portfolio-2027/commits/main" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          <RiExternalLinkLine size={15} /> View Commits
        </a>

        <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          <RiExternalLinkLine size={15} /> Netlify Dashboard
        </a>
      </div>

      {lastCommit && (
        <a href={lastCommit} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
          <RiCheckboxCircleLine size={14} /> View last commit on GitHub
        </a>
      )}

      {/* Quick terminal fallback */}
      <div className="p-4 rounded-xl bg-gray-900 dark:bg-gray-950 text-xs font-mono text-green-400 space-y-1 border border-gray-700">
        <p className="text-gray-500 mb-2"># Fallback: terminal commands</p>
        <p>git add .</p>
        <p>git commit -m &quot;your message&quot;</p>
        <p>git push origin main</p>
      </div>
    </SectionCard>
  );
}

// ─── Quick Tips ────────────────────────────────────────────────────
function QuickTipsSection() {
  const tips = [
    { label: 'Add Project Images', detail: 'Drop screenshots into public/images/projects/ then reference as /images/projects/filename.png' },
    { label: 'Add Credential Images', detail: 'Drop certificates into public/images/credentials/ then reference as /images/credentials/filename.png' },
    { label: 'Admin-added projects live in', detail: 'src/data/admin-additions.json (committed to GitHub via this panel)' },
    { label: 'Auto-Deploy', detail: 'Every GitHub push triggers Netlify to rebuild and publish. Wait ~60 seconds then refresh your site.' },
    { label: 'Theme Colors', detail: 'Primary emerald colors defined in tailwind.config.js under theme.extend.colors.primary' },
    { label: 'Site URL', detail: 'https://qaisar-resume.netlify.app/' },
    { label: 'GitHub Repo', detail: 'https://github.com/Kaiserabbas/portfolio-2027' },
  ];

  return (
    <SectionCard title="Quick Reference" icon={RiAddLine}>
      <div className="space-y-3">
        {tips.map((tip, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <RiCheckLine size={12} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">{tip.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tip.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Main Admin Panel Page ─────────────────────────────────────────
const TABS = [
  { id: 'font',       label: 'Font Style',       icon: RiPaletteLine },
  { id: 'project',    label: 'Add Project',       icon: RiFolderAddLine },
  { id: 'credential', label: 'Add Credential',    icon: RiFileAddLine },
  { id: 'profile',    label: 'Profile',           icon: RiUserSettingsLine },
  { id: 'github',     label: 'Push to GitHub',    icon: RiGithubLine },
  { id: 'tips',       label: 'Quick Reference',   icon: RiAddLine },
];

export default function AdminPanel() {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('font');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 5000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-4">
            <RiAlertLine size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Authenticate via the lock icon in the navigation bar.</p>
          <button onClick={() => navigate('/')} className="flex items-center gap-2 mx-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition">
            <RiArrowLeftLine size={16} /> Go to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              <RiArrowLeftLine size={18} />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <div className="flex items-center gap-2">
              <RiShieldCheckLine className="text-emerald-600 dark:text-emerald-400" size={18} />
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Admin Control Panel</span>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/20 transition">
            <RiLogoutBoxLine size={15} /> Logout
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Portfolio Control Panel</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Add projects, update credentials, change fonts, and push to GitHub. Netlify auto-deploys to{' '}
          <a href="https://qaisar-resume.netlify.app" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            qaisar-resume.netlify.app
          </a>{' '}in ~60 seconds.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}>
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {activeTab === 'font'       && <FontSection />}
        {activeTab === 'project'    && <AddProjectSection onToast={showToast} />}
        {activeTab === 'credential' && <AddCredentialSection onToast={showToast} />}
        {activeTab === 'profile'    && <ProfileSection onToast={showToast} />}
        {activeTab === 'github'     && <GitHubSection onToast={showToast} />}
        {activeTab === 'tips'       && <QuickTipsSection />}
      </div>

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
    </div>
  );
}
