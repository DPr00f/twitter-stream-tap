module.exports = function(grunt) {
    grunt.initConfig({
    babel: {
      options: {
        sourceMap: false,
        compact: false
      },
      server: {
        files: [{
          expand: true,
          cwd: './',
          src: ['index.js', 'app/**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      },
      public: {
        files: [{
          expand: true,
          cwd: './public',
          src: ['**/*.js', '!**/libs/**/*.js'],
          dest: 'publicTmp',
          ext: '.js'
        }]
      },
      tests: {
        files: [{
          expand: true,
          cwd: './test',
          src: ['**/*.js'],
          dest: 'specTmp',
          ext: '.js'
        }]
      }
    },

    browserify : {
      frontend: {
        files: {
          'dist/public/js/main.js': 'publicTmp/js/index.js'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['index.js', 'app/**/*.js', 'public/**/*.js', '!public/js/libs/**/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false
        },
        src: ['specTmp/**/*.js']
      }
    },

    clean: {
      tests: ['./specTmp'],
      public: ['./publicTmp'],
      production: ['./dist/public/css/main.css', './dist/public/js/main.js'],
      dist: ['./dist']
    },

    'string-replace': {
      production: {
        files: {
          'dist/app/views/layout.ejs': 'dist/app/views/layout.ejs'
        },
        options: {
          replacements: [{
            pattern: /\/main\./g,
            replacement: '/main.min.'
          }]
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['test', 'buildJS', 'express:server'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['**/*.scss'],
        tasks: ['buildCSS'],
        options: {
          spawn: false
        }
      },
      views: {
        files: ['**/*.ejs'],
        tasks: ['buildViews'],
        options: {
          spawn: false
        }
      }
    },

    express: {
      server: {
        options: {
          script: './dist/index.js'
        }
      }
    },

    copy: {
      config: {
        files: [{
          expand: true,
          src: ['config.json', 'config.private.json'],
          dest: 'dist',
          filter: 'isFile'
        }]
      },
      views: {
        files: [{
          expand: true,
          src: ['app/views/**/*.ejs'],
          dest: 'dist',
          filter: 'isFile'
        }]
      },
      libs: {
        files: [{
          expand: true,
          cwd: 'public',
          src: ['js/libs/**/*.js'],
          dest: 'publicTmp',
          filter: 'isFile'
        }]
      }
    },

    sass: {
      main: {
        files: {
          'dist/public/css/main.css': 'public/sass/main.scss'
        }
      }
    },

    uglify: {
      scripts: {
        files: {
          'dist/public/js/main.min.js': 'dist/public/js/main.js'
        }
      }
    },

    cssmin: {
      styles: {
        files: {
          'dist/public/css/main.min.css': 'dist/public/css/main.css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('test', ['jshint', 'babel:tests', 'mochaTest', 'clean:tests']);
  grunt.registerTask('buildViews', ['copy:views']);
  grunt.registerTask('buildJS', ['copy:config', 'babel:server','babel:public', 'copy:libs', 'browserify', 'clean:public']);
  grunt.registerTask('buildCSS', ['sass:main']);
  grunt.registerTask('build', ['buildViews', 'buildCSS', 'buildJS']);
  grunt.registerTask('serve', ['default', 'express:server']);

  grunt.registerTask('dev', ['serve', 'watch']);
  grunt.registerTask('default', ['test', 'build']);

  grunt.registerTask('production', ['clean:dist', 'default', 'string-replace:production', 'uglify:scripts', 'cssmin:styles', 'clean:production'])
}