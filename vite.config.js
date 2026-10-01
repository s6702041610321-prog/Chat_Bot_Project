import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lesson: resolve(__dirname, 'lesson.html'),
        quiz: resolve(__dirname, 'quiz.html'),
        game: resolve(__dirname, 'game.html'),
        worksheet: resolve(__dirname, 'worksheet.html'),
        teacher: resolve(__dirname, 'teacher.html')
      }
    }
  }
});
