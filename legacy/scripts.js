// ========================================
// HIMWAL - Shared Scripts
// ========================================

document.addEventListener('DOMContentLoaded', function () {

  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
      this.classList.toggle('active');
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        if (nav) nav.classList.remove('nav-open');
        if (menuToggle) menuToggle.classList.remove('active');
      }
    });
  });

  // Header shadow on scroll
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 50 ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
    }, { passive: true });
  }

  // Animated counters
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(easeOutQuart * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(update);
  }

  const impactNumbers = document.querySelectorAll('.impact-number');
  if (impactNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    impactNumbers.forEach(num => counterObserver.observe(num));
  }

  // Fade-in animations
  const animatedElements = document.querySelectorAll('.program-card, .info-card, .involve-card, .gallery-item, .product-card');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });

  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) { alert('Please fill in all fields.'); return; }
      alert('Thank you, ' + name + '! Your message has been received. We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Filter: Gallery & Programs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.gallery-item, .program-card');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        filterItems.forEach(item => {
          item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? '' : 'none';
        });
      });
    });
  }

  // Filter: Products
  const catTabs = document.querySelectorAll('.cat-tab');
  const productCards = document.querySelectorAll('.product-card');
  if (catTabs.length) {
    catTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        catTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        productCards.forEach(card => {
          card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? '' : 'none';
        });
      });
    });
  }
  // Profile Pop-Up Modal (about.html)
  const profileModal = document.getElementById('profileModal');
  const modalImg = document.getElementById('modalProfileImg');
  const modalName = document.getElementById('modalProfileName');
  const modalRole = document.getElementById('modalProfileRole');
  const modalTag = document.getElementById('modalProfileTag');
  const modalBio = document.getElementById('modalProfileBio');
  const closeBtn = document.getElementById('closeProfileModal');
  const closeBtnBottom = document.getElementById('closeProfileModalBtn');
  const profileCards = document.querySelectorAll('.team-card');

  if (profileModal && profileCards.length) {
    function openProfileModal(card) {
      const name = card.getAttribute('data-name');
      const role = card.getAttribute('data-role');
      const bio = card.getAttribute('data-bio');
      const img = card.getAttribute('data-img');
      const isAdvisor = card.classList.contains('advisor-card');

      if (modalName) modalName.textContent = name || '';
      if (modalRole) modalRole.textContent = role || '';
      if (modalBio) modalBio.textContent = bio || '';
      if (modalTag) modalTag.textContent = isAdvisor ? 'Advisor & Mentor' : 'Team Member';
      if (modalImg) {
        modalImg.src = img || '';
        modalImg.alt = name || 'Profile';
      }

      profileModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeProfileModal() {
      profileModal.style.display = 'none';
      document.body.style.overflow = '';
    }

    profileCards.forEach(card => {
      card.addEventListener('click', function () {
        openProfileModal(this);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeProfileModal);
    if (closeBtnBottom) closeBtnBottom.addEventListener('click', closeProfileModal);

    profileModal.addEventListener('click', function (e) {
      if (e.target === profileModal) {
        closeProfileModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && profileModal.style.display === 'flex') {
        closeProfileModal();
      }
    });
  }

});

document.querySelectorAll(".program-card[data-link]").forEach(card => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
        window.location.href = card.dataset.link;
    });
});