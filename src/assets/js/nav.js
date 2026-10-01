window.Nav = (function() {
  function renderTopNav(activeId) {
    const nav = document.createElement('nav');
    nav.className = 'top-navbar no-print';
    
    const items = [
      { id: 'home', label: 'หน้าหลัก', href: '/' },
      { id: 'pre', label: 'แบบทดสอบก่อนเรียน', href: '/quiz?type=pre' },
      { id: 'lesson', label: 'บทเรียน', href: '/lesson' },
      { id: 'game', label: 'เกม', href: '/game' },
      { id: 'post', label: 'แบบทดสอบหลังเรียน', href: '/quiz?type=post' }
    ];

    let html = '<div class="nav-container">';
    items.forEach(item => {
      const isActive = item.id === activeId ? 'active' : '';
      html += `<a href="${item.href}" class="nav-item ${isActive}" onclick="return Nav.checkAccess('${item.id}', event)">${item.label}</a>`;
    });
    html += '</div>';
    nav.innerHTML = html;
    
    document.body.insertBefore(nav, document.body.firstChild);
  }

  function checkAccess(targetId, e) {
    if (targetId === 'home') return true;

    const prog = window.Utils.Storage.get('cb_progress') || {};
    const preDone = !!prog.preTest;

    // ล็อคแค่แบบทดสอบหลังเรียน ต้องทำก่อนเรียนก่อน
    if (targetId === 'post') {
        if (!preDone) {
            if(e) e.preventDefault();
            window.Utils.showToast('⚠️ ต้องทำแบบทดสอบก่อนเรียนให้เสร็จก่อนครับ', 'warning');
            return false;
        }
    }

    return true;
  }

  function protectPage(pageId) {
    if (!checkAccess(pageId, null)) {
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    }
  }

  return { renderTopNav, checkAccess, protectPage };
})();
