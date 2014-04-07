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
    uglify: {
      build: {
        src: 'assets-dev/js/functions.js',
        dest: 'assets/js/functions.min.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'assets-dev/images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'assets/images/'
        }]
      }
    },
    less: {
      dist: {
        options: {
            compress: true
        },
        files: {
            'assets/css/style.min.css': 'assets-dev/less/style.less'
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
        src: '/Applications/MAMP/htdocs/proyecto-simple/',
        dest: '/public_html/proyecto-simple/',
        exclusions: [
          '/Applications/MAMP/htdocs/proyecto-simple/**/.*',
          '/Applications/MAMP/htdocs/proyecto-simple/**/.*/', 
          '/Applications/MAMP/htdocs/proyecto-simple/**/Thumbs.db',
          '/Applications/MAMP/htdocs/proyecto-simple/**/ftppass',
          '/Applications/MAMP/htdocs/proyecto-simple/node_modules',
          '/Applications/MAMP/htdocs/proyecto-simple/*.json',
          '/Applications/MAMP/htdocs/proyecto-simple/Gruntfile.js',
          '/Applications/MAMP/htdocs/proyecto-simple/assets-dev'
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['assets-dev/js/*.js'],
        tasks: ['uglify'],
        options: {
            spawn: false
        }
      },
      css: {
        files: ['assets-dev/less/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['*.html'],
        options: {
            livereload: true
        }
      },
      another: {
        files: ['assets-dev/images/*.*'],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.registerTask('default', ['uglify','less','imagemin','watch']);
};