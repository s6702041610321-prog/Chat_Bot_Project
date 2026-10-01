# การออกแบบและสร้าง Chatbot - โปรเจกต์บทเรียนออนไลน์ 🤖

## เกี่ยวกับโปรเจกต์
ระบบบทเรียนออนไลน์แบบ Multi-page สำหรับวิชาการสร้างแชทบอท ใช้งานได้โดยไม่ต้องติดตั้งเซิร์ฟเวอร์ เพียงเปิดไฟล์ด้วย Browser

## โครงสร้างไฟล์
```
chatbot-learning/
├── index.html          ← เริ่มต้นที่นี่ (หน้า Login)
├── home.html           ← Dashboard ผู้เรียน
├── lesson.html         ← บทเรียน I → A → P
├── quiz.html           ← แบบทดสอบก่อน/หลังเรียน
├── game.html           ← เกม 3 แบบ
├── worksheet.html      ← ใบงาน 3 ชิ้น
├── result.html         ← ผลการเรียนและใบรับรอง
├── teacher.html        ← Dashboard ครู (password: teacher2568)
└── assets/
    ├── css/            ← Stylesheets
    └── js/             ← JavaScript modules
```

## วิธีใช้งาน
1. เปิดไฟล์ `index.html` ด้วย Browser (Chrome/Firefox/Edge)
2. กรอกชื่อ-นามสกุลและห้องเรียน
3. เริ่มเรียนตามลำดับ: แบบทดสอบก่อนเรียน → บทเรียน → เกม → แบบทดสอบหลังเรียน

## ฟีเจอร์
- 📝 แบบทดสอบ 10 ข้อ พร้อม Timer 15 นาที
- 📚 บทเรียน 6 หัวข้อ + Flashcard 12 ใบ
- 🎮 เกม 3 แบบ (เรียงขั้นตอน / จับคู่ Intent / ชี้ข้อผิดพลาด)
- 📋 ใบงาน 3 ชิ้น กรอกได้และ Print เป็น PDF
- 🏆 ระบบ Achievement Badges
- 🎓 ใบรับรองผลการเรียน (Printable Certificate)
- 👩‍🏫 Teacher Dashboard พร้อม Export CSV
- 🌙 Dark/Light Mode
- 📱 รองรับ Mobile

## เทคโนโลยี
- HTML5, CSS3 (Glassmorphism), Vanilla JavaScript
- localStorage สำหรับบันทึกข้อมูล
- Google Fonts: Space Grotesk + Sarabun
- Canvas API สำหรับ Particle Animation

## วิชา
การสร้างแชทบอท · ปีการศึกษา 2568