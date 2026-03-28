/* ===== HERO SLIDER ===== */
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.sdot');
  if (!slides.length) return;
  let cur = 0;

  function show(n) {
    slides[cur].classList.remove('active');
    if (dots[cur]) dots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    if (dots[cur]) dots[cur].classList.add('active');
  }

  window.nextSlide = () => show(cur + 1);
  window.prevSlide = () => show(cur - 1);
  window.goSlide  = (n) => show(n);

  setInterval(() => show(cur + 1), 5000);
}

/* ===== COUNTER ANIMATION ===== */
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const isK = target >= 1000;
      let cur = 0;
      const step = Math.ceil(target / 80);
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = isK ? Math.floor(cur / 1000) + 'K+' : cur + '+';
        if (cur >= target) clearInterval(t);
      }, 25);
      obs.unobserve(el);
    });
  }, { threshold: 0.3 });

  counters.forEach(c => obs.observe(c));
}

/* ===== PRODUCT CAROUSEL ===== */
function initCarousel() {
  const track = document.getElementById('productTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.product-card');
  let pos = 0;
  const visible = window.innerWidth < 700 ? 2 : 4;
  const max = Math.max(0, cards.length - visible);

  function getCardW() {
    return cards[0] ? cards[0].offsetWidth + 20 : 0;
  }
  window.carNext = () => { if (pos < max) { pos++; track.style.transform = `translateX(-${pos * getCardW()}px)`; } };
  window.carPrev = () => { if (pos > 0) { pos--; track.style.transform = `translateX(-${pos * getCardW()}px)`; } };
}

/* ===== CONTACT FORM with EmailJS ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const msg = document.getElementById('formMsg');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const params = {
      from_name:    form.name.value,
      from_phone:   form.phone.value,
      from_email:   form.email.value,
      product:      form.product ? form.product.value : '',
      message:      form.message.value,
      to_email:     'info.agrishield@gmail.com',
    };

    emailjs.send('service_agrishield', 'template_agrishield', params)
      .then(() => {
        msg.className = 'form-msg success';
        msg.textContent = '✅ Thank you! Your enquiry has been sent. We will contact you shortly.';
        form.reset();
        btn.textContent = 'Send Enquiry';
        btn.disabled = false;
      })
      .catch(() => {
        /* Fallback: open mailto */
        const body = `Name: ${params.from_name}\nPhone: ${params.from_phone}\nEmail: ${params.from_email}\nProduct: ${params.product}\nMessage: ${params.message}`;
        window.location.href = `mailto:info.agrishield@gmail.com?subject=Website Enquiry from ${params.from_name}&body=${encodeURIComponent(body)}`;
        msg.className = 'form-msg success';
        msg.textContent = '✅ Opening your email client to send the enquiry...';
        btn.textContent = 'Send Enquiry';
        btn.disabled = false;
      });
  });
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const items = document.querySelectorAll('.product-card, .cert-card, .about-img-box');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}

/* ===== INIT ALL ===== */
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initCounters();
  initCarousel();
  initContactForm();
  initScrollReveal();
});
