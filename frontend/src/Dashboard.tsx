import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Playground } from './Playground';

// ─── News Pool ───────────────────────────────────────────────
// Every time the News modal opens, 3 random items are picked from this pool.
const NEWS_POOL = [
  { date: '2026-06-23', tag: 'feature', label: '[FEATURE]', content: 'Olympus Core v2.1 live — Case Studies engine now generates interactive comparison reports for every synthesized dashboard.' },
  { date: '2026-06-22', tag: 'update', label: '[UPDATE]', content: 'Neural routing latency reduced to 12ms. The AI prompt interpreter now supports multi-step chained commands.' },
  { date: '2026-06-21', tag: 'feature', label: '[FEATURE]', content: 'Olympus Core v2.0 deployed. Zero-latency data pipelines are now live globally.' },
  { date: '2026-06-20', tag: 'event', label: '[EVENT]', content: 'OLYMPUS.AI selected as finalist in Global AI Hackathon 2026. Results pending. ⚡' },
  { date: '2026-06-19', tag: 'update', label: '[UPDATE]', content: 'WebSocket throughput upgraded to 120Hz for premium tier users. Canvas rendering optimized.' },
  { date: '2026-06-18', tag: 'update', label: '[UPDATE]', content: 'Neural routing algorithm optimized. Processing speed increased by 400%.' },
  { date: '2026-06-17', tag: 'feature', label: '[FEATURE]', content: 'Vector Search now indexes 50,000+ UI primitives. Component matching accuracy at 97.3%.' },
  { date: '2026-06-16', tag: 'event', label: '[EVENT]', content: 'Olympus.AI architecture submitted for global hackathon evaluation. Awaiting results. ⚡' },
  { date: '2026-06-15', tag: 'update', label: '[UPDATE]', content: 'BullMQ workers can now simulate 10,000 concurrent data streams without CPU throttling.' },
  { date: '2026-06-14', tag: 'feature', label: '[FEATURE]', content: 'Dark mode glassmorphism theme v3 shipped. All generated UIs now inherit the new design tokens.' },
  { date: '2026-06-13', tag: 'event', label: '[EVENT]', content: 'Community spotlight: user-generated "Crypto Portfolio Tracker" hit 1M mock requests in 24 hours.' },
  { date: '2026-06-12', tag: 'update', label: '[UPDATE]', content: 'Zod schema validation layer hardened. Malformed prompts now return structured error diagnostics.' },
  { date: '2026-06-11', tag: 'feature', label: '[FEATURE]', content: 'Multi-panel layout engine released. Users can now request split-view dashboards in a single prompt.' },
  { date: '2026-06-10', tag: 'update', label: '[UPDATE]', content: 'Gemini API integration upgraded to v2-flash. Prompt-to-UI latency dropped below 800ms.' },
  { date: '2026-06-09', tag: 'event', label: '[EVENT]', content: 'OLYMPUS.AI surpassed 25,000 synthesized dashboards since launch. Growth rate: 3x week-over-week.' },
];

function pickRandomNews(count: number) {
  const shuffled = [...NEWS_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ─── Case Studies Data ───────────────────────────────────────
const CASE_STUDIES = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Dashboard',
    subtitle: 'Full inventory + sales analytics in 30 seconds',
    prompt: '"Build me a product inventory dashboard with sales charts and a REST API"',
    image: './case-ecommerce.png',
    color: '#00ffcc',
    metrics: [
      { label: 'API Endpoints', value: '3' },
      { label: 'UI Components', value: '4' },
      { label: 'Data Stream', value: '60fps' },
      { label: 'Build Time', value: '<30s' },
    ],
    details: 'OLYMPUS generated a live /api/products endpoint, real-time sales chart via WebSocket, glassmorphic product cards, and a filterable inventory table — all from a single natural-language prompt.',
  },
  {
    id: 'iot',
    title: 'IoT Monitoring Panel',
    subtitle: 'Real-time sensor feeds with threshold alerts',
    prompt: '"Create a sensor monitoring dashboard with temperature, humidity, and alert thresholds"',
    image: './case-iot.png',
    color: '#ff9f43',
    metrics: [
      { label: 'Data Streams', value: '5' },
      { label: 'Gauge Widgets', value: '3' },
      { label: 'Alert Rules', value: '2' },
      { label: 'Manual Code', value: '0' },
    ],
    details: 'WebSocket-fed gauge widgets, threshold alert system, and auto-generated /api/sensors mock routes were synthesized instantly. Canvas-rendered gauges update at 60fps.',
  },
  {
    id: 'social',
    title: 'Social Analytics Engine',
    subtitle: 'Engagement metrics & trend visualization',
    prompt: '"I need an analytics dashboard showing engagement rates, follower growth, and top posts"',
    image: './case-social.png',
    color: '#ff007f',
    metrics: [
      { label: 'UI Components', value: '6' },
      { label: 'Mock Routes', value: '2' },
      { label: 'Refresh Rate', value: '60Hz' },
      { label: 'Charts', value: '3' },
    ],
    details: 'Time-series charts, top-N ranking tables, and live metric cards with trend indicators were generated. The entire dashboard was built and streaming mock data in under 25 seconds.',
  },
];

// ─── Holographic Founder Card ────────────────────────────────
const HolographicCard = ({ name, role, image, instagram, color }: any) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className="holo-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ perspective: 1000 }}
    >
      <div className="holo-inner" style={{ boxShadow: `0 0 40px ${color}33`, borderColor: `${color}66` }}>
        <img src={image} alt={name} className="holo-image" />
        <div className="holo-overlay"></div>
        <div className="holo-content">
          <div className="holo-role" style={{ color: color }}>{role}</div>
          <div className="holo-name">{name}</div>
          <a href={instagram} target="_blank" rel="noreferrer" className="holo-btn" style={{ borderColor: color, color: color }}>CONNECT</a>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Image Lightbox ──────────────────────────────────────────
const ImageLightbox = ({ src, alt, color, onClose }: { src: string; alt: string; color: string; onClose: () => void }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Scanline effect */}
      <div className="lightbox-scanlines" />

      {/* Close button */}
      <motion.button
        className="lightbox-close"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onClose}
      >
        ✕
      </motion.button>

      {/* Image */}
      <motion.div
        className="lightbox-image-wrap"
        layoutId={`cs-image-${alt}`}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={alt} className="lightbox-image" />
        <motion.div
          className="lightbox-caption"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <span className="lightbox-dot" style={{ background: color }} />
          {alt}
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <motion.div className="lightbox-corner lt" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.4 }} style={{ background: color }} />
      <motion.div className="lightbox-corner rt" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.25, duration: 0.4 }} style={{ background: color }} />
      <motion.div className="lightbox-corner rb" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.4 }} style={{ background: color }} />
      <motion.div className="lightbox-corner lb" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.35, duration: 0.4 }} style={{ background: color }} />
    </motion.div>
  );
};

// ─── Case Study Card ─────────────────────────────────────────
const CaseStudyCard = ({ study, index, onImageClick }: { study: typeof CASE_STUDIES[0]; index: number; onImageClick: (study: typeof CASE_STUDIES[0]) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="cs-card"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ '--cs-accent': study.color } as React.CSSProperties}
    >
      {/* Image Preview — clickable */}
      <div className="cs-image-wrap" onClick={() => onImageClick(study)} style={{ cursor: 'zoom-in' }}>
        <motion.img
          src={study.image}
          alt={study.title}
          className="cs-image"
          layoutId={`cs-image-${study.title}`}
        />
        <div className="cs-image-overlay">
          <span className="cs-zoom-hint">🔍 Click to expand</span>
        </div>
        <div className="cs-badge" style={{ background: study.color }}>{study.id.toUpperCase()}</div>
      </div>

      {/* Content */}
      <div className="cs-body">
        <h3 className="cs-title">{study.title}</h3>
        <p className="cs-subtitle">{study.subtitle}</p>

        {/* The Prompt */}
        <div className="cs-prompt-block">
          <span className="cs-prompt-label">
            <span className="cs-prompt-dot" style={{ background: study.color }} />
            USER PROMPT
          </span>
          <p className="cs-prompt-text">{study.prompt}</p>
        </div>

        {/* Metrics Row */}
        <div className="cs-metrics">
          {study.metrics.map((m) => (
            <div className="cs-metric" key={m.label}>
              <span className="cs-metric-value" style={{ color: study.color }}>{m.value}</span>
              <span className="cs-metric-label">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Expandable Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="cs-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>{study.details}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button className="cs-toggle" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '▲ COLLAPSE' : '▼ VIEW SYNTHESIS LOG'}
        </button>
      </div>
    </motion.div>
  );
};

// ─── Services Data ───────────────────────────────────────────
const SERVICES_DATA = [
  {
    icon: '⚡',
    title: 'API Scaffolding',
    desc: 'Instant REST endpoint generation from natural language. Describe your data model and OLYMPUS builds live Express routes with mock controllers in real time.',
    color: '#00ffcc',
    tag: 'CORE',
  },
  {
    icon: '🖥️',
    title: 'Dashboard Synthesis',
    desc: 'AI-generated analytics dashboards with glassmorphism layouts, responsive grids, and themed components — all rendered dynamically in the browser.',
    color: '#bd93f9',
    tag: 'UI',
  },
  {
    icon: '📡',
    title: 'Real-Time Streaming',
    desc: 'WebSocket-powered data pipelines push synthetic traffic at 60fps. Canvas-rendered charts and gauges update in real time with zero latency.',
    color: '#ff9f43',
    tag: 'DATA',
  },
  {
    icon: '🔍',
    title: 'Vector Component Search',
    desc: 'MongoDB Atlas Vector Search indexes 50,000+ UI primitives. OLYMPUS matches your prompt to the best pre-built components with 97.3% accuracy.',
    color: '#ff007f',
    tag: 'AI',
  },
  {
    icon: '🛡️',
    title: 'Schema Validation',
    desc: 'Auto-generated Zod schemas validate every data flow. API documentation is synthesized alongside endpoints with type-safe contracts.',
    color: '#50fa7b',
    tag: 'SAFETY',
  },
  {
    icon: '⚙️',
    title: 'Background Workers',
    desc: 'BullMQ-powered workers simulate production-grade traffic patterns. Spin up 10,000 concurrent mock data streams without CPU throttling.',
    color: '#8be9fd',
    tag: 'INFRA',
  },
];

// ─── Synthesis Demo (interactive terminal) ───────────────────
const DEMO_PROMPT = 'Build me a sales dashboard with revenue charts and a REST API';
const DEMO_STEPS = [
  { text: '[PARSE]  Interpreting prompt schema...', color: '#888', delay: 0 },
  { text: '[AI]     Gemini v2-flash → mapped 3 UI primitives', color: '#bd93f9', delay: 400 },
  { text: '[API]    POST /api/sales         → CREATED', color: '#00ffcc', delay: 900 },
  { text: '[API]    GET  /api/sales/chart    → CREATED', color: '#00ffcc', delay: 1300 },
  { text: '[API]    GET  /api/sales/summary  → CREATED', color: '#00ffcc', delay: 1700 },
  { text: '[UI]     RevenueCard             → RENDERED', color: '#ff9f43', delay: 2200 },
  { text: '[UI]     LineChart               → RENDERED', color: '#ff9f43', delay: 2600 },
  { text: '[UI]     MetricsGrid             → RENDERED', color: '#ff9f43', delay: 3000 },
  { text: '[WS]     DataStream @60Hz        → ACTIVE', color: '#50fa7b', delay: 3500 },
  { text: '[DONE]   Dashboard synthesized in 0.8s ✓', color: '#00ffcc', delay: 4200 },
];

const SynthesisDemo = () => {
  const [typedText, setTypedText] = useState('');
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Type the prompt character by character
    let charIndex = 0;
    setTypedText('');
    setVisibleSteps([]);
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex < DEMO_PROMPT.length) {
        setTypedText(DEMO_PROMPT.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        // After typing, show synthesis steps one by one
        DEMO_STEPS.forEach((step, i) => {
          setTimeout(() => {
            setVisibleSteps(prev => [...prev, i]);
          }, step.delay);
        });
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="synth-demo">
      <div className="synth-header">
        <span className="synth-dot" style={{ background: '#ff5f56' }} />
        <span className="synth-dot" style={{ background: '#ffbd2e' }} />
        <span className="synth-dot" style={{ background: '#27c93f' }} />
        <span className="synth-title">olympus-synthesis-engine</span>
      </div>
      <div className="synth-body">
        <div className="synth-input-line">
          <span className="synth-prompt-symbol">❯</span>
          <span className="synth-typed">{typedText}</span>
          {isTyping && (
            <motion.span
              className="synth-cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            >▎</motion.span>
          )}
        </div>
        {!isTyping && (
          <div className="synth-output">
            {DEMO_STEPS.map((step, i) => (
              <AnimatePresence key={i}>
                {visibleSteps.includes(i) && (
                  <motion.div
                    className="synth-step"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ color: step.color }}
                  >
                    {step.text}
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// ─── MAIN DASHBOARD ──────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
export const Dashboard = () => {
  const [showNews, setShowNews] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showCaseStudies, setShowCaseStudies] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  const [lightboxStudy, setLightboxStudy] = useState<typeof CASE_STUDIES[0] | null>(null);
  const [hexData, setHexData] = useState('0x000000');
  const [currentNews, setCurrentNews] = useState(pickRandomNews(3));
  const [toast, setToast] = useState<{ message: string; emoji: string; color: string } | null>(null);

  const showToast = useCallback((message: string, emoji: string, color: string) => {
    setToast({ message, emoji, color });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Pick fresh random news every time the modal opens
  const openNews = useCallback(() => {
    setCurrentNews(pickRandomNews(3));
    setShowNews(true);
  }, []);

  // Hex data scrambler for the Watcher
  useEffect(() => {
    const interval = setInterval(() => {
      setHexData('0x' + Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0'));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Eye tracking logic for the Watcher
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eye = document.getElementById('olympus-eye');
      const pupil = document.getElementById('olympus-pupil');
      if (!eye || !pupil) return;
      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const deltaX = e.clientX - eyeX;
      const deltaY = e.clientY - eyeY;
      const angle = Math.atan2(deltaY, deltaX);
      const maxDist = 12;
      const distance = Math.min(maxDist, Math.sqrt(deltaX*deltaX + deltaY*deltaY) / 20);
      pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxStudy) { setLightboxStudy(null); return; }
        setShowNews(false);
        setShowAbout(false);
        setShowCaseStudies(false);
        setShowServices(false);
        setShowPricing(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container">
      {/* Background Decorators */}
      <div className="bg-grid">
        <div className="bg-line-h" />
        <div className="bg-line-v" />
      </div>

      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          OLYMPUS<span className="logo-accent">.AI</span>
        </div>
        <nav className="nav-links">
          <a href="#services" className="nav-link" onClick={(e) => { e.preventDefault(); setShowServices(true); }}>
            <span className="nav-num">01</span>
            <span className="nav-text">Services</span>
            <span className="nav-arrow">→</span>
          </a>
          <a href="#case-studies" className="nav-link" onClick={(e) => { e.preventDefault(); setShowCaseStudies(true); }}>
            <span className="nav-num">02</span>
            <span className="nav-text">Case Studies</span>
            <span className="nav-arrow">→</span>
          </a>
          <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); setShowAbout(true); }}>
            <span className="nav-num">03</span>
            <span className="nav-text">About</span>
            <span className="nav-arrow">→</span>
          </a>
          <a href="#news" className="nav-link" onClick={(e) => { e.preventDefault(); openNews(); }}>
            <span className="nav-num">04</span>
            <span className="nav-text">News</span>
            <span className="nav-arrow">→</span>
          </a>
          <a href="#pricing" className="nav-link" onClick={(e) => { e.preventDefault(); setShowPricing(true); }}>
            <span className="nav-num">05</span>
            <span className="nav-text">Pricing</span>
            <span className="nav-arrow">→</span>
          </a>
        </nav>

        {/* The Eye of Olympus Watcher Widget */}
        <div className="olympus-watcher">
          <svg id="olympus-eye" viewBox="0 0 100 100" className="cyber-eye">
            <defs>
              <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="4 4" className="spin-slow" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            <g id="olympus-pupil" style={{ transition: 'transform 0.05s linear' }}>
              <circle cx="50" cy="50" r="20" fill="url(#eyeGlow)" />
              <circle cx="50" cy="50" r="8" fill="#00ffcc" />
              <circle cx="48" cy="48" r="3" fill="#fff" />
              <path d="M 50 35 L 50 42 M 50 58 L 50 65 M 35 50 L 42 50 M 58 50 L 65 50" stroke="#000" strokeWidth="1.5" />
            </g>
          </svg>
          <div className="watcher-data">
            <div className="watcher-title">SYSTEM.CORE</div>
            <div className="watcher-status">
              <span className="status-dot"></span> ACTIVE
            </div>
            <div className="watcher-hex">{hexData}</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="content-area">
        {/* Section 1 */}
        <section className="section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            style={{ zIndex: 5, position: 'relative' }}
          >
            <h1 className="massive-typography">
              We advance API & UI<br />
              synthesis through AI,<br />
              speed, and real-time<br />
              generation.
            </h1>
            <motion.button 
              className="launch-playground-btn"
              onClick={() => setShowPlayground(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: '40px',
                padding: '16px 32px',
                background: '#00ffcc',
                color: '#000',
                border: 'none',
                borderRadius: '12px',
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '1.2rem',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 0 40px rgba(0, 255, 204, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              Get Started <span style={{ fontFamily: '"Fira Code", monospace' }}>→</span>
            </motion.button>
          </motion.div>
          <motion.div
            className="image-container"
            initial={{ x: '50%', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.2 }}
          >
            <img src="./core1.png" alt="Olympus Core Component" />
          </motion.div>
        </section>

        {/* Section 2 */}
        <section className="section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            style={{ zIndex: 5, position: 'relative' }}
          >
            <h1 className="massive-typography" style={{ maxWidth: '800px' }}>
              Zero-latency data<br />
              pipelines structured<br />
              perfectly in milliseconds.
            </h1>
          </motion.div>
          <motion.div
            className="image-container"
            initial={{ x: '50%', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.2 }}
          >
            <img src="./core2.png" alt="Data Pipeline" />
          </motion.div>
        </section>

        {/* Section 3 */}
        <section className="section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            style={{ zIndex: 5, position: 'relative' }}
          >
            <h1 className="massive-typography" style={{ maxWidth: '800px' }}>
              Neural routing that<br />
              anticipates your<br />
              application's scale.
            </h1>
          </motion.div>
          <motion.div
            className="image-container"
            initial={{ x: '50%', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.2 }}
          >
            <img src="./core3.png" alt="Neural Network Structure" />
          </motion.div>
        </section>
      </main>

      {/* Gen Z Control Panel */}
      <div className="gen-z-controls">
        <button className="gen-z-btn" title="Deploy to Production" onClick={() => showToast('Yeeting to production...', '🚀', '#00ffcc')}>YEET</button>
        <button className="gen-z-btn" title="System Health Check" onClick={() => showToast('Vibe check passed. System is bussin.', '✨', '#bd93f9')}>VIBE</button>
        <button className="gen-z-btn" title="Emergency Stop" onClick={() => showToast('Server killed. RIP.', '💀', '#ff5f56')}>R.I.P</button>
      </div>

      {/* ═══════════════════════════════════════════════════════
           NEWS MODAL — Random news each open
           ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showNews && (
          <motion.div
            className="news-modal-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(15px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setShowNews(false)}
          >
            <motion.div
              className="command-palette"
              initial={{ y: -50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cmd-header">
                <span className="cmd-dot red" onClick={() => setShowNews(false)}></span>
                <span className="cmd-dot yellow"></span>
                <span className="cmd-dot green"></span>
                <span className="cmd-title">root@olympus:~/logs</span>
              </div>
              <div className="cmd-body">
                <div className="cmd-input-line">
                  <span className="cmd-prompt">➜</span>
                  <span className="cmd-command">cat system_updates.log --random</span>
                  <motion.span
                    className="cmd-cursor"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >_</motion.span>
                </div>

                <div className="news-feed">
                  {currentNews.map((item, i) => (
                    <motion.div
                      className="news-item"
                      key={item.date + item.content.slice(0, 20) + i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12, duration: 0.4 }}
                    >
                      <div className="news-meta">
                        <span className="news-date">{item.date}</span>
                        <span className={`news-tag ${item.tag}`}>{item.label}</span>
                      </div>
                      <div className="news-content">{item.content}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="cmd-footer">
                Press <kbd>ESC</kbd> or click outside to close · Showing 3 of {NEWS_POOL.length} entries
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
           CASE STUDIES MODAL
           ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showCaseStudies && (
          <motion.div
            className="news-modal-overlay cs-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setShowCaseStudies(false)}
          >
            <motion.div
              className="cs-container"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="cs-header">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="cs-label">SYNTHESIS ARCHIVES</span>
                  <h2 className="cs-heading">Case Studies</h2>
                  <p className="cs-desc">Real prompts. Real outputs. Zero manual code.</p>
                </motion.div>
                <button className="cs-close-btn" onClick={() => setShowCaseStudies(false)}>✕</button>
              </div>

              {/* Cards Grid */}
              <div className="cs-grid">
                {CASE_STUDIES.map((study, i) => (
                  <CaseStudyCard key={study.id} study={study} index={i} onImageClick={setLightboxStudy} />
                ))}
              </div>

              <div className="cs-footer-bar">
                Press <kbd>ESC</kbd> or click outside to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
           SERVICES MODAL
           ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showServices && (
          <motion.div
            className="news-modal-overlay cs-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setShowServices(false)}
          >
            <motion.div
              className="cs-container svc-container"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="cs-header">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="cs-label">CAPABILITIES</span>
                  <h2 className="cs-heading">Services</h2>
                  <p className="cs-desc">What OLYMPUS.AI synthesizes for you — from prompt to production.</p>
                </motion.div>
                <button className="cs-close-btn" onClick={() => setShowServices(false)}>✕</button>
              </div>

              {/* Interactive Synthesis Demo */}
              <div className="svc-demo-section">
                <SynthesisDemo key={showServices ? 'open' : 'closed'} />
              </div>

              {/* Services Grid */}
              <div className="svc-grid">
                {SERVICES_DATA.map((svc, i) => (
                  <motion.div
                    className="svc-card"
                    key={svc.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ '--svc-accent': svc.color } as React.CSSProperties}
                  >
                    <div className="svc-card-top">
                      <span className="svc-icon">{svc.icon}</span>
                      <span className="svc-tag" style={{ color: svc.color, borderColor: `${svc.color}44` }}>{svc.tag}</span>
                    </div>
                    <h3 className="svc-title">{svc.title}</h3>
                    <p className="svc-desc">{svc.desc}</p>
                    <div className="svc-glow" style={{ background: `radial-gradient(circle at 50% 100%, ${svc.color}15 0%, transparent 70%)` }} />
                  </motion.div>
                ))}
              </div>

              <div className="cs-footer-bar">
                Press <kbd>ESC</kbd> or click outside to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
           ABOUT MODAL
           ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            className="news-modal-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setShowAbout(false)}
          >
            <motion.div
              className="about-container"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="about-header">
                <h2>THE ARCHITECTS</h2>
                <p>OLYMPUS.AI WAS SYNTHESIZED BY</p>
              </div>
              <div className="about-cards-wrapper">
                <HolographicCard
                  name="SHRESTHA S GUPTA"
                  role="LEAD ARCHITECT"
                  image="./builder1.png"
                  instagram="https://www.instagram.com/shrestha_s_gupta/"
                  color="#00ffcc"
                />
                <HolographicCard
                  name="MOHD. FAZAL"
                  role="FRONTEND SYNTHESIZER"
                  image="./builder2.png"
                  instagram="https://www.instagram.com/cholabhaturawithpyaaz/"
                  color="#ff007f"
                />
              </div>
              <button className="about-close-btn" onClick={() => { setShowAbout(false); setShowPlayground(true); }}>Get Started</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
           PRICING MODAL
           ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showPricing && (
          <motion.div
            className="news-modal-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setShowPricing(false)}
          >
            <motion.div
              className="pricing-container"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pricing-header">
                <h2>CHOOSE YOUR TIER</h2>
                <p>ACCESS THE FULL POWER OF OLYMPUS</p>
              </div>

              <div className="pricing-grid">
                {/* Mortal Tier */}
                <motion.div className="pricing-card mortal" whileHover={{ y: -10 }}>
                  <div className="pricing-tier">Mortal</div>
                  <div className="pricing-price">$0<span>/mo</span></div>
                  <div className="pricing-desc">Basic synthesis capabilities for personal projects and experimentation.</div>
                  <div className="pricing-features">
                    <div className="pricing-feature"><span className="feature-check">✓</span> 100 Syntheses / month</div>
                    <div className="pricing-feature"><span className="feature-check">✓</span> Standard generation queue</div>
                    <div className="pricing-feature"><span className="feature-check">✓</span> Watermarked dashboards</div>
                  </div>
                  <button className="pricing-btn outline" onClick={() => showToast('Mortal tier selected', '🥉', '#aaa')}>Start Free</button>
                </motion.div>

                {/* Olympian Tier (Highlighted in Middle) */}
                <motion.div className="pricing-card olympian" whileHover={{ y: -10 }}>
                  <div className="pricing-tier">Olympian</div>
                  <div className="pricing-price">$99<span>/mo</span></div>
                  <div className="pricing-desc">Ultimate power. Dedicated hardware cluster and God-mode API access.</div>
                  <div className="pricing-features">
                    <div className="pricing-feature"><span className="feature-check">✦</span> Unlimited live synthesis</div>
                    <div className="pricing-feature"><span className="feature-check">✦</span> Dedicated H100 GPU cluster</div>
                    <div className="pricing-feature"><span className="feature-check">✦</span> 120Hz WebSocket streams</div>
                    <div className="pricing-feature"><span className="feature-check">✦</span> Priority neural routing</div>
                    <div className="pricing-feature"><span className="feature-check">✦</span> God-mode API access</div>
                  </div>
                  <button className="pricing-btn solid" onClick={() => showToast('Welcome to Olympus', '👑', '#D4AF37')}>Ascend Now</button>
                </motion.div>

                {/* Demigod Tier */}
                <motion.div className="pricing-card demigod" whileHover={{ y: -10 }}>
                  <div className="pricing-tier">Demigod</div>
                  <div className="pricing-price">$29<span>/mo</span></div>
                  <div className="pricing-desc">Advanced features for power users and professional developers.</div>
                  <div className="pricing-features">
                    <div className="pricing-feature"><span className="feature-check">✓</span> 1,000 Syntheses / month</div>
                    <div className="pricing-feature"><span className="feature-check">✓</span> Priority generation queue</div>
                    <div className="pricing-feature"><span className="feature-check">✓</span> Remove watermarks</div>
                    <div className="pricing-feature"><span className="feature-check">✓</span> Custom UI tokens</div>
                  </div>
                  <button className="pricing-btn outline" onClick={() => showToast('Demigod tier selected', '⚡', '#aaa')}>Upgrade</button>
                </motion.div>
              </div>

              <button className="about-close-btn" onClick={() => setShowPricing(false)}>Return to Dashboard</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
           IMAGE LIGHTBOX
           ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxStudy && (
          <ImageLightbox
            src={lightboxStudy.image}
            alt={lightboxStudy.title}
            color={lightboxStudy.color}
            onClose={() => setLightboxStudy(null)}
          />
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
           TOAST NOTIFICATION
           ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast-notification"
            initial={{ opacity: 0, y: -30, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ borderLeftColor: toast.color }}
          >
            <span className="toast-emoji">{toast.emoji}</span>
            <span className="toast-msg">{toast.message}</span>
            <motion.div
              className="toast-progress"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3, ease: "linear" }}
              style={{ background: toast.color }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
           PLAYGROUND FULLSCREEN OVERLAY
           ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showPlayground && (
          <Playground onClose={() => setShowPlayground(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
