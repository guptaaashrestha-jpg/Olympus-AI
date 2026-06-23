import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'PROMPT' | 'THINKING' | 'RESULT';

const SUGGESTIONS = [
  'Revenue Analytics',
  'Social Media Metrics',
  'Inventory Tracker',
  'Customer Insights',
  'Startup KPI Dashboard'
];

const THINKING_STEPS = [
  'Understanding data requirements...',
  'Designing layout...',
  'Generating charts...',
  'Optimizing UX...'
];

// Helper to count up numbers
const AnimatedNumber = ({ target, duration }: { target: number, duration: number }) => {
  const [val, setVal] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;
    const incrementTime = (duration / end) * 1000;
    const timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        setVal(end);
        clearInterval(timer);
      } else {
        setVal(start);
      }
    }, Math.max(incrementTime, 20));
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{val.toLocaleString()}</>;
};

export const Playground = ({ onClose }: { onClose: () => void }) => {
  const [phase, setPhase] = useState<Phase>('PROMPT');
  const [prompt, setPrompt] = useState('');
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  
  // States for sequential thinking
  const [activeStep, setActiveStep] = useState(-1);
  
  // States for sequential materialization
  const [showSkeletons, setShowSkeletons] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [drawCharts, setDrawCharts] = useState(false);
  const [countNumbers, setCountNumbers] = useState(false);
  const [finalGlow, setFinalGlow] = useState(false);

  // Mouse tracking for spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;
    setPhase('THINKING');
    
    // AI Thinking Sequence
    setActiveStep(0);
    setTimeout(() => setActiveStep(1), 1000);
    setTimeout(() => setActiveStep(2), 2200);
    setTimeout(() => setActiveStep(3), 3200);
    
    // Transition to Result
    setTimeout(() => {
      setPhase('RESULT');
      // Staggered Materialization Sequence
      setTimeout(() => setShowSkeletons(true), 200);
      setTimeout(() => setShowCards(true), 1000);
      setTimeout(() => setDrawCharts(true), 1800);
      setTimeout(() => setCountNumbers(true), 2400);
      setTimeout(() => setFinalGlow(true), 3500);
    }, 4500);
  };

  const handleReset = () => {
    setPhase('PROMPT');
    setPrompt('');
    setActiveStep(-1);
    setShowSkeletons(false);
    setShowCards(false);
    setDrawCharts(false);
    setCountNumbers(false);
    setFinalGlow(false);
  };

  return (
    <motion.div
      className="playground-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ─── Premium Background Effects ─── */}
      <div className="pg-aurora-container">
        <div className="pg-aurora-blob pg-aurora-1" />
        <div className="pg-aurora-blob pg-aurora-2" />
      </div>
      <div className="pg-grid-bg" style={{ opacity: phase === 'PROMPT' ? 0.3 : 0.8 }} />
      <div 
        className="pg-mouse-spotlight" 
        style={{ left: mousePos.x, top: mousePos.y, opacity: phase === 'PROMPT' ? 1 : 0 }} 
      />

      {/* Floating Elements (Only in Prompt/Thinking) */}
      <AnimatePresence>
        {(phase === 'PROMPT' || phase === 'THINKING') && (
          <>
            <motion.div 
              className="pg-floating-widget" 
              style={{ top: '15%', left: '10%', width: 200, height: 120 }}
              animate={{ y: [0, -20, 0], opacity: phase === 'THINKING' ? 0.8 : 0.3 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 80 Q 25 20 50 50 T 100 10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
              </svg>
            </motion.div>
            <motion.div 
              className="pg-floating-widget" 
              style={{ bottom: '20%', right: '15%', width: 150, height: 180 }}
              animate={{ y: [0, 30, 0], opacity: phase === 'THINKING' ? 0.8 : 0.3 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div style={{ width: '80%', height: '20px', background: 'rgba(255,255,255,0.1)', marginBottom: 10, borderRadius: 4 }} />
              <div style={{ width: '60%', height: '20px', background: 'rgba(255,255,255,0.1)', marginBottom: 10, borderRadius: 4 }} />
              <div style={{ width: '90%', height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Header ─── */}
      <header className="pg-header">
        <div className="pg-logo">OLYMPUS<span className="pg-logo-accent">.AI</span></div>
        <button className="pg-close-btn" onClick={onClose}>[ EXIT ]</button>
      </header>

      {/* ─── Main Content Area ─── */}
      <main className="pg-content">
        
        {/* Phase 1: PROMPT */}
        {phase === 'PROMPT' && (
          <motion.div
            className="pg-prompt-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="pg-prompt-title">What would you like to build?</h1>
            
            <motion.form 
              onSubmit={handlePromptSubmit} 
              className="pg-input-wrapper"
              layoutId="prompt-box" // Magic morphing key
            >
              <input
                type="text"
                className="pg-input"
                placeholder="Describe your dashboard..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                autoFocus
              />
              <button type="submit" className="pg-submit-btn">✦</button>
            </motion.form>

            <div className="pg-chips-wrapper">
              {SUGGESTIONS.map(s => (
                <div key={s} className="pg-chip" onClick={() => setPrompt(s)}>
                  {s}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase 2: THINKING */}
        {phase === 'THINKING' && (
          <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* The Morphed Prompt Box */}
            <motion.div 
              layoutId="prompt-box" 
              className="pg-morphed-header"
              style={{ marginBottom: '60px' }}
            >
              <span style={{ color: '#EAE0C8' }}>✦</span>
              <h2 className="pg-morphed-prompt">{prompt}</h2>
            </motion.div>

            {/* Sequential Steps */}
            <div className="pg-thinking-container">
              <AnimatePresence>
                {THINKING_STEPS.map((step, i) => (
                  activeStep >= i && (
                    <motion.div
                      key={step}
                      className="pg-think-step"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    >
                      {activeStep === i && <div className="pg-think-spinner" />}
                      {activeStep > i && <span style={{ color: '#D4AF37' }}>✓</span>}
                      {step}
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Phase 3: RESULT MATERIALIZATION */}
        {phase === 'RESULT' && (
          <div className={`pg-dash-wrapper ${finalGlow ? 'glow-active' : ''}`}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <motion.div layoutId="prompt-box" className="pg-morphed-header" style={{ margin: 0 }}>
                <span style={{ color: '#EAE0C8' }}>✦</span>
                <h2 className="pg-morphed-prompt">{prompt}</h2>
              </motion.div>
              
              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
                className="pg-close-btn" onClick={handleReset}
              >
                [ NEW PROMPT ]
              </motion.button>
            </div>

            {/* Skeletons & Cards */}
            <div className="pg-dash-metrics">
              {[
                { l: 'Total Revenue', v: 124500, prefix: '$' },
                { l: 'Active Users', v: 8421, prefix: '' },
                { l: 'Server Load', v: 42, prefix: '', suffix: '%' },
                { l: 'Error Rate', v: 0.01, prefix: '', suffix: '%' },
              ].map((m, i) => (
                <motion.div 
                  className="pg-dash-metric-card" 
                  key={i}
                  initial={{ opacity: 0, borderColor: 'rgba(255,255,255,0.05)' }}
                  animate={{ 
                    opacity: showSkeletons ? 1 : 0,
                    borderColor: showCards ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255,255,255,0.05)'
                  }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="pg-glow-pulse" />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: showCards ? 1 : 0, y: showCards ? 0 : 10 }}
                  >
                    <div className="pg-dmc-label">{m.l}</div>
                    <div className="pg-dmc-value">
                      {m.prefix}
                      {countNumbers ? <AnimatedNumber target={m.v} duration={1.5} /> : '0'}
                      {m.suffix}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Main Chart Area */}
            <div className="pg-dash-main">
              <motion.div 
                className="pg-dash-chart"
                initial={{ opacity: 0 }}
                animate={{ opacity: showSkeletons ? 1 : 0 }}
              >
                <div className="pg-glow-pulse" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: showCards ? 1 : 0 }}>
                  <div className="pg-dmc-label">Revenue Overview (Real-time)</div>
                  
                  <div style={{ width: '100%', height: '240px', marginTop: '20px', position: 'relative' }}>
                    <svg viewBox="0 0 800 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(212, 175, 55, 0.5)" />
                          <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 50 L 800 50 M 0 100 L 800 100 M 0 150 L 800 150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                      
                      {/* Animated Draw Line */}
                      <motion.path 
                        d="M 0 180 Q 50 160 100 170 T 200 140 T 300 150 T 400 110 T 500 130 T 600 70 T 700 80 T 800 20" 
                        fill="none" 
                        stroke="#EAE0C8" 
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: drawCharts ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                      
                      <motion.path 
                        d="M 0 180 Q 50 160 100 170 T 200 140 T 300 150 T 400 110 T 500 130 T 600 70 T 700 80 T 800 20 L 800 200 L 0 200 Z" 
                        fill="url(#chartGlow)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: drawCharts ? 1 : 0 }}
                        transition={{ duration: 1, delay: 1 }}
                      />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="pg-dash-feed"
                initial={{ opacity: 0 }}
                animate={{ opacity: showSkeletons ? 1 : 0 }}
              >
                <div className="pg-glow-pulse" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: showCards ? 1 : 0 }}>
                  <div className="pg-dmc-label">System Feed</div>
                  <div className="pg-log-list" style={{ marginTop: '16px' }}>
                    {[1,2,3,4,5,6,7].map((n, i) => (
                      <motion.div 
                        className="pg-log-item" key={n}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: countNumbers ? 1 : 0, x: countNumbers ? 0 : -10 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="pg-log-time" style={{ fontSize: '12px' }}>Now</span>
                        <span className="pg-log-msg">Data packet {Math.floor(Math.random()*9000)+1000} synced</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        )}
      </main>
    </motion.div>
  );
};
