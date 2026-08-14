import React, { useState, useEffect, useRef } from 'react';

const HOME = '~';
const USER = 'philosan';
const HOST = 'portfolio';

const SECTIONS = ['about', 'skills', 'projects', 'contact', 'experience', 'sites', 'terminal'];

const PROJECT_FILES = {
  'PassGO.txt': 'PassGO — encrypted password manager in Go (Gin, MongoDB, Supabase, AES-256-GCM).\nhttps://github.com/philopaterwaheed/PassGO',
  'phiocker.txt': 'phiocker — Linux container runtime in Go (OCI, namespaces, cgroup v2, bridge/NAT).\nhttps://github.com/philopaterwaheed/phiocker',
  'planitly.txt': 'Planitly backend — FastAPI, Firebase, JWT, FCM, LLM chatbot.\nhttps://github.com/philopaterwaheed/planitly_backend',
  'pwm.txt': 'pwm — tiling/floating X11 window manager in C++.\nhttps://github.com/philopaterwaheed/pwm',
  'fileio.txt': 'fileio — terminal file manager in Rust.\nhttps://github.com/philopaterwaheed/fileio',
  'launchio.txt': 'launchio — app launcher in Rust (fltk).\nhttps://github.com/philopaterwaheed/launchio',
  'exeio.txt': 'exeio — Rust process supervisor with a REST API.\nhttps://github.com/philopaterwaheed/exeio',
  'bbook.txt': 'bbook — ncurses text editor in C++.\nhttps://github.com/philopaterwaheed/bbook_the_text_editor',
  'psio.txt': 'psio — Codeforces test-case runner in C++.\nhttps://github.com/philopaterwaheed/psio',
  'cppi.txt': 'cppi — header-only C++ HTTP library.\nhttps://github.com/philopaterwaheed/cppi',
  'catch_the_flag.txt': 'Catch The Flag — multiplayer Java game.\nhttps://github.com/philopaterwaheed/Catch_the_flag_game',
  'novel_nest.txt': 'Novel Nest — bookstore app (React Native / Node.js / Firebase).\nhttps://github.com/Ahmed3zzeldeen/Novel-Nest-App',
  'compy.txt': 'compy — C++ parser and AST generator (Java, ANTLR).\nhttps://github.com/philopaterwaheed/compy',
  'the_hive.txt': 'The Hive — hive-minded neural network simulation.\nhttps://github.com/philopaterwaheed/The_hive',
  'crafty.txt': 'crafty — Rust CLI for Archcraft packages on other pacman distros.\nhttps://github.com/philopaterwaheed/crafty'
};

const SITE_FILES = {
  'carina.txt': 'Carina Nutrition Coach PWA\nhttps://carina-pwa-1.vercel.app/',
  'github.txt': 'GitHub — 59 public repos\nhttps://github.com/philopaterwaheed',
  'portfolio.txt': 'This site — pwm-inspired tiling desktop\nhttps://philopaterwaheed.github.io'
};

const FS = {
  [HOME]: { type: 'dir', children: ['about.txt', 'skills.txt', 'contact.txt', 'experience.txt', 'projects', 'sites'] },
  [`${HOME}/about.txt`]: {
    type: 'file',
    content: [
      'Philopater Waheed',
      'Software Engineer • B.Sc. Computer Science, Cairo University (Jun 2026)',
      'Go, Rust, C++, Python, JavaScript • Linux systems and full-stack work',
      'Based in Giza, Egypt • Arabic (native), English (B2)',
      'ECPC 2025 — Top 40',
      'https://github.com/philopaterwaheed'
    ].join('\n')
  },
  [`${HOME}/skills.txt`]: {
    type: 'file',
    content: [
      'Languages:  Go, Rust, C++, Python, Java, C, JavaScript, TypeScript',
      'Web & APIs: React, React Native, Vite, Node/Express, FastAPI, Gin, REST, JWT',
      'Data:       MongoDB, MySQL, Firebase, Supabase Auth',
      'Systems:    Linux, Docker, OCI, systemd, namespaces, cgroups, networking',
      'Practice:   Git, CI/CD, testing, clean architecture'
    ].join('\n')
  },
  [`${HOME}/contact.txt`]: {
    type: 'file',
    content: [
      'email     philopaterwaheed9@gmail.com',
      'github    https://github.com/philopaterwaheed',
      'linkedin  https://www.linkedin.com/in/philopater-waheed-561292227/',
      'web       https://philopaterwaheed.github.io',
      'location  Giza, Egypt'
    ].join('\n')
  },
  [`${HOME}/experience.txt`]: {
    type: 'file',
    content: [
      'Freelance Software Engineer — Carina Health Clinic (Mar 2026 – Present)',
      '  Offline-first nutrition PWA: React, Vite, Node, Express, MongoDB',
      '',
      'B.Sc. Computer Science — Cairo University, Faculty of Science (Jun 2026)',
      '',
      'ECPC — Top 40 of 300+ (Alexandria, Jul 2025)'
    ].join('\n')
  },
  [`${HOME}/projects`]: { type: 'dir', children: Object.keys(PROJECT_FILES) },
  [`${HOME}/sites`]: { type: 'dir', children: Object.keys(SITE_FILES) }
};

Object.entries(PROJECT_FILES).forEach(([name, content]) => {
  FS[`${HOME}/projects/${name}`] = { type: 'file', content };
});
Object.entries(SITE_FILES).forEach(([name, content]) => {
  FS[`${HOME}/sites/${name}`] = { type: 'file', content };
});

function normalizePath(path) {
  if (!path || path === '/') return HOME;
  const raw = path.startsWith('~') ? path : path.startsWith('/') ? `${HOME}${path}` : path;
  const parts = raw.replace(/^~/, '').split('/').filter(Boolean);
  const stack = [];
  parts.forEach((part) => {
    if (part === '.' || part === '') return;
    if (part === '..') stack.pop();
    else stack.push(part);
  });
  return stack.length ? `${HOME}/${stack.join('/')}` : HOME;
}

function resolvePath(cwd, target) {
  if (!target || target === '~' || target === '/') return HOME;
  if (target.startsWith('~') || target.startsWith('/')) return normalizePath(target);
  return normalizePath(`${cwd}/${target}`);
}

function nodeAt(path) {
  return FS[path] || null;
}

function resolveReadable(cwd, target) {
  const exact = resolvePath(cwd, target);
  if (nodeAt(exact)) return exact;
  if (!target.includes('.')) {
    const withTxt = resolvePath(cwd, `${target}.txt`);
    if (nodeAt(withTxt)) return withTxt;
  }
  return exact;
}

function formatPrompt(cwd) {
  const short = cwd === HOME ? '~' : cwd.replace(`${HOME}/`, '');
  return `${USER}@${HOST}:${short}$`;
}

function welcomeLines() {
  return [
    { kind: 'info', text: 'Welcome to my portfolio terminal.' },
    { kind: 'info', text: 'Type `help` for commands, or `ls` to look around.' },
    { kind: 'info', text: '' }
  ];
}

const LINK_RE = /(https?:\/\/[^\s]+|github\.com\/[^\s]+|www\.[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

function hrefFor(match) {
  const trimmed = match.replace(/[.,;:!?)]+$/, '');
  if (trimmed.includes('@') && !trimmed.includes('/')) return { href: `mailto:${trimmed}`, label: trimmed };
  if (/^https?:\/\//i.test(trimmed)) return { href: trimmed, label: trimmed };
  return { href: `https://${trimmed}`, label: trimmed };
}

function linkify(text) {
  if (!text) return ' ';
  const parts = [];
  let last = 0;
  const re = new RegExp(LINK_RE.source, 'gi');
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const { href, label } = hrefFor(match[0]);
    const leftover = match[0].slice(label.length);
    parts.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noopener noreferrer"
        className="terminal-link"
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </a>
    );
    if (leftover) parts.push(leftover);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

function runCommand(raw, cwd, helpers) {
  const trimmed = raw.trim();
  if (!trimmed) return { cwd, lines: [] };

  const argv = trimmed.split(/\s+/);
  const cmd = argv[0];
  const args = argv.slice(1);

  const out = (text, kind = 'out') => ({ cwd, lines: [{ kind, text }] });
  const many = (lines, nextCwd = cwd) => ({ cwd: nextCwd, lines });

  switch (cmd) {
    case 'help':
      return many([
        { kind: 'info', text: 'Commands' },
        { kind: 'out', text: '  whoami          who I am' },
        { kind: 'out', text: '  ls [path] [-l]  list files' },
        { kind: 'out', text: '  cat <file>      read a file' },
        { kind: 'out', text: '  cd [dir]        change directory' },
        { kind: 'out', text: '  pwd             print working directory' },
        { kind: 'out', text: '  open <section>  open a portfolio window' },
        { kind: 'out', text: '  clear           clear the screen' },
        { kind: 'out', text: '  date            Cairo local time' },
        { kind: 'out', text: '  echo [text]     print text' },
        { kind: 'out', text: '  github          open GitHub in a new tab' },
        { kind: 'out', text: '  exit            close this terminal' },
        { kind: 'info', text: '' },
        { kind: 'info', text: 'Shortcuts' },
        { kind: 'out', text: '  Alt+1 About  Alt+2 Skills  Alt+3 Projects  Alt+4 Contact' },
        { kind: 'out', text: '  Alt+5 Experience  Alt+6 Sites  Alt+T Terminal  Alt+H Help  Alt+Q Close' }
      ]);

    case 'whoami':
      return many([
        { kind: 'out', text: 'philopater waheed' },
        { kind: 'out', text: 'Software Engineer • B.Sc. Computer Science' },
        { kind: 'out', text: 'github.com/philopaterwaheed' }
      ]);

    case 'pwd':
      return out(cwd);

    case 'clear':
      return { cwd, lines: [], clear: true };

    case 'date':
      return out(new Date().toLocaleString('en-EG', { timeZone: 'Africa/Cairo' }));

    case 'uname':
      return out(args.includes('-a')
        ? 'Linux portfolio 6.1.0-pwm #1 SMP PREEMPT philosan x86_64 GNU/Linux'
        : 'Linux');

    case 'echo':
      return out(args.join(' '));

    case 'github':
      window.open('https://github.com/philopaterwaheed', '_blank', 'noopener,noreferrer');
      return out('opening https://github.com/philopaterwaheed');

    case 'exit':
      helpers.onClose();
      return { cwd, lines: [] };

    case 'cd': {
      const dest = resolvePath(cwd, args[0] || HOME);
      const node = nodeAt(dest);
      if (!node) return out(`cd: ${args[0] || dest}: No such file or directory`, 'error');
      if (node.type !== 'dir') return out(`cd: ${args[0]}: Not a directory`, 'error');
      return { cwd: dest, lines: [] };
    }

    case 'ls': {
      const long = args.includes('-l') || args.includes('-la') || args.includes('-al');
      const pathArg = args.find((a) => !a.startsWith('-'));
      const dest = resolveReadable(cwd, pathArg || '.');
      const node = nodeAt(dest);
      if (!node) return out(`ls: cannot access '${pathArg}': No such file or directory`, 'error');
      if (node.type === 'file') return out(dest.split('/').pop());
      const names = node.children;
      if (long) {
        return many(names.map((name) => {
          const child = nodeAt(`${dest === HOME ? HOME : dest}/${name}`);
          const isDir = child && child.type === 'dir';
          const mode = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
          return { kind: isDir ? 'dir' : 'out', text: `${mode}  ${USER}  ${name}` };
        }));
      }
      return many(names.map((name) => {
        const child = nodeAt(`${dest === HOME ? HOME : dest}/${name}`);
        const isDir = child && child.type === 'dir';
        return { kind: isDir ? 'dir' : 'out', text: name };
      }));
    }

    case 'cat': {
      if (!args[0]) return out('cat: missing file operand', 'error');
      const dest = resolveReadable(cwd, args[0]);
      const node = nodeAt(dest);
      if (!node) return out(`cat: ${args[0]}: No such file or directory`, 'error');
      if (node.type === 'dir') return out(`cat: ${args[0]}: Is a directory`, 'error');
      return many(node.content.split('\n').map((text) => ({ kind: 'out', text })));
    }

    case 'open': {
      const section = (args[0] || '').toLowerCase();
      if (!section) return out('open: missing section (about, skills, projects, contact, experience, sites)', 'error');
      if (!SECTIONS.includes(section)) return out(`open: unknown section '${section}'`, 'error');
      helpers.onOpenWindow(section);
      return out(`opened ${section}`);
    }

    default:
      if (SECTIONS.includes(cmd)) {
        helpers.onOpenWindow(cmd);
        return out(`opened ${cmd}`);
      }
      return out(`${cmd}: command not found`, 'error');
  }
}

function completeInput(cwd, value) {
  const parts = value.split(/\s+/);
  const completing = parts[parts.length - 1] || '';
  const cmd = parts[0];
  const commands = ['help', 'whoami', 'ls', 'cat', 'cd', 'pwd', 'open', 'clear', 'date', 'echo', 'github', 'exit', 'uname', ...SECTIONS];

  if (parts.length <= 1) {
    const matches = commands.filter((c) => c.startsWith(completing));
    return { matches, replace: matches.length === 1 ? matches[0] : null };
  }

  if (['ls', 'cat', 'cd', 'open'].includes(cmd)) {
    const slash = completing.lastIndexOf('/');
    const prefixDir = slash >= 0 ? completing.slice(0, slash + 1) : '';
    const prefixName = slash >= 0 ? completing.slice(slash + 1) : completing;
    const dirPath = slash >= 0 ? resolvePath(cwd, prefixDir || '.') : cwd;
    const node = nodeAt(dirPath);
    if (!node || node.type !== 'dir') return { matches: [], replace: null };
    const matches = node.children.filter((name) => name.startsWith(prefixName));
    if (cmd === 'open') {
      const sectionMatches = SECTIONS.filter((s) => s.startsWith(completing));
      return { matches: sectionMatches, replace: sectionMatches.length === 1 ? `open ${sectionMatches[0]}` : null };
    }
    if (matches.length === 1) {
      const name = matches[0];
      const child = nodeAt(`${dirPath === HOME ? HOME : dirPath}/${name}`);
      const suffix = child && child.type === 'dir' ? '/' : '';
      return { matches, replace: `${parts.slice(0, -1).join(' ')} ${prefixDir}${name}${suffix}` };
    }
    return { matches, replace: null };
  }

  return { matches: [], replace: null };
}

function PortfolioTerminal({ onOpenWindow, onClose, isActive }) {
  const [cwd, setCwd] = useState(HOME);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState(welcomeLines);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  useEffect(() => {
    if (isActive) inputRef.current?.focus();
  }, [isActive]);

  const submit = (raw) => {
    const result = runCommand(raw, cwd, { onOpenWindow, onClose });
    if (result.clear) {
      setLines([]);
    } else if (raw.trim()) {
      setLines((prev) => [
        ...prev,
        { kind: 'prompt', text: `${formatPrompt(cwd)} ${raw}` },
        ...result.lines
      ]);
    }
    setCwd(result.cwd);
    if (raw.trim()) {
      setHistory((prev) => [...prev, raw]);
    }
    setHistoryIndex(-1);
    setInput('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(input);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < 0) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const { matches, replace } = completeInput(cwd, input);
      if (replace) setInput(replace);
      else if (matches.length > 1) {
        setLines((prev) => [...prev, { kind: 'info', text: matches.join('  ') }]);
      }
      return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      if (window.getSelection()?.toString()) return;
      e.preventDefault();
      setLines((prev) => [...prev, { kind: 'prompt', text: `${formatPrompt(cwd)} ${input}^C` }]);
      setInput('');
      setHistoryIndex(-1);
      return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className="window-content terminal-content" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-scroll">
        {lines.map((line, i) => (
          <p key={i} className={`terminal-line terminal-${line.kind}`}>{linkify(line.text)}</p>
        ))}
        <div className="terminal-prompt-row">
          <span className="terminal-prompt">{formatPrompt(cwd)}</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default PortfolioTerminal;
