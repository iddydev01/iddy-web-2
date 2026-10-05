/**
 * Personal Business Website: Mr. Iddy Hamis Maulid
 * Vanilla JavaScript (ES6+) - Navigation, Filters, WhatsApp Dispatcher, & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC TOP SCROLL PROGRESS BAR
  const progressBar = document.createElement('div');
  progressBar.id = 'scrollProgressBar';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });

  // 2. MOBILE NAVIGATION DRAWER
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }

  // 3. REAL-TIME FILTERING (For Portfolio & Courses)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card, .course-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || (category && category.includes(filterValue))) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // 4. DIRECT-TO-WHATSAPP FORM SUBMISSION
  const whatsappForm = document.getElementById('whatsappContactForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const contact = document.getElementById('senderContact').value.trim();
      const service = document.getElementById('senderService').value;
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !contact || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      const text = 
`*NEW INQUIRY FROM IDDY.DEV WEBSITE*
----------------------------------------
*Name:* ${name}
*Contact:* ${contact}
*Interested In:* ${service}
----------------------------------------
*Message:*
${message}`;

      const whatsappURL = `https://wa.me/255740090129?text=${encodeURIComponent(text)}`;
      window.open(whatsappURL, '_blank');
      whatsappForm.reset();
    });
  }

  // 5. NATIVE SCROLL-TRIGGERED REVEAL ANIMATIONS (IntersectionObserver)
  const revealElements = document.querySelectorAll(
    '.project-card, .course-card, .ebook-card, .pillar-card, .cert-card, .skill-category-card, .contact-info-card, .contact-form-card, .resource-banner'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
});