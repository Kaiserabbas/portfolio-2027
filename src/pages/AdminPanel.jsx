import { useState, useRef } from 'react';
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
  RiExternalLinkLine,
  RiAddLine,
  RiAlertLine,
  RiCheckboxCircleLine,
  RiEyeLine,
  RiEyeOffLine,
} from 'react-icons/ri';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useFontPreset, FONT_PRESETS } from '../hooks/useFontPreset';

// ─── Reusable input ────────────────────────────────────────────────
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

function Input({ ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${props.className || ''}`}
    />
  );
}

function Textarea({ ...props }) {
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
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <RiCloseLine size={16} />
      </button>
    </div>
  );
}

// ─── Font Selector Section ─────────────────────────────────────────
function FontSection() {
  const { activePresetId, setPreset, resetFont } = useFontPreset();

  return (
    <SectionCard title="Font Style" icon={RiPaletteLine}>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Select a font pairing to apply globally across the portfolio. Changes are saved to your browser and applied instantly.
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
                <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium">
                  H: {preset.heading}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
                  B: {preset.body}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      {activePresetId && (
        <button
          onClick={resetFont}
          className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition mt-1"
        >
          <RiRefreshLine size={14} /> Reset to Default Font (Inter)
        </button>
      )}
    </SectionCard>
  );
}

// ─── Add Project Section ───────────────────────────────────────────
const EMPTY_PROJECT = {
  title: '',
  category: 'it',
  platform: 'webapp',
  featured: false,
  description: '',
  longDescription: '',
  image: '',
  gallery: '',
  liveUrl: '',
  studyUrl: '',
  client: '',
  location: '',
  duration: '',
  year: '',
  result: '',
  tags: '',
  tech: '',
};

function AddProjectSection({ onToast }) {
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [submitting, setSubmitting] = useState(false);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { onToast('Title is required', 'error'); return; }
    setSubmitting(true);

    const projectEntry = {
      ...form,
      gallery: form.gallery ? form.gallery.split('\n').map(s => s.trim()).filter(Boolean) : [],
      tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
      tech: form.tech ? form.tech.split(',').map(s => s.trim()).filter(Boolean) : [],
      sectorClass: form.category === 'landscape' ? 'sector-landscape' : 'sector-it',
      sectorLabel: form.category === 'landscape' ? 'Landscape Engineering' : 'IT & Web',
      tagClass: form.category === 'landscape' ? 'tag-green' : 'tag-blue',
    };

    // Copy to clipboard as JS object literal for manual paste into projects.js
    const jsText = `{\n  id: Date.now(),\n  category: '${projectEntry.category}',\n  platform: '${projectEntry.platform}',\n  featured: ${projectEntry.featured},\n  title: '${projectEntry.title}',\n  description: \`${projectEntry.description}\`,\n  longDescription: \`${projectEntry.longDescription}\`,\n  image: '${projectEntry.image}',\n  gallery: ${JSON.stringify(projectEntry.gallery)},\n  client: '${projectEntry.client}',\n  location: '${projectEntry.location}',\n  duration: '${projectEntry.duration}',\n  year: '${projectEntry.year}',\n  result: '${projectEntry.result}',\n  liveUrl: '${projectEntry.liveUrl}',\n  studyUrl: '${projectEntry.studyUrl}',\n  tags: ${JSON.stringify(projectEntry.tags)},\n  tech: ${JSON.stringify(projectEntry.tech)},\n  sectorClass: '${projectEntry.sectorClass}',\n  sectorLabel: '${projectEntry.sectorLabel}',\n  tagClass: '${projectEntry.tagClass}',\n},`;

    navigator.clipboard.writeText(jsText).then(() => {
      setSubmitting(false);
      onToast('Project entry copied to clipboard! Paste into projects.js and commit.', 'success');
      setForm(EMPTY_PROJECT);
    }).catch(() => {
      setSubmitting(false);
      onToast('Could not copy. Check browser permissions.', 'error');
    });
  };

  return (
    <SectionCard title="Add New Project" icon={RiFolderAddLine}>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Fill in the details. The entry will be copied to your clipboard as a JS object ready to paste into <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-emerald-700 dark:text-emerald-400">src/data/projects.js</code>.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title *">
            <Input value={form.title} onChange={e => update('title', e.target.value)} placeholder="Project title" />
          </Field>
          <Field label="Year">
            <Input value={form.year} onChange={e => update('year', e.target.value)} placeholder="e.g. 2024-2025" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Category">
            <Select value={form.category} onChange={e => update('category', e.target.value)}>
              <option value="it">IT / Web / AI</option>
              <option value="landscape">Landscape</option>
            </Select>
          </Field>
          <Field label="Platform">
            <Select value={form.platform} onChange={e => update('platform', e.target.value)}>
              <option value="webapp">Web App</option>
              <option value="both">Web & Android</option>
            </Select>
          </Field>
          <Field label="Featured">
            <Select value={form.featured ? 'true' : 'false'} onChange={e => update('featured', e.target.value === 'true')}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </Select>
          </Field>
        </div>

        <Field label="Short Description">
          <Textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="1-2 sentence overview shown on the card" rows={2} />
        </Field>

        <Field label="Long Description (Modal)">
          <Textarea value={form.longDescription} onChange={e => update('longDescription', e.target.value)} placeholder="Detailed description shown in the project modal" rows={4} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Main Image URL" hint="e.g. /images/projects/my-project.png">
            <Input value={form.image} onChange={e => update('image', e.target.value)} placeholder="/images/projects/..." />
          </Field>
          <Field label="Live URL">
            <Input value={form.liveUrl} onChange={e => update('liveUrl', e.target.value)} placeholder="https://..." />
          </Field>
        </div>

        <Field label="Gallery Images (one URL per line)" hint="Each line = one gallery image URL">
          <Textarea value={form.gallery} onChange={e => update('gallery', e.target.value)} placeholder={`/images/projects/img1.png\n/images/projects/img2.png`} rows={3} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Client">
            <Input value={form.client} onChange={e => update('client', e.target.value)} placeholder="Client name" />
          </Field>
          <Field label="Location">
            <Input value={form.location} onChange={e => update('location', e.target.value)} placeholder="City, Country" />
          </Field>
          <Field label="Duration">
            <Input value={form.duration} onChange={e => update('duration', e.target.value)} placeholder="e.g. 3 months" />
          </Field>
          <Field label="Result">
            <Input value={form.result} onChange={e => update('result', e.target.value)} placeholder="Key outcome" />
          </Field>
        </div>

        <Field label="Tags" hint="Comma separated">
          <Input value={form.tags} onChange={e => update('tags', e.target.value)} placeholder="React, AI, Landscape..." />
        </Field>

        <Field label="Tech Stack" hint="Comma separated">
          <Input value={form.tech} onChange={e => update('tech', e.target.value)} placeholder="React, Node.js, Tailwind..." />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition shadow-sm disabled:opacity-60"
        >
          {submitting ? <RiLoaderLine size={16} className="animate-spin" /> : <RiUploadLine size={16} />}
          Copy Project Entry to Clipboard
        </button>
      </form>
    </SectionCard>
  );
}

// ─── Add Credential Section ────────────────────────────────────────
const EMPTY_CERT = {
  id: '',
  title: '',
  issuer: '',
  year: '',
  issueDate: '',
  category: 'software',
  description: '',
  detail: '',
  icon: 'code',
  link: '',
  imageUrl: '',
};

function AddCredentialSection({ onToast }) {
  const [form, setForm] = useState(EMPTY_CERT);
  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { onToast('Title is required', 'error'); return; }

    const jsText = `{\n  id: '${form.id || form.title.toLowerCase().replace(/\s+/g, '-')}',\n  title: '${form.title}',\n  issuer: '${form.issuer}',\n  year: '${form.year}',\n  issueDate: '${form.issueDate}',\n  category: '${form.category}',\n  description: '${form.description}',\n  detail: '${form.detail}',\n  icon: '${form.icon}',\n  verified: true,\n  link: '${form.link}',\n  imageUrl: '${form.imageUrl}',\n},`;

    navigator.clipboard.writeText(jsText).then(() => {
      onToast('Credential entry copied! Paste into certifications.js and commit.', 'success');
      setForm(EMPTY_CERT);
    }).catch(() => onToast('Copy failed. Check browser permissions.', 'error'));
  };

  return (
    <SectionCard title="Add Credential / Certification" icon={RiFileAddLine}>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Fill the form, then paste the result into <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-emerald-700 dark:text-emerald-400">src/data/certifications.js</code>.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title *">
            <Input value={form.title} onChange={e => update('title', e.target.value)} placeholder="Certification name" />
          </Field>
          <Field label="Issuer">
            <Input value={form.issuer} onChange={e => update('issuer', e.target.value)} placeholder="e.g. Microverse, Coursera" />
          </Field>
          <Field label="Year">
            <Input value={form.year} onChange={e => update('year', e.target.value)} placeholder="2024" />
          </Field>
          <Field label="Issue Date">
            <Input value={form.issueDate} onChange={e => update('issueDate', e.target.value)} placeholder="January 14, 2024" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Category">
            <Select value={form.category} onChange={e => update('category', e.target.value)}>
              <option value="software">Software</option>
              <option value="professional">Professional</option>
            </Select>
          </Field>
          <Field label="Icon">
            <Select value={form.icon} onChange={e => update('icon', e.target.value)}>
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
            <Input value={form.id} onChange={e => update('id', e.target.value)} placeholder="cert-id" />
          </Field>
        </div>

        <Field label="Description">
          <Textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Short description of the certification" rows={2} />
        </Field>

        <Field label="Detail / Credential ID">
          <Input value={form.detail} onChange={e => update('detail', e.target.value)} placeholder="Credential ID: xxxx-xxxx" />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Verify URL">
            <Input value={form.link} onChange={e => update('link', e.target.value)} placeholder="https://credential.net/..." />
          </Field>
          <Field label="Certificate Image URL" hint="e.g. /images/credentials/cert.png">
            <Input value={form.imageUrl} onChange={e => update('imageUrl', e.target.value)} placeholder="/images/credentials/..." />
          </Field>
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition shadow-sm">
          <RiUploadLine size={16} /> Copy Credential Entry to Clipboard
        </button>
      </form>
    </SectionCard>
  );
}

// ─── Profile Settings Section ──────────────────────────────────────
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
  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleCopy = () => {
    const snippet = `// Update these values in Hero.jsx, Contact.jsx, About.jsx as needed:\n${JSON.stringify(form, null, 2)}`;
    navigator.clipboard.writeText(snippet).then(() => {
      onToast('Profile data copied to clipboard!', 'success');
    }).catch(() => onToast('Copy failed', 'error'));
  };

  return (
    <SectionCard title="Profile & Contact Info" icon={RiUserSettingsLine}>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Edit your info here and copy to clipboard, then update the relevant component files (Hero.jsx, Contact.jsx, Footer.jsx).
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name">
          <Input value={form.name} onChange={e => update('name', e.target.value)} />
        </Field>
        <Field label="Title / Role">
          <Input value={form.title} onChange={e => update('title', e.target.value)} />
        </Field>
        <Field label="Email">
          <Input type="email" value={form.email} onChange={e => update('email', e.target.value)} />
        </Field>
        <Field label="Phone">
          <Input value={form.phone} onChange={e => update('phone', e.target.value)} />
        </Field>
        <Field label="LinkedIn URL">
          <Input value={form.linkedin} onChange={e => update('linkedin', e.target.value)} />
        </Field>
        <Field label="Location">
          <Input value={form.location} onChange={e => update('location', e.target.value)} />
        </Field>
        <Field label="Availability Badge" className="sm:col-span-2">
          <Input value={form.availability} onChange={e => update('availability', e.target.value)} />
        </Field>
      </div>
      <button onClick={handleCopy} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition shadow-sm">
        <RiSaveLine size={16} /> Copy Profile Data to Clipboard
      </button>
    </SectionCard>
  );
}

// ─── GitHub Commit Section ─────────────────────────────────────────
const GH_PAT_KEY = 'qaisar_gh_pat';

function GitHubSection({ onToast }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem(GH_PAT_KEY) || sessionStorage.getItem('gh_pat') || ''
  );
  const [rememberToken, setRememberToken] = useState(() => !!localStorage.getItem(GH_PAT_KEY));
  const [commitMsg, setCommitMsg] = useState('');
  const [pushing, setPushing] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [tokenSaved, setTokenSaved] = useState(!!localStorage.getItem(GH_PAT_KEY));

  const saveToken = () => {
    if (!token.trim()) { onToast('Enter a token first.', 'error'); return; }
    if (rememberToken) {
      localStorage.setItem(GH_PAT_KEY, token);
      sessionStorage.removeItem('gh_pat');
      setTokenSaved(true);
      onToast('Token saved permanently to this browser.', 'success');
    } else {
      sessionStorage.setItem('gh_pat', token);
      localStorage.removeItem(GH_PAT_KEY);
      setTokenSaved(false);
      onToast('Token saved for this session only.', 'success');
    }
  };

  const clearToken = () => {
    localStorage.removeItem(GH_PAT_KEY);
    sessionStorage.removeItem('gh_pat');
    setToken('');
    setTokenSaved(false);
    setRememberToken(false);
    onToast('Token cleared.', 'success');
  };

  const pushCommit = async () => {
    if (!token.trim()) { onToast('Enter your GitHub PAT first.', 'error'); return; }
    if (!commitMsg.trim()) { onToast('Enter a commit message.', 'error'); return; }
    setPushing(true);

    try {
      const owner = 'Kaiserabbas';
      const repo = 'portfolio-2027';

      // Verify token first
      const meRes = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'portfolio-admin' },
      });
      if (!meRes.ok) throw new Error('Invalid GitHub token. Please check and re-save it.');

      // Trigger repository_dispatch event
      const dispatchRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'portfolio-admin',
        },
        body: JSON.stringify({
          event_type: 'admin-panel-commit',
          client_payload: { message: commitMsg },
        }),
      });

      if (dispatchRes.status === 204) {
        onToast('GitHub dispatch triggered! Check Actions tab for the commit.', 'success');
        setCommitMsg('');
      } else {
        onToast(`Token valid but dispatch returned ${dispatchRes.status}. Use terminal git commands below.`, 'error');
      }
    } catch (err) {
      onToast(`Error: ${err.message}`, 'error');
    }
    setPushing(false);
  };

  return (
    <SectionCard title="GitHub Commit & Push" icon={RiGithubLine}>

      {/* How to get a token guide */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 overflow-hidden">
        <button
          onClick={() => setShowGuide(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition"
        >
          <span>📖 How to get a GitHub Personal Access Token</span>
          <span>{showGuide ? '▲' : '▼'}</span>
        </button>
        {showGuide && (
          <div className="px-4 pb-4 space-y-2 text-xs text-blue-800 dark:text-blue-200">
            <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
              <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline font-semibold">github.com/settings/tokens</a></li>
              <li>Click your <strong>profile picture</strong> (top-right) → <strong>Settings</strong></li>
              <li>Scroll down → <strong>Developer settings</strong> (left sidebar, very bottom)</li>
              <li><strong>Personal access tokens</strong> → <strong>Tokens (classic)</strong></li>
              <li>Click <strong>"Generate new token (classic)"</strong></li>
              <li>Name: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">Portfolio Admin</code></li>
              <li>Expiration: <strong>No expiration</strong></li>
              <li>Check scope: ✅ <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">repo</code> (full control of private repositories)</li>
              <li>Click <strong>"Generate token"</strong> → <strong>Copy immediately</strong> (shown only once!)</li>
              <li>Paste it below and click <strong>"Save Token"</strong></li>
            </ol>
          </div>
        )}
      </div>

      {/* Token saved indicator */}
      {tokenSaved && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
          <RiCheckboxCircleLine size={15} />
          Token saved permanently in this browser
          <button onClick={clearToken} className="ml-auto text-red-500 hover:text-red-700 dark:hover:text-red-400 underline font-medium">
            Remove
          </button>
        </div>
      )}

      <Field label="GitHub PAT (repo scope required)">
        <div className="relative">
          <input
            type={showToken ? 'text' : 'password'}
            value={token}
            onChange={e => { setToken(e.target.value); setTokenSaved(false); }}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <button
            type="button"
            onClick={() => setShowToken(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            {showToken ? <RiEyeOffLine size={15} /> : <RiEyeLine size={15} />}
          </button>
        </div>
      </Field>

      {/* Remember toggle */}
      <label className="flex items-center gap-2.5 cursor-pointer group">
        <div
          onClick={() => setRememberToken(v => !v)}
          className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${rememberToken ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
          <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${rememberToken ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Remember permanently (saved in browser localStorage)
        </span>
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={saveToken}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition shadow-sm"
        >
          <RiSaveLine size={14} /> Save Token
        </button>
        {token && (
          <button
            onClick={clearToken}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
          >
            Clear Token
          </button>
        )}
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <Field label="Commit Message">
          <Input value={commitMsg} onChange={e => setCommitMsg(e.target.value)} placeholder="feat: add new project via admin panel" />
        </Field>

        <div className="flex flex-wrap gap-3 mt-3">
          <button
            onClick={pushCommit}
            disabled={pushing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 transition shadow-sm disabled:opacity-60"
          >
            {pushing ? <RiLoaderLine size={16} className="animate-spin" /> : <RiGithubLine size={16} />}
            Trigger GitHub Dispatch
          </button>

          <a
            href="https://github.com/Kaiserabbas/portfolio-2027"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <RiExternalLinkLine size={16} /> Open Repo on GitHub
          </a>
        </div>
      </div>

      {/* Quick Git Commands */}
      <div className="p-4 rounded-xl bg-gray-900 dark:bg-gray-950 text-xs font-mono text-green-400 space-y-1 border border-gray-700">
        <p className="text-gray-500 mb-2"># Alternative: quick terminal commands</p>
        <p>git add .</p>
        <p>git commit -m &quot;your message&quot;</p>
        <p>git push origin main</p>
      </div>
    </SectionCard>
  );
}

// ─── Quick Tips Section ────────────────────────────────────────────
function QuickTipsSection() {
  const tips = [
    { label: 'Add Project Images', detail: 'Drop screenshots into public/images/projects/ and reference them as /images/projects/filename.png' },
    { label: 'Add Credential Images', detail: 'Drop certificates into public/images/credentials/ and reference as /images/credentials/filename.png' },
    { label: 'Edit Projects Data', detail: 'Open src/data/projects.js and add your copied project entry to the array' },
    { label: 'Edit Certifications', detail: 'Open src/data/certifications.js and paste your copied credential entry' },
    { label: 'Deployed to Vercel', detail: 'Push to main branch - Vercel auto-deploys within ~60 seconds' },
    { label: 'Theme Colors', detail: 'Primary emerald colors are defined in tailwind.config.js under theme.extend.colors.primary' },
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
  { id: 'font', label: 'Font Style', icon: RiPaletteLine },
  { id: 'project', label: 'Add Project', icon: RiFolderAddLine },
  { id: 'credential', label: 'Add Credential', icon: RiFileAddLine },
  { id: 'profile', label: 'Profile', icon: RiUserSettingsLine },
  { id: 'github', label: 'GitHub', icon: RiGithubLine },
  { id: 'tips', label: 'Quick Tips', icon: RiAddLine },
];

export default function AdminPanel() {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('font');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 4000);
  };

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-4">
            <RiAlertLine size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">You need to authenticate to access the admin panel.</p>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mx-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 transition"
          >
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
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
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

          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
          >
            <RiLogoutBoxLine size={15} /> Logout
          </button>
        </div>
      </div>

      {/* Page Title */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Portfolio Control Panel</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage fonts, add projects, update credentials, and push changes to GitHub.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/20'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {activeTab === 'font' && <FontSection />}
        {activeTab === 'project' && <AddProjectSection onToast={showToast} />}
        {activeTab === 'credential' && <AddCredentialSection onToast={showToast} />}
        {activeTab === 'profile' && <ProfileSection onToast={showToast} />}
        {activeTab === 'github' && <GitHubSection onToast={showToast} />}
        {activeTab === 'tips' && <QuickTipsSection />}
      </div>

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
    </div>
  );
}
