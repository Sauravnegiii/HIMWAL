// Set footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for reveal animations
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add('show'), delay);
      io.unobserve(el);
    }
  });
}, {threshold: 0.12});
reveals.forEach(r => io.observe(r));

// subtle parallax: move .hero-bg on scroll
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
if(hero && heroBg){
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    // subtle translate to create parallax effect
    heroBg.style.transform = `translateY(${scrolled * 0.08}px)`;
  }, {passive:true});
}

// Animated counters for impact numbers
function animateCount(el, target){
  target = Number(target);
  const duration = 1500;
  const startTime = performance.now();
  function step(now){
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = progress; // could use easing
    const val = Math.floor(eased * target);
    el.textContent = val.toLocaleString();
    if(progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

// Observe impact numbers
const nums = document.querySelectorAll('.impact-item .num');
const numObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const el = e.target;
      const target = parseInt(el.dataset.target || el.textContent || 0, 10);
      animateCount(el, target);
      numObserver.unobserve(el);
    }
  });
}, {threshold: 0.4});
nums.forEach(n => numObserver.observe(n));

// Ensure reveal elements get 'show' if user loads near them
window.addEventListener('load', () => {
  reveals.forEach(r => {
    const rect = r.getBoundingClientRect();
    if(rect.top < window.innerHeight - 40) r.classList.add('show');
  });
});

// placeholder interactions (replace with real forms / flows)
document.getElementById('vol-signup')?.addEventListener('click', () => {
  alert('Volunteer form placeholder — replace with your form.');
});
document.getElementById('partner-btn')?.addEventListener('click', () => {
  alert('Corporate partnership placeholder — replace with partnership flow.');
});
document.getElementById('cf-send')?.addEventListener('click', () => {
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg = document.getElementById('cf-message').value.trim();
  if(!name || !email) {
    alert('Please enter name and email.');
    return;
  }
  // Replace with an AJAX call or integration with backend/email service:
  alert('Thanks ' + name + '! Message sent (placeholder). Replace with real backend to send emails.');
  document.getElementById('contact-form').reset();
});
