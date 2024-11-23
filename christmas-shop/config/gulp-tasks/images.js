import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
  return app.gulp.src(app.path.src.images, { encoding: false })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "IMAGES",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(
      app.plugins.if(
        app.isWebP,
        webp()
      )
    )
    .pipe(
      app.plugins.if(
        app.isWebP,
        app.gulp.dest(app.path.build.images)
      )
    )
    .pipe(
      app.plugins.if(
        app.isWebP,
        app.gulp.src(app.path.src.images, { encoding: false })
      )
    )
    .pipe(
      app.plugins.if(
        app.isWebP,
        app.plugins.newer(app.path.build.images)
      )
    )
    .pipe(imagemin())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg, { encoding: false }))
    .pipe(app.gulp.dest(app.path.build.images));
}