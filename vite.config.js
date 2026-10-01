import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lesson: resolve(__dirname, 'src/lesson.html'),
        quiz: resolve(__dirname, 'src/quiz.html'),
        game: resolve(__dirname, 'src/game.html'),
        worksheet: resolve(__dirname, 'src/worksheet.html'),

        teacher: resolve(__dirname, 'src/teacher.html')
      }
    }
  }
});
