/**
 *
 * Basic Grunt workflow for small front-end projects
 * repo: https://github.com/juanbrujo/simple-grunt-workflow
 * article: http://www.csslab.cl/2014/04/07/automatizacion-de-tareas-para-proyectos-en-front-end/
 * @csslab / ©2014
 *
 */

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    sprite: 'grunt-spritesmith'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowercopy: {
      libs: {
        options: {
          destPrefix: 'src/js/libs'
        },
        files: {
          'jquery.js': 'jquery/dist/jquery.js',
          'html5shiv.js': 'html5shiv/dist/html5shiv.js',
          'modernizr.js': 'modernizr/modernizr.js',
          'detectizr.js': 'detectizr/dist/detectizr.js',
          'selectivizr.js': 'selectivizr/selectivizr.js',
          'respond.js': 'respond/dest/respond.src.js'
        },
      },
      folders: {
        options: {
          destPrefix: 'dist/assets/css/pie'
        },
        files: {
          'PIE.js': 'css3pie/PIE.js',
          'PIE.htc': 'css3pie/PIE.htc',
          'PIE.php': 'css3pie/PIE.php'
        }
      },
      css: {
        options: {
          destPrefix: 'src/less/inc'
        },
        files: {
          'yui3-cssreset.less': 'yui3/build/cssreset/cssreset.css'
        }
      }
    },
    concat: {
      basic_and_extras: {
        files: {
          'dist/assets/js/libs/modernizr-detectizr.js': ['dist/assets/js/libs/modernizr.js','dist/assets/js/libs/detectizr.js']
        },
      },
    },
    uglify: {
      options: {
        mangle: true
      },
      libs: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: '**/*.js',
          dest: 'dist/assets/js'
        }]
      }
    },
    jshint: {
      files: ["src/js/functions.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: "src/images/",
            src: ["*.{png,jpg,gif,svg}"],
            dest: "dist/assets/images/"
        }]
      }
    },
    sprite:{
      all: {
        src: 'src/images/sprites/*.png',
        dest: 'src/images/sprites.png',
        destCss: 'src/less/inc/sprites.less',
        algorithm: 'binary-tree',
        padding: 2
      }
    },
    less: {
      dist: {
        options: {
            compress: true
        },
        files: {
            'dist/assets/css/style.min.css': 'src/less/style.less'
        }
      } 
    },
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['newer:uglify'],
        options: {
            spawn: false
        }
      },
      css: {
        files: ['src/less/*.less'],
        tasks: ['newer:less'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['dist/*.html'],
        options: {
            livereload: true
        }
      },
      sprites: {
        files: ['src/images/sprites/*.*'],
        tasks: ['sprite']
      },
      another: {
        files: ['src/images/*.*'],
        tasks: ['newer:imagemin'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask("init",    ["bowercopy","concat"]);
  grunt.registerTask("default", ["newer:uglify","sprite","newer:less","newer:imagemin","watch"]);
  grunt.registerTask("testjs",  ["jshint"]);

};