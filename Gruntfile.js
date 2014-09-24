/**
 *
 * Basic Grunt workflow for small front-end projects
 * repo: https://github.com/juanbrujo/simple-grunt-workflow
 * article: http://www.csslab.cl/2014/04/07/automatizacion-de-tareas-para-proyectos-en-front-end/
 * @csslab / ©2014
 *
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    liquid: {
      options: {
        includes: 'src/liquid/includes',
        // CUSTOM VARIABLES
        assetsJS: 'assets/js',
        assetsCSS: 'assets/css',
        assetsIMG: 'assets/images',
        siteName: "Site Title",
        siteDescription: "Site Description, for SEO purposes.",
        navMain: [
          {
            titulo: "Index",
            url: "index.html",
          },
          {
            titulo: "First Page",
            url: "first-page.html",
          }
        ]
        // END CUSTOM VARIABLES
      },
      pages: {
        files: [{ 
          expand: true, 
          flatten: true, 
          src: 'src/liquid/*.liquid', 
          dest: 'dist/', 
          ext: '.html' 
        }]
      },
    },
    concat: {
      dist: {
        src: ["dist/assets/js/libs/*.js"],
        dest: "dist/assets/js/libs.js"
      }
    },
    uglify: {
      options: {
        beautify: true
      },
      my_target: {
        files: {
          'dist/assets/js/functions.min.js': ['src/js/functions.js'],
          'dist/assets/js/functions-index.min.js': ['src/js/functions-index.js'],
        }
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
            cwd: 'src/images/',
            src: ['*.{png,jpg,gif}'],
            dest: 'dist/assets/images/'
        }]
      }
    },
    less: {
      dist: {
        options: {
            compress: false
        },
        files: {
            'dist/assets/css/style.min.css': 'src/less/style.less'
        }
      } 
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'myservername.domain',
          port: 21,
          authKey: 'key'
        },
        src: '/Applications/MAMP/htdocs/simple-grunt-workflow/dist/',
        dest: '/public_html/simple-grunt-workflow/',
        exclusions: [
          '/Applications/MAMP/htdocs/simple-grunt-workflow/**/.*',
          '/Applications/MAMP/htdocs/simple-grunt-workflow/**/.*/', 
          '/Applications/MAMP/htdocs/simple-grunt-workflow/**/Thumbs.db',
          '/Applications/MAMP/htdocs/simple-grunt-workflow/**/ftppass',
          '/Applications/MAMP/htdocs/simple-grunt-workflow/node_modules',
          '/Applications/MAMP/htdocs/simple-grunt-workflow/*.json',
          '/Applications/MAMP/htdocs/simple-grunt-workflow/Gruntfile.js',
          '/Applications/MAMP/htdocs/simple-grunt-workflow/src'
        ]
      }
    },
    open : {
        dev : {
          path: 'http://localhost/simple-grunt-workflow/dist/',
          app: 'Google Chrome'
        }
    },
    watch: {
      options: {
        livereload: true
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
      liquid: {
        files: ['src/liquid/*.liquid'],
        tasks: ['newer:liquid'],
        options: {
            livereload: true
        }
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
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-liquid');

  grunt.registerTask('default', ['newer:liquid','newer:uglify','newer:less','newer:imagemin','watch']);
  grunt.registerTask("testjs", ["jshint"]);
};