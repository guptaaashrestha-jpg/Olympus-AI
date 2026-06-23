/* ============================================================
   OLYMPUS.AI — Landing Page Animations & Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Wait for GSAP to load
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded, falling back to CSS animations');
    initFallback();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  initHeroAnimations();
  initNavbar();
  initScrollReveal();
  initTypingEffect();
  initMobileMenu();
  initCTAForm();
  initParallaxDots();
  initParallaxScroll();
  initTerminalSurprise();
});

/* ── HERO ANIMATIONS ───────────────────────────────────────── */
function initHeroAnimations() {
  const title = document.getElementById('heroTitle');
  if (!title) return;

  // Split title into characters
  const text = title.textContent;
  title.innerHTML = '';

  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    title.appendChild(span);
  });

  const chars = title.querySelectorAll('.char');
  const subtitle = document.getElementById('heroSubtitle');
  const tagline = document.getElementById('heroTagline');
  const ctaGroup = document.getElementById('heroCta');

  // Master timeline
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.to(chars, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.04,
    delay: 0.3,
  })
  .to(subtitle, {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.4')
  .to(tagline, {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.5')
  .to(ctaGroup, {
    opacity: 1,
    y: 0,
    duration: 0.8,
  }, '-=0.5');
}

/* ── NAVBAR SHOW/HIDE ON SCROLL ────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;

        // Add scrolled class for glassmorphism
        if (currentScroll > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
          navbar.classList.add('hidden');
        } else {
          navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ── SCROLL REVEAL (Intersection Observer + GSAP) ──────────── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add class to trigger CSS transition reveals
          if (!entry.target.classList.contains('is-visible')) {
            entry.target.classList.add('is-visible');

            // Play GSAP animations only when it first becomes visible
            const isArchFlow = entry.target.querySelector('.arch-flow');
            if (isArchFlow) {
              gsap.fromTo(isArchFlow.querySelectorAll('.arch-panel'), 
                { x: (i) => (i === 0 ? -60 : 60), opacity: 0 },
                { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'expo.out' }
              );
              gsap.fromTo(isArchFlow.querySelector('.arch-connector'), 
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, delay: 0.4, ease: 'back.out(1.7)' }
              );
            }
          }
        } else {
          // Remove class when out of view so it animates again next time
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ── TYPING EFFECT ─────────────────────────────────────────── */
function initTypingEffect() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  const prompts = [
    '"Build a real-time analytics dashboard for my e-commerce store"',
    '"Create a project management board with drag-and-drop tasks"',
    '"Generate a weather monitoring panel with live sensor data"',
    '"Design a social media dashboard with engagement metrics"',
  ];

  let currentPrompt = 0;
  let currentChar = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const prompt = prompts[currentPrompt];

    if (isPaused) {
      isPaused = false;
      setTimeout(type, 2000);
      return;
    }

    if (!isDeleting) {
      // Typing
      typingEl.textContent = prompt.substring(0, currentChar + 1);
      currentChar++;

      if (currentChar === prompt.length) {
        isPaused = true;
        isDeleting = true;
        setTimeout(type, 100);
        return;
      }

      setTimeout(type, 40 + Math.random() * 30);
    } else {
      // Deleting
      typingEl.textContent = prompt.substring(0, currentChar - 1);
      currentChar--;

      if (currentChar === 0) {
        isDeleting = false;
        currentPrompt = (currentPrompt + 1) % prompts.length;
        setTimeout(type, 500);
        return;
      }

      setTimeout(type, 20);
    }
  }

  // Start typing after hero animation
  setTimeout(type, 2500);
}

/* ── MOBILE MENU ───────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── CTA FORM ──────────────────────────────────────────────── */
function initCTAForm() {
  const form = document.getElementById('ctaForm');
  const input = document.getElementById('ctaEmail');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) return;

    // Animate success
    const btn = form.querySelector('.btn-primary');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      You're In!
    `;
    btn.style.background = '#22c55e';
    input.value = '';
    input.disabled = true;

    gsap.from(btn, {
      scale: 0.9,
      duration: 0.4,
      ease: 'back.out(1.7)',
    });

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      input.disabled = false;
    }, 3000);
  });
}

/* ── PARALLAX FLOATING DOTS ────────────────────────────────── */
function initParallaxDots() {
  const dots = document.querySelectorAll('.floating-dot');
  if (dots.length === 0) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    dots.forEach((dot, i) => {
      const speed = (i + 1) * 12;
      gsap.to(dot, {
        x: x * speed,
        y: y * speed,
        duration: 1.2,
        ease: 'power2.out',
      });
    });
  });
}

/* ── FALLBACK (no GSAP) ───────────────────────────────────── */
function initFallback() {
  // Simple CSS-only reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => observer.observe(el));

  // Show hero elements
  const heroEls = document.querySelectorAll('.hero-subtitle, .hero-tagline, .hero-cta-group');
  heroEls.forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  // Show hero title chars
  const title = document.getElementById('heroTitle');
  if (title) {
    title.querySelectorAll('.char').forEach((c) => {
      c.style.opacity = '1';
      c.style.transform = 'none';
    });
  }

  initNavbar();
  initTypingEffect();
  initMobileMenu();
  initCTAForm();
  initTerminalSurprise();
}

/* ── TERMINAL SURPRISE MODAL ───────────────────────────────── */
function initTerminalSurprise() {
  const blogLink = document.getElementById('blogLink');
  const overlay = document.getElementById('terminalOverlay');
  const body = document.getElementById('terminalBody');
  const closeBtn = document.getElementById('terminalClose');
  
  if (!blogLink || !overlay || !body) return;

  const sequence = [
    { text: "> init blog_engine.sh", delay: 800 },
    { text: "> Loading neural pathways...", delay: 1200 },
    { text: "> Fetching latest thoughts from OLYMPUS core...", delay: 1500 },
    { text: "> SYNTHESIZING MARKDOWN...", delay: 2000 },
    { text: "> ERROR: Human thoughts are too complex and nuanced to synthesize accurately.", delay: 1000, type: 'error' },
    { text: "> Reverting to manual mode...", delay: 1500, type: 'info' },
    { text: "> Our engineers (Shrestha & Fazal) are currently writing this section by hand.", delay: 2000, type: 'info' },
    { text: "> Please check back soon!", delay: 500, type: 'info' }
  ];

  let isActive = false;

  blogLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (isActive) return;
    isActive = true;
    
    // Reset terminal
    body.innerHTML = '<span class="terminal-cursor" id="termCursor"></span>';
    closeBtn.classList.remove('show');
    overlay.classList.add('active');
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    let currentDelay = 500;
    
    sequence.forEach((item, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        if (item.type) line.classList.add(item.type);
        line.textContent = item.text;
        
        const cursor = document.getElementById('termCursor');
        body.insertBefore(line, cursor);
        
        // Auto scroll to bottom
        body.scrollTop = body.scrollHeight;

        if (index === sequence.length - 1) {
          setTimeout(() => {
            closeBtn.classList.add('show');
          }, 800);
        }
      }, currentDelay);
      currentDelay += item.delay;
    });
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      isActive = false;
    }, 500);
  });
}

/* ── SCROLL PARALLAX ───────────────────────────────────────── */
function initParallaxScroll() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Subtle upward parallax for showcase cards
  gsap.utils.toArray('.showcase-card').forEach((card, i) => {
    gsap.to(card, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Floating effect for feature cards on scroll
  gsap.utils.toArray('.feature-card').forEach((card, i) => {
    // Alternate direction slightly based on index
    const yOffset = (i % 2 === 0) ? -30 : -50;
    
    gsap.to(card, {
      y: yOffset,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Parallax for background floating dots if they exist
  gsap.utils.toArray('.floating-dot').forEach((dot, i) => {
    const speed = (i + 1) * 30;
    gsap.to(dot, {
      y: -speed,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  });

  // Global Parallax Background
  const globalBg = document.getElementById('globalParallaxBg');
  if (globalBg) {
    gsap.to(globalBg, {
      y: '20vh', // Move it down as we scroll up
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1 // smooth scrubbing for global bg
      }
    });
  }
}

// Senior Master UI Transition Sequence
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href="http://localhost:5173"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const container = document.getElementById('masterTransition');
      if (!container) return;
      
      // Block interaction during transition
      container.style.pointerEvents = 'all';
      
      const tl = gsap.timeline();
      
      // Phase 1: The Void consumes the page (Iris Wipe)
      tl.to('.mt-void', { 
        clipPath: 'circle(150% at 50% 50%)', 
        duration: 0.8, 
        ease: 'power4.inOut' 
      })
      
      // Phase 2: CRT Laser splits the darkness
      .to('.mt-laser-line', { opacity: 1, duration: 0.1 }, "-=0.2")
      .to('.mt-laser-line', { scaleX: 1, duration: 0.5, ease: 'expo.out' })
      .to('.mt-laser-line', { scaleY: 200, opacity: 0, duration: 0.4, ease: 'expo.in' }, "+=0.1")
      
      // Phase 3: The 3D Neural Rings activate
      .to('.mt-rings', { opacity: 1, duration: 0.1 }, "-=0.3")
      .fromTo('.mt-ring', 
        { scale: 0, rotationZ: 0 }, 
        { scale: 2, rotationZ: 180, duration: 2, stagger: 0.15, ease: 'power2.out', clearProps: "all" }, 
        "-=0.3"
      )
      
      // Phase 4: Data decoding & Brand reveal
      .to('.mt-glitch', { opacity: 1, duration: 0.1 }, "-=1.8")
      .call(() => {
        const glitchEl = document.querySelector('.mt-glitch');
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
        let inter = setInterval(() => {
          let str = "";
          for(let i=0; i<12; i++) str += chars[Math.floor(Math.random()*chars.length)];
          glitchEl.innerText = str;
        }, 50);
        setTimeout(() => {
          clearInterval(inter);
          glitchEl.innerText = "SYSTEM.READY";
          glitchEl.style.color = "white";
        }, 800);
      })
      .to('.mt-brand', { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, "-=1.5")
      .to('.mt-sub', { opacity: 1, y: -10, duration: 0.6, ease: 'power2.out' }, "-=1.2")
      
      // Phase 5: The Hyperdrive Jump (Screen Flash)
      .to('.mt-brand', { scale: 1.2, filter: 'blur(5px)', duration: 0.4, ease: 'power4.in' }, "+=0.3")
      .to('.mt-rings', { scale: 3, opacity: 0, duration: 0.4, ease: 'power4.in' }, "-=0.4")
      .to('.mt-flash', { opacity: 1, duration: 0.2 })
      .call(() => {
        window.location.href = "http://localhost:5173";
      });
    });
  });
});
