window.Nav = (function() {
  function renderTopNav(activeId) {
    const nav = document.createElement('nav');
    nav.className = 'top-navbar no-print';
    
    const items = [
      { id: 'home', label: 'หน้าหลัก', href: '/' },
      { id: 'pre', label: 'แบบทดสอบก่อนเรียน', href: '/src/quiz.html?type=pre' },
      { id: 'lesson', label: 'บทเรียน', href: '/src/lesson.html' },
      { id: 'game', label: 'เกมเสริมการเรียนรู้', href: '/src/game.html' },
      { id: 'post', label: 'แบบทดสอบหลังเรียน', href: '/src/quiz.html?type=post' }
    ];

    let html = '<div class="nav-container">';
    items.forEach(item => {
      const isActive = item.id === activeId ? 'active' : '';
      html += `<a href="${item.href}" class="nav-item ${isActive}" onclick="return Nav.checkAccess('${item.id}', event)">${item.label}</a>`;
    });
    html += '</div>';
    nav.innerHTML = html;
    
    // Insert after body starts, but before bg-grad so it stays on top structurally
    document.body.insertBefore(nav, document.body.firstChild);
  }

  function checkAccess(targetId, e) {
    if (targetId === 'home') return true;

    const prog = window.Utils.Storage.get('cb_progress') || {};
    const preDone = !!prog.preTest;
    const lessonDone = prog.lessons && Object.keys(prog.lessons).length >= 6;
    const gameDone = prog.games && Object.keys(prog.games).length >= 3;

    if (targetId === 'lesson' || targetId === 'game' || targetId === 'post') {
        if (!preDone) {
            if(e) e.preventDefault();
            window.Utils.showToast('⚠️ ต้องทำแบบทดสอบก่อนเรียนก่อนครับ', 'warning');
            return false;
        }
    }
    
    if (targetId === 'game' || targetId === 'post') {
        if (!lessonDone) {
            if(e) e.preventDefault();
            window.Utils.showToast('⚠️ ต้องอ่านบทเรียนให้จบก่อนครับ', 'warning');
            return false;
        }
    }

    if (targetId === 'post') {
        if (!gameDone) {
            if(e) e.preventDefault();
            window.Utils.showToast('⚠️ ต้องเล่นเกมให้ครบก่อนครับ', 'warning');
            return false;
        }
    }

    return true;
  }

  function protectPage(pageId) {
    if (!checkAccess(pageId, null)) {
        setTimeout(() => {
            window.location.href = '/';
        }, 1500); // Give time for toast to be seen
    }
  }

  return { renderTopNav, checkAccess, protectPage };
})();
