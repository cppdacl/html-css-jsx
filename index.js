document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = 100;

    const bgOpacity = Math.min(1, scrollY / maxScroll);
    const shadowOpacity = Math.min(0.25, (scrollY / maxScroll) * 0.25);

    navbar.style.background = `rgba(12, 11, 20, ${bgOpacity})`;
    navbar.style.boxShadow = `0 4px 20px rgba(0, 0, 0, ${shadowOpacity})`;
  });

  let toastContainer = document.querySelector('.toast-container');
  const contactBtn = document.querySelector('.contact-btn');
  const contactForm = document.querySelector('.contact-form');

  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  contactBtn.addEventListener('click', () => {
    if (document.querySelector('.toast-notify')) return;

    const toast = document.createElement('div');
    toast.className = 'toast-notify';
    toast.textContent = 'Your message has been sent!';
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
    }, 2500);

    setTimeout(() => {
      toast.remove();
    }, 3000);

    contactForm.reset();
  });

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink =
            document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});

const projectButtons = document.querySelectorAll('.proj-action-btn');

projectButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();

    const card = button.closest('.portfolio-card');

    const title = card.querySelector('h5').textContent;
    const description = card.dataset.description || '';
    const techTags = card.dataset.tech || '';
    const links = card.dataset.links || '';
    const additional = card.dataset.additional || '';

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&lt;';
    modal.appendChild(closeBtn);

    const header = document.createElement('div');
    header.className = 'modal-header';
    header.textContent = title;
    modal.appendChild(header);

    const body = document.createElement('div');
    body.className = 'modal-body';
    body.innerHTML = `
        <p>${description}</p>
        ${techTags ? `<p><strong>Tech:</strong> ${techTags}</p>` : ''}
        ${additional ? `<p>${additional}</p>` : ''}
    `;
    modal.appendChild(body);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add('show'));

    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('show');
      setTimeout(() => overlay.remove(), 300);
    });

    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
      }
    });
  });
});

const portfolioCards = document.querySelectorAll('.portfolio-card');
const portfolioSection = document.querySelector('#portfolio');

const colors = {
  'Nomikai': 'rgba(105, 13, 253, 0.1)',
  'Prism': 'rgba(0, 200, 200, 0.1)',
  'Arcane': 'rgba(255, 165, 0, 0.1)'
};

const hoverColors = {
  'Nomikai': 'rgba(105, 13, 253, 0.05)',
  'Prism': 'rgba(0, 200, 200, 0.05)',
  'Arcane': 'rgba(255, 165, 0, 0.05)'
};

portfolioCards.forEach(card => {
  const title = card.querySelector('h5');
  const projectName = title.textContent;

  card.addEventListener('mouseenter', () => {
    card.style.transition =
        'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease';
    card.style.transform = 'translateY(-8px)';
    card.style.backgroundColor =
        hoverColors[projectName] || 'rgba(18,18,31,0.05)';
    card.style.boxShadow = '0 18px 40px rgba(0,0,0,0.45)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.backgroundColor = '#12121f';
    card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
  });

  title.style.cursor = 'pointer';
  title.addEventListener('click', () => {
    portfolioSection.style.transition = 'background-color 0.4s ease';
    portfolioSection.style.backgroundColor =
        colors[projectName] || 'rgba(18,18,31,0.1)';
  });
});
