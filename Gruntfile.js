/**
**
** Basic Grunt workflow for small front-end projects
** repo: https://github.com/juanbrujo/simple-grunt-workflow
** article: http://www.csslab.cl/2014/04/07/automatizacion-de-tareas-para-proyectos-en-front-end/
** @csslab / ©2014
**
**/
module.exports = function(grunt) {
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
          'selectivizr.js': 'selectivizr/selectivizr.js'
        },
      },
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
    image: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'src/images/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'dist/assets/images/'
        }]
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
    'ftp-deploy': {
      build: {
        auth: {
          host: 'myservername.domain',
          port: 21,
          authKey: 'key'
        },
        src: '/Applications/MAMP/htdocs/simple-grunt-workflow/',
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
      html: {
        files: ['dist/*.html'],
        options: {
            livereload: true
        }
      },
      another: {
        files: ['src/images/*.*'],
        tasks: ['newer:image'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-newer');
  grunt.registerTask('default', ['bowercopy','concat','newer:uglify','newer:less','newer:image','watch']);
  grunt.registerTask("testjs", ["jshint"]);
};