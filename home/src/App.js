import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User, Wrench, Folder, Mail, Terminal, Github, Linkedin, Globe, ChevronRight } from "lucide-react";
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
          <p>Software Engineer • Computer Science Student • (Rust, C++) / Linux Enthusiast • Developer</p>
          <div className="bio">
            <p>
              Passionate about systems programming, open-source development, 
              and building efficient, reliable software. Skilled in C++, Rust, 
              and full-stack web technologies, with experience across Linux, 
              backend services, and modern application development.
            </p>
            <ul>
              <li>Focus: Systems Programming, Full-Stack Development</li>
              <li>Tech: C++, Java, Rust, Linux, React, Express</li>
              <li>Education: Computer Science Student at Cairo University</li>
              <li>Interests: Open Source, Linux Tools, Performance Optimization</li>
            </ul>
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
              <h3>Frontend</h3>
              <ul>
                <li>React.js / React Native</li>
                <li>JavaScript / TypeScript</li>
                <li>HTML5 / CSS</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js / Express</li>
                <li>Python / FastAPI</li>
                <li>Rust</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <ul>
                <li>Git / GitHub</li>
                <li>Azure</li>
                <li>Linux</li>
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
        <div className="project">
          <h3>Novel Nest App</h3>
          <p>
            A full-stack mobile and web application for book lovers, 
            featuring authentication, reviews, and personalized recommendations. 
            Built with Flutter and Firebase.
          </p>
          <div className="tech-tags">
            <span>Flutter</span>
            <span>Firebase</span>
            <span>TypeScript</span>
          </div>
        </div>
        <div className="project">
          <h3>crafty</h3>
          <p>
            A Rust-based CLI tool to manage ArchCraft packages from GitHub, 
            supporting search, install, upgrade, and dependency resolution.
          </p>
          <div className="tech-tags">
            <span>Rust</span>
            <span>CLI</span>
            <span>Linux</span>
          </div>
        </div>
        <div className="project">
          <h3>Rust File Manager</h3>
          <p>
            Terminal-based file manager built with Ratatui, 
            featuring bookmarking, navigation, and keyboard shortcuts.
          </p>
          <div className="tech-tags">
            <span>Rust</span>
            <span>Ratatui</span>
            <span>Linux</span>
          </div>
        </div>
        <div className="project">
          <h3>restlite.hpp</h3>
          <p>
            A modern single-header C++17 library for building RESTful APIs, 
            featuring routing, JSON parsing, multi-threading, and logging.
          </p>
          <div className="tech-tags">
            <span>C++17</span>
            <span>REST API</span>
            <span>JSON</span>
          </div>
        </div>
      </div>
    </div>
  ),
},'projects': {
  title: 'Projects',
  content: (
    <div className="window-content">
      <h2>Featured Projects</h2>
      <div className="projects-list">

        <div className="project">
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
            <span>Linux</span>
          </div>
        </div>

        <div className="project">
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

        <div className="project">
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

        <div className="project">
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

        <div className="project">
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

        <div className="project">
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

        <div className="project">
          <h3>cppi</h3>
          <p>
            A modern C++ preprocessor tool that enhances and simplifies handling of C++ code, 
            designed for extensibility and ease of integration into build systems.
          </p>
          <div className="tech-tags">
            <span>C++</span>
            <span>Networking</span>
            <span>Build Tools</span>
          </div>
        </div>

        <div className="project">
          <h3>Catch The Flag</h3>
          <p>
            Multiplayer capture-the-flag style game implemented in C++.  
            Focuses on networked gameplay, strategy, and performance in real-time.
          </p>
          <div className="tech-tags">
            <span>Java</span>
            <span>Game Development</span>
            <span>ECS</span>
          </div>
        </div>

        <div className="project">
          <h3>Novel Nest</h3>
          <p>
            An online bookstore application. Provides browsing, search, and review features for books.  
            Full-stack application with web front-end and backend services.
          </p>
          <div className="tech-tags">
            <span>Web</span>
            <span>Full-stack</span>
            <span>JavaScript / React Native / Node.js</span>
          </div>
        </div>

        <div className="project">
          <h3>compy</h3>
          <p>
            AST (Abstract Syntax Tree) generator for C++, built to parse code and output structured representations useful for code analysis or tooling.
          </p>
          <div className="tech-tags">
            <span>Java</span>
            <span>Parser / AST</span>
            <span>Code Analysis</span>
          </div>
        </div>

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
            <div className="contact-item">
              <h3><Mail size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> Email</h3>
              <p>philopaterwaheed9@gmail.com</p>
            </div>
            <div className="contact-item">
              <h3><Github size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> GitHub</h3>
              <a href="https://github.com/philopaterwaheed" target="_blank" rel="noopener noreferrer">
                <p>https://github.com/philopaterwaheed</p>
              </a>
            </div>
            <div className="contact-item">
              <h3><Linkedin size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> LinkedIn</h3>
              <a href="https://www.linkedin.com/in/philopater-waheed-561292227/" target="_blank" rel="noopener noreferrer">
                <p>https://www.linkedin.com/in/philopater-waheed-561292227/</p>
              </a>
            </div>
            <div className="contact-item">
              <h3><Globe size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> Portfolio</h3>
              <a href="https://philopaterwaheed.github.io" target="_blank" rel="noopener noreferrer">
                <p>https://philopaterwaheed.github.io</p>
              </a>
            </div>
          </div>
        </div>
      )
    },
    'terminal': {
      title: 'Terminal',
      content: (
        <div className="window-content terminal-content">
          <div className="terminal-header">philosan@portfolio:~$</div>
          <div className="terminal-output">
            <p>Welcome to my portfolio terminal!</p>
            <p>Available commands:</p>
            <p><ChevronRight size={12} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} /> whoami - Display user information</p>
            <p><ChevronRight size={12} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} /> ls - List portfolio sections</p>
            <p><ChevronRight size={12} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} /> cat about.txt - Show about information</p>
            <p><ChevronRight size={12} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} /> help - Show available shortcuts</p>
            <br />
            <p>Use keyboard shortcuts to navigate:</p>
            <p>Alt+1: About | Alt+2: Skills | Alt+3: Projects</p>
            <p>Alt+4: Contact | Alt+T: Terminal | Alt+H: Help</p>
          </div>
        </div>
      )
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
        const newMasterId = filteredWindows[0].id;
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
          <button onClick={() => createWindow('terminal')} className="launch-icon" title="Terminal (Alt+T)">
            <Terminal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Window({ window, isActive, onClose, onFocus }) {
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
      <div className={`window-body ${window.title === 'Terminal' ? 'terminal-window' : ''}`}>
        {window.content}
      </div>
    </div>
  );
}

export default App;
