document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  const updateThemeIcon = (theme) => {
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
      }
    });
  };

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  updateThemeIcon(currentTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    });
  });

  // RTL Toggle
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
  const currentDir = localStorage.getItem('dir') || 'ltr';
  
  if (currentDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', dir);
      localStorage.setItem('dir', dir);
    });
  });

  // Drawer
  const menuToggle = document.querySelector('.menu-toggle');
  const closeDrawer = document.querySelector('.close-drawer');
  const drawer = document.querySelector('.drawer');
  const backdrop = document.querySelector('.backdrop');

  const openMenu = () => {
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('open');
    }
  };

  const closeMenu = () => {
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
    }
  };

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Active Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .drawer-links a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Navbar Scroll
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // Form Validation
  const forms = document.querySelectorAll('.validate-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('.form-control[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else if (input.type === 'email') {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!re.test(input.value.trim())) {
            isValid = false;
            input.classList.add('error');
          } else {
            input.classList.remove('error');
          }
        } else if (input.tagName === 'TEXTAREA' && input.value.trim().length < 20) {
          isValid = false;
          input.classList.add('error');
          // Add custom message or handle it if needed
        } else {
          input.classList.remove('error');
        }
      });

      if (isValid) {
        // Show success
        const successMsg = form.querySelector('.form-success');
        if (successMsg) successMsg.style.display = 'block';
        form.reset();
      }
    });
  });
});
