
const fs = require('fs');
const content = fs.readFileSync('f:/chatbot-learning/index.html', 'utf8');
const match = content.match(/<title>(.*?)<\/title>/);
console.log(match ? match[1] : 'No title');

