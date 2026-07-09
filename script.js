const revealItems = document.querySelectorAll('.reveal');
const topbar = document.querySelector('.topbar');

const setNavbarState = () => {
  if (!topbar) return;
  if (window.scrollY > 12) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', setNavbarState, { passive: true });
setNavbarState();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
if (isMobileViewport) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  revealItems.forEach((item) => observer.observe(item));
}

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const heroCard = document.querySelector('.hero-card');

if (heroCard && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  heroCard.addEventListener('pointermove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    heroCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
  });

  heroCard.addEventListener('pointerleave', () => {
    heroCard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  });
}

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    }
  });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = 'Thanks for reaching out. We will contact you shortly.';
    contactForm.reset();
  });
}

// Mobile hamburger toggle (header-only behavior)
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  const closeMobile = () => {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.classList.toggle('no-scroll', isOpen);
  });

  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMobile));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMobile();
  });
}
