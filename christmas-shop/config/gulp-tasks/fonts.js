import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';
import { getFontWeight, sortFonts } from './functions.js';

export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, { encoding: false })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      }))
    )
    // Конвертируем в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    // Выгружаем в исходную папку
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}
export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, { encoding: false })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      }))
    )

    // Конвертируем в .woff
    // .pipe(fonter({
    //   formats: ['woff']
    // }))
    // Выгружаем в папку с результатом
    // .pipe(app.gulp.dest(`${app.path.build.fonts}`))

    // Ищем файлы шрифтов .ttf
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`), { encoding: false })
    // Конвертируем в .woff2
    .pipe(ttf2woff2())
    // Выгружаем в папку с результатом
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // Ищем файлы шрифтов .woff и woff2
    // .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.{woff,woff2}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.{woff2}`), { encoding: false })
    // Выгружаем в папку с результатом
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}
export const fonstStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts/fonts.scss`;
  // Если передан флаг --rewrite удаляем файл подключения шрифтов
  app.isFontsReW ? fs.unlink(fontsFile, cb) : null;
  // Проверяем существуют ли файлы шрифтов
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // Если файла нет, создаем его
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        fontsFiles = fontsFiles.sort(sortFonts);
        for (var i = 0; i < fontsFiles.length; i++) {
          // Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = getFontWeight(fontFileName, false);

            fs.appendFile(fontsFile, `@font-face {\n\tfont-family: '${fontName}';\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2');\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        // Если файл есть, выводим сообщение
        console.log("Файл scss/fonts/fonts.scss уже существует. Для обновления файла нужно его удалить!");
      }
    } else {
      // Если шрифтов нет
      fs.unlink(fontsFile, cb)
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
}
function cb() { }