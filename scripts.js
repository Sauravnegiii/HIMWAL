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
  // Dynamic Detail Boxes for Team and Advisors (about.html)
  function setupDynamicDetailBox(config) {
    const cards = document.querySelectorAll(config.cardsSelector);
    const box = document.getElementById(config.boxId);
    const img = document.getElementById(config.imgId);
    const nameEl = document.getElementById(config.nameId);
    const roleEl = document.getElementById(config.roleId);
    const bioEl = document.getElementById(config.bioId);
    const grid = document.getElementById(config.gridId);

    if (!cards.length || !box) return;

    let activeCard = cards[0];

    function updateDetail(card, isClick) {
      if (!card) return;
      const name = card.getAttribute('data-name');
      const role = card.getAttribute('data-role');
      const bio = card.getAttribute('data-bio');
      const imgSrc = card.getAttribute('data-img');

      cards.forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');

      if (isClick) {
        activeCard = card;
      }

      const animatedNodes = [nameEl, roleEl, bioEl, img];
      animatedNodes.forEach(node => node && node.classList.add('team-animating'));

      setTimeout(() => {
        if (nameEl && name) nameEl.textContent = name;
        if (roleEl && role) roleEl.textContent = role;
        if (bioEl && bio) bioEl.textContent = bio;
        if (img && imgSrc) {
          img.src = imgSrc;
          img.alt = name || 'Profile Image';
        }
        animatedNodes.forEach(node => node && node.classList.remove('team-animating'));
      }, 100);
    }

    cards.forEach(card => {
      card.addEventListener('mouseenter', function () {
        updateDetail(this, false);
      });

      card.addEventListener('click', function () {
        updateDetail(this, true);
      });
    });

    if (grid) {
      grid.addEventListener('mouseleave', function () {
        if (activeCard) {
          updateDetail(activeCard, false);
        }
      });
    }
  }

  // Initialize Meet Our Team box
  setupDynamicDetailBox({
    cardsSelector: '.team-card:not(.advisor-card)',
    boxId: 'team-detail-box',
    imgId: 'team-detail-img',
    nameId: 'team-detail-name',
    roleId: 'team-detail-role',
    bioId: 'team-detail-bio',
    gridId: 'team-grid'
  });

  // Initialize Advisors & Mentors box
  setupDynamicDetailBox({
    cardsSelector: '.advisor-card',
    boxId: 'advisor-detail-box',
    imgId: 'advisor-detail-img',
    nameId: 'advisor-detail-name',
    roleId: 'advisor-detail-role',
    bioId: 'advisor-detail-bio',
    gridId: 'advisor-grid'
  });

});

document.querySelectorAll(".program-card[data-link]").forEach(card => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
        window.location.href = card.dataset.link;
    });
});