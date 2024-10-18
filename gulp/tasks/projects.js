export const projects = () => {
     return app.gulp.src(app.path.src.projects)
          .pipe(app.gulp.dest(app.path.build.projects))
          .pipe(app.plugins.browserSync.stream());
}