export const translations = () => {
     return app.gulp.src(app.path.src.translations)
          .pipe(app.gulp.dest(app.path.build.translations))
          .pipe(app.plugins.browserSync.stream());
}