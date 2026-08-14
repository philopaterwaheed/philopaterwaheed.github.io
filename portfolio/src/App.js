import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User, Wrench, Folder, Mail, Terminal, Github, Linkedin, Globe, Briefcase, ExternalLink, Download } from "lucide-react";
import PortfolioTerminal from './Terminal';
import './App.css';
function App() {
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [masterWindow, setMasterWindow] = useState(null);
  
  // tiling consts 
  const TILING_CONFIG = {
    GAP_SIZE: 5,
    BORDER_WIDTH: 2,
    STATUS_BAR_HEIGHT: 25,
    QUICK_LAUNCH_HEIGHT: 35,
    MASTER_WIDTH_RATIO: 0.7 // 70% of screen for master window
  };


  // windows and it's contents
  const windowConfigs = useMemo(() => ({
    'about': {
      title: 'About Me',
      content: (
        <div className="window-content">
          <h2>Philopater Waheed</h2>
          <p>Software Engineer • B.Sc. Computer Science • (Go, Rust, C++) / Linux Enthusiast</p>
          <div className="bio">
            <p>
              Computer Science graduate from Cairo University and software engineer
              building real-world web apps, secure backends, and systems software
              in Go, Rust, C++, Python, and JavaScript. Comfortable across the stack,
              from React frontends to Linux container runtimes and REST APIs.

            </p>
            <ul>
              <li>Focus: Systems Programming, Backend, Full-Stack Development</li>
              <li>Tech: Go, Rust, C++, Python, JavaScript, Linux, Docker, React</li>
              <li>Education: B.Sc. Computer Science, Cairo University (Jun 2026)</li>
              <li>Based in Giza, Egypt • Arabic (native), English (B2)</li>
            </ul>
            <a 
              href="https://docs.google.com/document/d/1Z9XbdLk-zzmd_-m4yHmoucFbwfEKk207/export?format=pdf&name=Philopater_Waheed_CV.pdf" 
              download="Philopater_Waheed_CV.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              className="cv-download-btn"
            >
              <Download size={18} />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )
    },
    'skills': {
      title: 'Technical Skills',
      content: (
        <div className="window-content">
          <h2>Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Languages</h3>
              <ul>
                <li>Go / Rust / C++</li>
                <li>Python / Java / C</li>
                <li>JavaScript / TypeScript</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Web & APIs</h3>
              <ul>
                <li>React / React Native / Vite</li>
                <li>Node.js / Express / FastAPI / Gin</li>
                <li>REST, JWT, OAuth, real-time chat</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Data</h3>
              <ul>
                <li>MongoDB / MySQL / SQL</li>
                <li>Firebase / Supabase Auth</li>
                <li>SQL design and optimization</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Systems & Practice</h3>
              <ul>
                <li>Linux, Docker, OCI, systemd</li>
                <li>Namespaces, cgroups, networking</li>
                <li>Git, CI/CD, testing, clean architecture</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    'projects': {
  title: 'Projects',
  content: (
    <div className="window-content">
      <h2>Featured Projects</h2>
      <div className="projects-list">

        <a href="https://github.com/philopaterwaheed/PassGO" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>PassGO</h3>
            <p>
              Full-stack encrypted password manager in Go. Gin API, MongoDB vault storage,
              and Supabase auth with AES-256-GCM encryption, Argon2id key derivation,
              JWT-protected routes, and rate limiting. Cross-platform Gio frontend
              (desktop, WebAssembly, mobile) with Docker and CI builds.
            </p>
            <div className="tech-tags">
              <span>Go</span>
              <span>Gin</span>
              <span>MongoDB</span>
              <span>Supabase</span>
              <span>Docker</span>
              <span>Gio / WASM</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/phiocker" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>phiocker</h3>
            <p>
              Docker-inspired Linux container runtime in Go. Pulls OCI images, extracts a rootfs,
              and runs containers with UTS/PID/mount/network namespaces, cgroup v2 limits,
              bridge networking, NAT, and a Unix-socket daemon with PTY attach.
            </p>
            <div className="tech-tags">
              <span>Go</span>
              <span>Linux</span>
              <span>OCI</span>
              <span>cgroups</span>
              <span>Namespaces</span>
              <span>systemd</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/planitly_backend" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>Planitly Backend</h3>
            <p>
              FastAPI backend for a productivity platform with REST APIs for subjects,
              components, and scheduled data transfers. JWT and Firebase Auth, IP-based
              rate limiting, FCM, and an LLM-powered chatbot for productivity assistance.
            </p>
            <div className="tech-tags">
              <span>Python</span>
              <span>FastAPI</span>
              <span>Firebase</span>
              <span>LLM</span>
              <span>JWT</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/pwm" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>pwm</h3>
            <p>
              An X window manager for Linux written in C++ — designed to give you minimalism, speed, and control.  
              Handles window tiling, focus management, and keybindings, all with low resource usage.
            </p>
            <div className="tech-tags">
              <span>C++</span>
              <span>Linux</span>
              <span>Window Manager</span>
              <span>Xlib</span>
              <span>Systems Programming</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/fileio" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>fileio</h3>
            <p>
              Terminal-based file manager written in Rust. Provides intuitive navigation, file operations, and keyboard shortcuts.  
              Aimed at power users who prefer working from the terminal.
            </p>
            <div className="tech-tags">
              <span>Rust</span>
              <span>Terminal UI</span>
              <span>Linux</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/launchio" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>launchio</h3>
            <p>
              A custom app launcher tool written in Rust. Quickly launch apps via commands or UI, streamlining workflow and productivity.
            </p>
            <div className="tech-tags">
              <span>Rust</span>
              <span>Productivity Tool</span>
              <span>fltk</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/exeio" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>exeio</h3>
            <p>
              A process supervisor in Rust. It runs and monitors processes, exposes a REST API for external control/monitoring, designed for server or development environments.
            </p>
            <div className="tech-tags">
              <span>Rust</span>
              <span>REST API</span>
              <span>Process Management</span>
              <span>Linux</span>
              <span>threading</span>
              <span>System Tool</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/bbook_the_text_editor" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>bbook</h3>
            <p>
              Terminal-based text editor built in C++ using ncurses. Includes syntax highlighting, basic file operations, customizable keybindings — inspired by classic editors.
            </p>
            <div className="tech-tags">
              <span>C++</span>
              <span>Text Editor</span>
              <span>ncurses</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/psio" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>psio</h3>
            <p>
              Automation tool in C++ for generating and running test cases from Codeforces problems.  
              Helps in benchmarking and validating competitive programming solutions quickly.
            </p>
            <div className="tech-tags">
              <span>C++</span>
              <span>Automation</span>
              <span>Web scraping</span>
              <span>Pipes</span>
              <span>Competitive Programming</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/cppi" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>cppi</h3>
            <p>
              A modern C++ HTTP library that enhances and simplifies handling of HTTP requests and responses, 
              designed for extensibility and ease of integration into build systems.
            </p>
            <div className="tech-tags">
              <span>C++</span>
              <span>HTTP</span>
              <span>Networking</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/Catch_the_flag_game" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>Catch The Flag</h3>
            <p>
              Multiplayer capture-the-flag style game implemented in Java.  
              Focuses on networked gameplay, strategy, and performance in real-time.
            </p>
            <div className="tech-tags">
              <span>Java</span>
              <span>Game Development</span>
              <span>ECS</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/Ahmed3zzeldeen/Novel-Nest-App" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>Novel Nest</h3>
            <p>
              Online bookstore built with a 5-person team. Browsing, search, reviews,
              and Firebase authentication and storage across web and React Native clients.
            </p>
            <div className="tech-tags">
              <span>Web</span>
              <span>Full-stack</span>
              <span>JavaScript / React Native / Node.js</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/compy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>compy</h3>
            <p>
              C++ parser and AST generator using ANTLR 3, covering variables, classes,
              functions, and control structures. Includes a Swing IDE with live syntax
              highlighting, error reporting, and Graphviz AST visualization.
            </p>
            <div className="tech-tags">
              <span>Java</span>
              <span>ANTLR</span>
              <span>Parser / AST</span>
              <span>Code Analysis</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/The_hive" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>The Hive</h3>
            <p>
              Hive-minded neural network simulation: a small ecosystem of organisms
              competing to survive, built as an experiment in collective behavior.
            </p>
            <div className="tech-tags">
              <span>Simulation</span>
              <span>Neural Networks</span>
              <span>Open Source</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/philopaterwaheed/crafty" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="project" style={{ cursor: 'pointer' }}>
            <h3>crafty</h3>
            <p>
              Rust CLI for pulling Archcraft packages onto other pacman-based distros
              without wiring up their mirrors by hand.
            </p>
            <div className="tech-tags">
              <span>Rust</span>
              <span>CLI</span>
              <span>Arch / pacman</span>
            </div>
          </div>
        </a>

      </div>
    </div>
  ),
},


    'contact': {
      title: 'Contact Information',
      content: (
        <div className="window-content">
          <h2>Get in Touch</h2>
          <div className="contact-info">
            <a href="mailto:philopaterwaheed9@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="contact-item" style={{ cursor: 'pointer' }}>
                <h3><Mail size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> Email</h3>
                <p style={{ color: '#61dafb' }}>philopaterwaheed9@gmail.com</p>
              </div>
            </a>
            <div className="contact-item">
              <h3>Location</h3>
              <p>Giza, Egypt</p>
            </div>
            <a href="https://github.com/philopaterwaheed" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="contact-item" style={{ cursor: 'pointer' }}>
                <h3><Github size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> GitHub</h3>
                <p style={{ color: '#61dafb' }}>github.com/philopaterwaheed</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/philopater-waheed-561292227/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="contact-item" style={{ cursor: 'pointer' }}>
                <h3><Linkedin size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> LinkedIn</h3>
                <p style={{ color: '#61dafb' }}>linkedin.com/in/philopater-waheed</p>
              </div>
            </a>
            <a href="https://philopaterwaheed.github.io" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="contact-item" style={{ cursor: 'pointer' }}>
                <h3><Globe size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> Portfolio</h3>
                <p style={{ color: '#61dafb' }}>philopaterwaheed.github.io</p>
              </div>
            </a>
          </div>
        </div>
      )
    },
    'experience': {
      title: 'Work Experience',
      content: (
        <div className="window-content">
          <h2>Experience</h2>
          <div className="projects-list">
            <div className="project">
              <h3>Freelance Software Engineer</h3>
              <p style={{ color: '#f39c12', fontSize: '13px', marginBottom: '8px' }}>Carina Health Clinic • Cairo, Egypt • Mar 2026 – Present</p>
              <p>
                Built an offline-first nutrition coach platform as a mobile-like PWA with
                React, Vite, Node.js, Express, and MongoDB. Shipped real-time chat, payment
                gateway integration, role-based admin tools, and automated reminder workflows.
              </p>
              <div className="tech-tags">
                <span>React</span>
                <span>Vite</span>
                <span>Node.js</span>
                <span>Express</span>
                <span>MongoDB</span>
                <span>PWA</span>
              </div>
            </div>
            <div className="project">
              <h3>B.Sc. Computer Science</h3>
              <p style={{ color: '#f39c12', fontSize: '13px', marginBottom: '8px' }}>Cairo University, Faculty of Science • Giza, Egypt • Jun 2026</p>
              <p>
                Bachelor of Science in Computer Science. Coursework in data structures,
                algorithms, databases, OOP, system design, software engineering, and machine learning.
              </p>
              <div className="tech-tags">
                <span>C/C++</span>
                <span>Python</span>
                <span>Java</span>
                <span>Go</span>
                <span>algorithms</span>
                <span>data structures</span>
              </div>
            </div>
            <div className="project">
              <h3>ECPC — Top 40</h3>
              <p style={{ color: '#f39c12', fontSize: '13px', marginBottom: '8px' }}>Egyptian Collegiate Programming Contest • Alexandria, Egypt • Jul 2024</p>
              <p>
                Competed against 300+ participants from universities across Egypt and
                ranked in the Top 40 under timed contest conditions.
              </p>
              <div className="tech-tags">
                <span>Competitive Programming</span>
                <span>Algorithms</span>
                <span>Problem Solving</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'sites': {
      title: 'External Sites',
      content: (
        <div className="window-content">
          <h2>Live Web Projects</h2>
          <p style={{ marginBottom: '15px', color: '#cccccc' }}>
            Check out these live websites and applications I've built and deployed:
          </p>
          <div className="projects-list">
            <a href="https://carina-pwa-1.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="project" style={{ cursor: 'pointer' }}>
                <h3>
                  Carina Nutrition Coach
                  <ExternalLink size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px', color: '#61dafb' }} />
                </h3>
                <p style={{ color: '#f39c12', fontSize: '13px', marginBottom: '8px' }}>https://carina-pwa-1.vercel.app/</p>
                <p>
                  Production PWA for Carina Health Clinic: offline-first meal plans,
                  progress tracking, real-time chat, payments, and admin tools.
                </p>
                <div className="tech-tags">
                  <span>React</span>
                  <span>Vite</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>PWA</span>
                </div>
              </div>
            </a>
            <a href="https://github.com/philopaterwaheed" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="project" style={{ cursor: 'pointer' }}>
                <h3>
                  GitHub
                  <ExternalLink size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px', color: '#61dafb' }} />
                </h3>
                <p style={{ color: '#f39c12', fontSize: '13px', marginBottom: '8px' }}>https://github.com/philopaterwaheed</p>
                <p>
                  Open-source systems and tooling: pwm, PassGO, phiocker, exeio, and
                  other Linux, Go, Rust, and C++ projects.
                </p>
                <div className="tech-tags">
                  <span>Go</span>
                  <span>Rust</span>
                  <span>C++</span>
                  <span>Linux</span>
                  <span>Open Source</span>
                </div>
              </div>
            </a>
            <a href="https://philopaterwaheed.github.io" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="project" style={{ cursor: 'pointer' }}>
                <h3>
                  My Portfolio Website
                  <ExternalLink size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px', color: '#61dafb' }} />
                </h3>
                <p style={{ color: '#f39c12', fontSize: '13px', marginBottom: '8px' }}>https://philopaterwaheed.github.io</p>
                <p>
                  My personal portfolio website showcasing my projects, skills, and experience. 
                  Features a unique window manager interface inspired by my pwm project.
                </p>
                <div className="tech-tags">
                  <span>React</span>
                  <span>JavaScript</span>
                  <span>CSS</span>
                  <span>GitHub Pages</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      )
    },
    'terminal': {
      title: 'Terminal',
      content: null
    }
  }), []);

  //inspired by pwm's tiling algorithm (https://github.com/philopaterwaheed/pwm/blob/main/arrange.cpp)
  const tileWindows = useCallback((windowsList, masterWindowId = null) => {
    const activeMasterWindow = masterWindowId !== null ? masterWindowId : masterWindow;
    
    if (windowsList.length === 0) return [];

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const availableHeight = screenHeight - TILING_CONFIG.STATUS_BAR_HEIGHT - TILING_CONFIG.QUICK_LAUNCH_HEIGHT;
    const masterWidth = Math.floor(screenWidth * TILING_CONFIG.MASTER_WIDTH_RATIO);
    const stackWidth = screenWidth - masterWidth - TILING_CONFIG.GAP_SIZE;

    const stackCount = windowsList.length - 1;
    let currentStackIndex = 0;

    const tiledWindows = windowsList.map((win, index) => {
      let x, y, width, height;

      if (win.id === activeMasterWindow || (activeMasterWindow === null && index === 0)) {
        // Master window
        if (windowsList.length === 1) {
          x = TILING_CONFIG.GAP_SIZE;
          y = 0;
          width = screenWidth - 2 * TILING_CONFIG.GAP_SIZE;
          height = availableHeight;
        } else {
          // Master window with stack windows
          x = TILING_CONFIG.GAP_SIZE;
          y = TILING_CONFIG.GAP_SIZE;
          width = masterWidth - 2 * TILING_CONFIG.GAP_SIZE;
          height = availableHeight - 2 * TILING_CONFIG.GAP_SIZE;
        }
      } else {
        // Stack windows (positioned on the right side)
        // Calculate height for each stacked window
        const totalGaps = (stackCount - 1) * TILING_CONFIG.GAP_SIZE;
        const stackWindowHeight = Math.floor((availableHeight - 2 * TILING_CONFIG.GAP_SIZE - totalGaps) / stackCount);
        
        x = masterWidth + TILING_CONFIG.GAP_SIZE;
        y = TILING_CONFIG.GAP_SIZE + 
            currentStackIndex * (stackWindowHeight + TILING_CONFIG.GAP_SIZE);
        width = stackWidth - 2 * TILING_CONFIG.GAP_SIZE;
        height = stackWindowHeight;
        
        currentStackIndex++;
      }

      return {
        ...win,
        x,
        y,
        width,
        height
      };
    });

    return tiledWindows;
  }, [TILING_CONFIG, masterWindow]);

  const createWindow = useCallback((type, x = 100, y = 100) => {
    const config = windowConfigs[type];
    if (!config) return;

    const newWindow = {
      id: `${type}-${Date.now()}`,
      type,
      title: config.title,
      content: config.content,
      zIndex: windows.length + 1
    };

    const newMasterWindowId = newWindow.id;
    setMasterWindow(newMasterWindowId);

    setWindows(prev => {
      const updatedWindows = [...prev, newWindow];
      return tileWindows(updatedWindows, newMasterWindowId);
    });
    
    setActiveWindow(newWindow.id);
  }, [windows.length, windowConfigs, tileWindows]);

  const closeWindow = useCallback((id) => {
    setWindows(prev => {
      const filteredWindows = prev.filter(w => w.id !== id);
      
      // Update master window if needed in the same state update
      if (filteredWindows.length > 0 && masterWindow === id) {
        // Set a new master window if the current one is being closed
        const newMasterId = filteredWindows[filteredWindows.length - 1].id;
        setMasterWindow(newMasterId);
	focusWindow(newMasterId);
        return tileWindows(filteredWindows, newMasterId);
      }
      
      focusWindow(masterWindow);
      return tileWindows(filteredWindows);
    });
    
    // Update active window if needed
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  }, [tileWindows, masterWindow, activeWindow]);

  const focusWindow = useCallback((id) => {
    setActiveWindow(id);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: Math.max(...prev.map(win => win.zIndex)) + 1 } : w
    ));
  }, []);

  // Handle window resize to retile windows
  useEffect(() => {
    const handleResize = () => {
      if (windows.length > 0) {
        setWindows(prev => tileWindows(prev));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windows.length, tileWindows]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        switch(e.key) {
          case '1':
            e.preventDefault();
            createWindow('about');
            break;
          case '2':
            e.preventDefault();
            createWindow('skills');
            break;
          case '3':
            e.preventDefault();
            createWindow('projects');
            break;
          case '4':
            e.preventDefault();
            createWindow('contact');
            break;
          case '5':
            e.preventDefault();
            createWindow('experience');
            break;
          case '6':
            e.preventDefault();
            createWindow('sites');
            break;
          case 't':
            e.preventDefault();
            createWindow('terminal');
            break;
          case 'h':
            e.preventDefault();
            setShowHelp(!showHelp);
            break;
          case 'q':
            closeWindow(activeWindow);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createWindow, showHelp, closeWindow, activeWindow]);

  return (
    <div className="pwm-desktop">
      <div className="status-bar">
        <div className="status-left">
          <span className="logo">Philo's Portfolio</span>
        </div>
        <div className="status-center">
          <span className="clock">
            my local time: {new Date().toLocaleTimeString('en-EG', { timeZone: 'Africa/Cairo' })}
          </span>
        </div>
        <div className="status-right">
          <button onClick={() => setShowHelp(!showHelp)} className="help-btn">
            Help (Alt+H)
          </button>
        </div>
      </div>

      <div className="desktop">
        {showHelp && (
          <div className="help-overlay">
            <div className="help-content">
              <h2>Keyboard Shortcuts</h2>
              <div className="shortcuts-grid">
                <div className="shortcut">
                  <kbd>Alt+1</kbd>
                  <span>Open About</span>
                </div>
                <div className="shortcut">
                  <kbd>Alt+2</kbd>
                  <span>Open Skills</span>
                </div>
                <div className="shortcut">
                  <kbd>Alt+3</kbd>
                  <span>Open Projects</span>
                </div>
                <div className="shortcut">
                  <kbd>Alt+4</kbd>
                  <span>Open Contact</span>
                </div>
                <div className="shortcut">
                  <kbd>Alt+5</kbd>
                  <span>Open Experience</span>
                </div>
                <div className="shortcut">
                  <kbd>Alt+6</kbd>
                  <span>Open Sites</span>
                </div>
                <div className="shortcut">
                  <kbd>Alt+T</kbd>
                  <span>Open Terminal</span>
                </div>
                <div className="shortcut">
                  <kbd>Alt+q</kbd>
                  <span>close focused windw</span>
                </div>
                <div className="shortcut">
                  <kbd>Alt+H</kbd>
                  <span>Toggle Help</span>
                </div>
              </div>
              <button onClick={() => setShowHelp(false)} className="close-help">
                Close
              </button>
            </div>
          </div>
        )}

        <div className="windows-container" style={{ 
          position: 'absolute', 
          top: `0`,
          left: 0,
          width: '100%', 
          height: `calc(100% )`,
          overflow: 'hidden'
        }}>
          {windows.map((window) => (
            <div
              key={window.id}
              style={{
                position: 'absolute',
                left: `${window.x}px`,
                top: `${window.y}px`,
                width: `${window.width}px`,
                height: `${window.height}px`,
                zIndex: window.zIndex,
                border: `${TILING_CONFIG.BORDER_WIDTH}px solid #444`,
                borderRadius: '4px',
                diesplay: 'flex',
              }}
            >
              <Window
                window={window}
                isActive={activeWindow === window.id}
                onClose={() => closeWindow(window.id)}
                onFocus={() => focusWindow(window.id)}
                onOpenWindow={createWindow}
              />
            </div>
          ))}
        </div>
        <div className="quick-launch">
          <button onClick={() => createWindow('about')} className="launch-icon" title="About (Alt+1)">
            <User size={20} />
          </button>
          <button onClick={() => createWindow('skills')} className="launch-icon" title="Skills (Alt+2)">
            <Wrench size={20} />
          </button>
          <button onClick={() => createWindow('projects')} className="launch-icon" title="Projects (Alt+3)">
            <Folder size={20} />
          </button>
          <button onClick={() => createWindow('contact')} className="launch-icon" title="Contact (Alt+4)">
            <Mail size={20} />
          </button>
          <button onClick={() => createWindow('experience')} className="launch-icon" title="Experience (Alt+5)">
            <Briefcase size={20} />
          </button>
          <button onClick={() => createWindow('sites')} className="launch-icon" title="External Sites (Alt+6)">
            <ExternalLink size={20} />
          </button>
          <button onClick={() => createWindow('terminal')} className="launch-icon" title="Terminal (Alt+T)">
            <Terminal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Window({ window, isActive, onClose, onFocus, onOpenWindow }) {
  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    onFocus();
  };


  return (
    <div
      className={`window ${isActive ? 'active' : ''}`}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'default'
      }}
      onClick={onFocus}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <span className="window-title">{window.title}</span>
        <div className="window-controls">
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </div>
      <div className={`window-body ${window.type === 'terminal' ? 'terminal-window' : ''}`}>
        {window.type === 'terminal' ? (
          <PortfolioTerminal
            isActive={isActive}
            onOpenWindow={onOpenWindow}
            onClose={onClose}
          />
        ) : (
          window.content
        )}
      </div>
    </div>
  );
}

export default App;
