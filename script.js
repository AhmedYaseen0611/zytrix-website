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

revealItems.forEach((item) => observer.observe(item));

document.getElementById('year').textContent = new Date().getFullYear();

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
