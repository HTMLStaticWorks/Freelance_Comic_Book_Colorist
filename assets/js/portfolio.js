document.addEventListener('DOMContentLoaded', () => {
  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
      btn.classList.add('active', 'btn-primary');
      
      const filterValue = btn.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'flex'; // It's a flex column item
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Vanilla JS Lightbox
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
  
  if (lightboxTriggers.length > 0) {
    // Create Lightbox DOM
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        <button class="lightbox-close"><i class="ph ph-x"></i></button>
        <img class="lightbox-img" src="" alt="Lightbox Image">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    const overlay = lightbox.querySelector('.lightbox-overlay');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const img = lightbox.querySelector('.lightbox-img');
    const caption = lightbox.querySelector('.lightbox-caption');

    const closeLightbox = () => {
      lightbox.classList.remove('active');
    };

    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const src = trigger.getAttribute('href');
        const title = trigger.getAttribute('data-title');
        
        img.src = src;
        caption.textContent = title || '';
        lightbox.classList.add('active');
      });
    });

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
  }

  // Before/After Slider
  const sliders = document.querySelectorAll('.ba-slider');
  sliders.forEach(slider => {
    const resizer = slider.querySelector('.ba-resizer');
    
    // Add touch and mouse event listeners
    let active = false;
    
    slider.addEventListener('mousedown', () => active = true);
    document.addEventListener('mouseup', () => active = false);
    document.addEventListener('mouseleave', () => active = false);
    
    slider.addEventListener('mousemove', (e) => {
      if (!active) return;
      let x = e.pageX - slider.getBoundingClientRect().left;
      slide(x);
    });
    
    slider.addEventListener('touchstart', () => active = true);
    document.addEventListener('touchend', () => active = false);
    slider.addEventListener('touchmove', (e) => {
      if (!active) return;
      let x = e.touches[0].pageX - slider.getBoundingClientRect().left;
      slide(x);
    });
    
    function slide(x) {
      let width = slider.offsetWidth;
      if (x < 0) x = 0;
      if (x > width) x = width;
      resizer.style.width = x + 'px';
    }
  });
});
