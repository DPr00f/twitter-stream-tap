module.exports = function(grunt) {
  var paths = {
    app: './src/app/',
    src: './src/',
    public: './src/public/',
    test: './src/test/',
    dist: './dist/',
    tmp: {
      public: './src/publicTmp/',
      test: './src/testTmp/'
    }
  };

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: false,
        compact: false
      },
      server: {
        files: [{
          expand: true,
          cwd: paths.src,
          src: ['index.js', 'app/**/*.js'],
          dest: paths.dist,
          ext: '.js'
        }]
      },
      public: {
        files: [{
          expand: true,
          cwd: paths.public,
          src: ['**/*.js', '!**/libs/**/*.js'],
          dest: paths.tmp.public,
          ext: '.js'
        }]
      },
      tests: {
        files: [{
          expand: true,
          cwd: paths.test,
          src: ['**/*.js'],
          dest: paths.tmp.test,
          ext: '.js'
        }]
      }
    },

    browserify : {
      frontend: {
        files: {
          'dist/public/js/main.js': paths.tmp.public + 'js/index.js'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [paths.src + 'index.js', paths.app + '**/*.js', paths.public + '**/*.js', '!' + paths.public + 'js/libs/**/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false
        },
        src: [paths.tmp.test + '**/*.js']
      }
    },

    clean: {
      tests: [paths.tmp.test],
      public: [paths.tmp.public],
      production: [paths.dist + 'public/css/main.css', paths.dist + 'public/js/main.js'],
      dist: [paths.dist]
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
        files: [paths.src + '**/*.js'],
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
          script: paths.dist + 'index.js'
        }
      }
    },

    copy: {
      config: {
        files: [{
          expand: true,
          cwd: paths.src,
          src: ['config.json', 'config.private.json'],
          dest: paths.dist,
          filter: 'isFile'
        }]
      },
      views: {
        files: [{
          expand: true,
          cwd: paths.src,
          src: ['app/views/**/*.ejs'],
          dest: paths.dist,
          filter: 'isFile'
        }]
      },
      libs: {
        files: [{
          expand: true,
          cwd: paths.public,
          src: ['js/libs/**/*.js'],
          dest: paths.tmp.public,
          filter: 'isFile'
        }]
      }
    },

    sass: {
      main: {
        files: {
          'dist/public/css/main.css': paths.public + 'sass/main.scss'
        }
      }
    },

    uglify: {
      scripts: {
        files: {
          'dist/public/js/main.min.js': paths.dist + 'public/js/main.js'
        }
      }
    },

    cssmin: {
      styles: {
        files: {
          'dist/public/css/main.min.css': paths.dist + 'public/css/main.css'
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

  grunt.registerTask('production', ['clean:dist', 'default', 'string-replace:production', 'uglify:scripts', 'cssmin:styles', 'clean:production']);
};
