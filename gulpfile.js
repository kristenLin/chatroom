const gulp         = require('gulp');
const server       = require('browser-sync').create();
const sass         = require('gulp-sass');
const rimraf       = require('rimraf');
const sourcemaps   = require('gulp-sourcemaps');
const file_include  = require('gulp-file-include');
const newer        = require('gulp-newer');
const concat       = require('gulp-concat');
const rename       = require('gulp-rename');
const uglify       = require('gulp-uglify');
const minify       = require('gulp-clean-css');
const autoprefixer  = require('gulp-autoprefixer');
const util         = require('gulp-util');
const terser       = require('gulp-terser');
const hb           = require('gulp-hb');
const dataJson     = require("gulp-data-json");
var nodemon        = require('gulp-nodemon');

const paths = {

    dist: {
        folder: 'dist'
    },

    plugins: {
        all:    'src/assets/js/**/*.js',
        src:    'src/assets/js/plugins/*.js',
        dest:   'dist/assets/js/plugins/'
    },
    // i18n:{
    //     all: 'src/assets/js/lang/**/*.js',
    //     src: 'src/assets/js/lang/**/*.js',
    //     dest:'src/assets/js/lang/'
    // },
    hb: {
        all:    'src/assets/data/**/*.{js,json}',
        src:    'src/assets/data/*.{js,json}',
        dest:   'dist/assets/data/*.{js,json}'
    },
    scss: {
        all:    'src/assets/scss/**/*',
        src:    'src/assets/scss/template.scss',
        dest:   'dist/assets/css/'
    },

    scss_dark: {
        all:    'src/assets/scss/**/*',
        src:    'src/assets/scss/template.dark.scss',
        dest:   'dist/assets/css/'
    },

    images: {
        all:    'src/assets/images/**/*',
        src:    'src/assets/images/**/*',
        dest:   'dist/assets/images/'
    },

    fonts: {
        all:    'src/assets/fonts/**/*',
        src:    'src/assets/fonts/**/*',
        dest:   'dist/assets/fonts/'
    },

    html: {
        all:    'src/**/*.html',
        src:    ['src/*.html', 'src/**/*.html', '!src/particles', '!src/particles/**/*'],
        dest:   'dist/'
    },

    css: {
        all:    'src/assets/*',
        src:    'src/assets/css/*.css',
        dest:   'dist/assets/css/'
    },

    bootstrap: {
        src:    'src/assets/js/bootstrap/*',
        dest:   'dist/assets/js/bootstrap/'
    },

    libs: {
        src:    'src/assets/js/libs/*',
        dest:   'dist/assets/js/libs/'
    },
    
    template_scripts: {
        src:    'src/assets/js/template.js',
        dest:   'dist/assets/js/',
    },

    dependencies: [
        {
            files: "bootstrap.bundle.min.js",
            from:  "node_modules/bootstrap/dist/js",
            to:    "src/assets/js/bootstrap/"
        }, {
            files: "**/*.scss",
            from:  "node_modules/bootstrap/scss/",
            to:    "src/assets/scss/bootstrap/"
        }, {
            files: "jquery.min.js",
            from: "node_modules/jquery/dist/",
            to: "src/assets/js/libs/"
        }, {
            files: "dropzone.js",
            from: "node_modules/dropzone/dist/",
            to: "src/assets/js/plugins/"
        }, {
            files: "svg-injector.min.js",
            from: "node_modules/svg-injector/dist",
            to: "src/assets/js/plugins/"
        }, {
            files: "autosize.min.js",
            from: "node_modules/autosize/dist",
            to: "src/assets/js/plugins/"
        }, {
            files: "zoom-vanilla.min.js",
            from: "node_modules/zoom-vanilla.js/dist",
            to: "src/assets/js/plugins/"
        }

    ]
};

function html() {
    return gulp.src(paths.html.src)
        .pipe(file_include({
            prefix:   '@@',
            basepath: '@file',
            indent:   true,
            context: {
                theme: 'auto'
            }   
        }))
        .pipe(dataJson())
        .pipe(hb()
            .partials(paths.html.dest)
            .data(paths.hb.src)
        )
        // .pipe(i18n({
        //     langDir: path.i18n.dest,
        //     renderEngine: 'mustache',
        //     trace: true
        //   }))
        .pipe(gulp.dest(paths.html.dest));
}

// Plugins
//
//

function plugins() {
    return gulp.src(paths.plugins.src)

        .pipe(concat('plugins.bundle.js'))
        .pipe(gulp.dest(paths.plugins.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(terser())
        .pipe(gulp.dest(paths.plugins.dest));
}

// Bootstrap, Libs, Template Scripts
//
//

function bootstrap_scripts() {
    return gulp.src(paths.bootstrap.src)
        .pipe(gulp.dest(paths.bootstrap.dest));
}

function libs_scripts() {
    return gulp.src(paths.libs.src)
        .pipe(gulp.dest(paths.libs.dest));
}

function template_scripts() {
    return gulp.src(paths.template_scripts.src)
        .pipe(gulp.dest(paths.template_scripts.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(terser())
        .pipe(gulp.dest(paths.template_scripts.dest));
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

function css() {
    return gulp.src(paths.css.src)
        .pipe(gulp.dest(paths.css.dest));
}

// Dependencies
//
//

gulp.task('deps', done => {
    paths.dependencies.forEach(function(files) {
        gulp.src(`${files.from}/${files.files}`)
            .pipe(newer(files.to))
            .pipe(gulp.dest(files.to));
    });
    //console.log(paths)
    done();
});

function style() {
    return gulp.src(paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'] }))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(minify({keepBreaks: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest));
}

function style_dark() {
    return gulp.src(paths.scss_dark.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'] }))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(minify({keepBreaks: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest));
}


// gulp.task('default', done => {
//     done();     
// });

gulp.task('default', async function () {
    await console.log('Hello World!');
});

function reload(done) {
    server.reload();
    done();
}



//  function serve(done) {
//     server.init({
        
//         server: {
//             baseDir: 'dist/'
//         }
    
   
//     });
//     done();
// }

 function serve(done) {
    server.init({
       // proxy: "http://localhost:3010", // port of node server
        server: {
            baseDir: 'dist/'
        },
        middleware: function (req, res, next) {
            // console.log(req);
            // console.log("Hi from middleware");
            // console.log(res);
            next();
        },
        // https: {
        //     key: "path-to-custom.key",
        //     cert: "path-to-custom.crt"
        // }
        //files: ["public/**/*.*"],
       // files: ["dist/"],
        browser: "google chrome",
        //port: 3000,
        socket: {
            domain: 'localhost:3010'
        }
  
    });
    done();
}



// gulp.task('browser-sync', async function() {
// 	server.init(null, {
// 		proxy: "http://localhost:5000",
//         files: ["public/**/*.*"],
//         browser: "google chrome",
//         port: 7000,
// 	});
// });



gulp.task('nodemon', async function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'index.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('watch', async function() {
    await gulp.watch(paths.html.all, gulp.series(html, reload));
    await gulp.watch(paths.scss.all, gulp.series(style, reload));
    await gulp.watch(paths.scss.all, gulp.series(style_dark, reload));
    await gulp.watch(paths.images.all, gulp.series(images, reload));
    await gulp.watch(paths.fonts.all, gulp.series(fonts, reload));
    await gulp.watch(paths.css.all, gulp.series(css, reload));
    await gulp.watch(paths.plugins.all, gulp.series(plugins, template_scripts, reload));
});

const dev = gulp.series(
   'deps',
    html,
    plugins,
    libs_scripts,
    template_scripts,
    bootstrap_scripts,
    images,
    fonts,
    css,
    style,
    style_dark,
   // 'default',
    serve,

    'watch',
    
    
    'nodemon'
);
console.log('---2020-')
console.log(dev)
exports.default = dev;

// Clean dist folder
gulp.task('clean', function (cb) {
    rimraf(paths.dist.folder + '/*', cb);
});
