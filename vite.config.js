import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lesson: resolve(__dirname, 'pages/lesson.html'),
        quiz: resolve(__dirname, 'pages/quiz.html'),
        game: resolve(__dirname, 'pages/game.html'),
        worksheet: resolve(__dirname, 'pages/worksheet.html'),
        teacher: resolve(__dirname, 'pages/teacher.html')
      }
    }
  }
});
