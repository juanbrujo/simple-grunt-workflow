/**
 *
 * Basic Grunt workflow for small front-end projects
 * branch to fit I2B projects
 *
 * repo: https://github.com/juanbrujo/simple-grunt-workflow/tree/i2b
 * article: http://www.csslab.cl/2014/04/07/automatizacion-de-tareas-para-proyectos-en-front-end/
 * @csslab / ©2014
 *
*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowercopy: {
      libs: {
        options: {
          destPrefix: 'src/js/libs'
        },
        files: {
          'jquery.js': 'jquery/jquery.min.js',
          'html5shiv.js': 'html5shiv/dist/html5shiv.js',
          'modernizr.js': 'modernizr/modernizr.js',
          'detectizr.js': 'detectizr/dist/detectizr.js',
          'selectivizr.js': 'selectivizr/selectivizr.js',
          'respond.js': 'respond/dest/respond.min.js',
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
            src: ['*.{png,jpg,gif,svg}'],
            dest: 'dist/assets/images/'
        }]
      }
    },
    sprite:{
      all: {
        src: 'src/images/sprites/*.png',
        destImg: 'src/images/sprites.png',
        destCSS: 'src/stylus/inc/sprites.styl',
        algorithm: 'binary-tree',
        padding: 2
      }
    },
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [{
          cwd: "src/jade",
          src: "*.jade",
          dest: "dist",
          expand: true,
          ext: ".html"
        }]
      }
    },
    stylus: {
      build: {
        options: {
          linenos: true,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'src/stylus',
          src: [ '*.styl' ],
          dest: 'dist/assets/css',
          ext: '.css'
        }]
      }
    },
    coffee: {
      build: {
        expand: true,
        cwd: 'src/js',
        src: [ '*.coffee' ],
        dest: 'dist/assets/js',
        ext: '.js'
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
      jade: {
        files: 'src/jade/*.jade',
        tasks: ['newer:jade']
      },
      coffee: {
        files: 'src/js/*.coffee',
        tasks: ['newer:coffee']
      },
      css: {
        files: ['src/stylus/*.styl'],
        tasks: ['newer:stylus'],
        options: {
          spawn: false
        }
      },
      sprites: {
        files: ['src/images/sprites/*.*'],
        tasks: ['sprite']
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
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.registerTask('default', ['bowercopy','concat','newer:uglify','sprite','newer:jade','newer:image','newer:coffee','watch']);
  grunt.registerTask("testjs", ["jshint"]);
};