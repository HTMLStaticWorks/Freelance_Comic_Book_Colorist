document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Sidebar Toggle
  const dashMenuBtn = document.querySelector('.dash-menu-toggle');
  const dashSidebar = document.querySelector('.dashboard-sidebar');
  const dashBackdrop = document.querySelector('.dash-backdrop');

  if (dashMenuBtn && dashSidebar && dashBackdrop) {
    dashMenuBtn.addEventListener('click', () => {
      dashSidebar.classList.add('open');
      dashBackdrop.classList.add('open');
    });

    dashBackdrop.addEventListener('click', () => {
      dashSidebar.classList.remove('open');
      dashBackdrop.classList.remove('open');
    });
  }

  // Theme Toggle (reusing main logic structure)
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const htmlEl = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') htmlEl.setAttribute('data-theme', 'dark');

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (htmlEl.getAttribute('data-theme') === 'dark') {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        htmlEl.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  });

  // RTL Toggle
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const savedDir = localStorage.getItem('dir') || 'ltr';
  if (savedDir === 'rtl') htmlEl.setAttribute('dir', 'rtl');

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (htmlEl.getAttribute('dir') === 'rtl') {
        htmlEl.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
      } else {
        htmlEl.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
      }
    });
  });

  // File Upload Drag & Drop Feedback
  const uploadZone = document.getElementById('uploadZone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });
    uploadZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
    });
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      alert('Files accepted for upload! (Dummy interaction)');
    });
    uploadZone.addEventListener('click', () => {
      document.getElementById('fileInput').click();
    });
    document.getElementById('fileInput')?.addEventListener('change', () => {
      alert('File selected! (Dummy interaction)');
    });
  }

  // Handle Page Modal
  window.openModal = function(title, imgSrc, status, notes) {
    const modal = document.getElementById('pageModal');
    if (!modal) return;
    
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalNotes').textContent = notes;
    
    let badgeClass = 'review';
    if (status.toLowerCase() === 'approved') badgeClass = 'approved';
    if (status.toLowerCase() === 'coloring') badgeClass = 'coloring';
    if (status.toLowerCase() === 'flatting') badgeClass = 'flatting';
    
    document.getElementById('modalStatusContainer').innerHTML = `<span class="status-badge ${badgeClass}">${status}</span>`;
    
    document.getElementById('reviewSuccess').style.display = 'none';
    modal.classList.add('open');
  };

  window.closeModal = function() {
    const modal = document.getElementById('pageModal');
    if (modal) modal.classList.remove('open');
  };

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('reviewSuccess').style.display = 'block';
    });
  }

  // Approve button inside modal
  window.approvePage = function() {
    document.getElementById('modalStatusContainer').innerHTML = `<span class="status-badge approved">Approved</span>`;
    document.getElementById('reviewSuccess').textContent = 'Page approved!';
    document.getElementById('reviewSuccess').style.display = 'block';
  };

  // Palette interactions
  window.toggleRevision = function(id) {
    const box = document.getElementById('rev-box-' + id);
    if (box) box.classList.toggle('open');
  };

  window.submitRevision = function(e, id) {
    e.preventDefault();
    const success = document.getElementById('rev-success-' + id);
    if (success) success.style.display = 'block';
    
    // Change status badge
    const card = document.getElementById('palette-' + id);
    if (card) {
      card.className = 'palette-card status-revision';
      const badge = document.getElementById('badge-' + id);
      if (badge) {
        badge.className = 'status-badge';
        badge.style.background = '#ff5252';
        badge.textContent = 'Revision Requested';
      }
    }
  };

  window.approvePalette = function(id) {
    const card = document.getElementById('palette-' + id);
    if (card) {
      card.className = 'palette-card status-approved';
      const badge = document.getElementById('badge-' + id);
      if (badge) {
        badge.className = 'status-badge approved';
        badge.textContent = 'Approved';
      }
    }
    const box = document.getElementById('rev-box-' + id);
    if (box) box.classList.remove('open');
  };

  // Downloads Export Form
  window.submitExport = function(e) {
    e.preventDefault();
    document.getElementById('exportSuccess').style.display = 'block';
  };
});
