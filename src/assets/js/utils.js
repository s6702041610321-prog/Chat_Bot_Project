/* ===== UTILS.JS ===== */
window.Utils = (function(){
  function showToast(msg, type='info'){
    const wrap = document.getElementById('toastWrap') || (() => {
      const d = document.createElement('div');
      d.id = 'toastWrap'; d.className = 'toast-wrap';
      document.body.appendChild(d); return d;
    })();
    const el = document.createElement('div');
    const icons = {info:'💬',success:'✅',error:'❌',warning:'⚠️'};
    el.className = `toast ${type}`; el.textContent = (icons[type]||'') + ' ' + msg;
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-20px)'; setTimeout(()=>el.remove(),300); }, 3000);
  }

  const Storage = {
    get: (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
    set: (k,v) => localStorage.setItem(k, JSON.stringify(v)),
    remove: (k) => localStorage.removeItem(k)
  };

  function calcScore(answers, questions) {
    let score = 0;
    questions.forEach((q, i) => { if(answers[i] === q.a) score++; });
    return score;
  }

  function formatTime(secs) {
    const m = Math.floor(secs/60).toString().padStart(2,'0');
    const s = (secs%60).toString().padStart(2,'0');
    return `${m}:${s}`;
  }

  function formatDate(iso) {
    if(!iso) return '-';
    const d = new Date(iso);
    return d.toLocaleDateString('th-TH', { year:'numeric', month:'long', day:'numeric' });
  }

  function generateCertID() {
    return 'CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  function initTheme() {
    const saved = localStorage.getItem('cb_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    const btn = document.getElementById('themeToggle');
    if(btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const curr = document.documentElement.getAttribute('data-theme');
    const next = curr === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cb_theme', next);
    const btn = document.getElementById('themeToggle');
    if(btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
  }

  // Simple Confetti
  function confetti(amount=50) {
    const colors = ['#7c6bf0','#06d6a0','#f72585','#ffd166'];
    for(let i=0; i<amount; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[Math.floor(Math.random()*colors.length)];
      c.style.animationDuration = (Math.random() * 2 + 1) + 's';
      c.style.animationDelay = (Math.random() * 0.5) + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3000);
    }
  }

  function downloadCSV(data, filename) {
    if(!data || !data.length) return;
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for(const row of data) {
      const values = headers.map(header => {
        const escaped = (''+row[header]).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    const blob = new Blob(["\uFEFF"+csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  
  const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbylHk_skS1aPfvjxR5isK6XTJu3zZO4HrBJcExS2Xhx1DPoa_AUprCckokoVuqao26a/exec'; // ⭐️ นำ URL จาก Google Apps Script มาใส่ในเครื่องหมายคำพูดนี้

  function syncToGoogleSheet(activityName = 'ภาพรวม') {
    if (!GOOGLE_SHEET_URL) return; // ถ้ายังไม่มี URL ไม่ต้องส่ง
    
    const user = Storage.get('cb_user') || {};
    const prog = Storage.get('cb_progress') || {};
    
    const data = {
      name: user.fullname && user.fullname !== 'ผู้เข้ารับการอบรม' ? user.fullname : (user.tempId || 'ไม่ระบุชื่อ'),
      room: user.room || '-',
      preTest: prog.preTest ? prog.preTest.score : '-',
      postTest: prog.postTest ? prog.postTest.score : '-',
      lessons: prog.lessons && Object.keys(prog.lessons).length >= 6 ? 'ครบ' : 'กำลังเรียน',
      games: prog.games && Object.keys(prog.games).length >= 3 ? 'ครบ' : 'กำลังเล่น',
      worksheets: prog.worksheets && Object.keys(prog.worksheets).length >= 3 ? 'ครบ' : 'กำลังทำ',
      certId: user.certId || '-',
      activity: activityName
    };

    if(!user.tempId && user.fullname === 'ผู้เข้ารับการอบรม') {
       user.tempId = 'GUEST-' + Math.floor(Math.random()*10000);
       Storage.set('cb_user', user);
       data.name = user.tempId;
    }

    const formData = new URLSearchParams();
    for (let key in data) formData.append(key, data[key]);

    fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    }).catch(err => console.error('Sheet Sync Error:', err));
  }

  return { showToast, syncToGoogleSheet, Storage, calcScore, formatTime, formatDate, generateCertID, initTheme, toggleTheme, confetti, downloadCSV };
})();


