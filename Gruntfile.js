module.exports = function(grunt) {

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: false
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
          'dist/public/main.js': 'public/index.js'
        },
        options: {
          transform: ['babelify']
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['index.js', 'app/**/*.js', 'public/**/*.js']
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
      tests: ['./specTmp']
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['default', 'express:server'],
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

  grunt.registerTask('test', ['jshint', 'babel:tests', 'mochaTest', 'clean:tests']);
  grunt.registerTask('build', ['copy:config', 'babel:server', 'browserify']);
  grunt.registerTask('default', ['test', 'build']);
  grunt.registerTask('serve', ['default', 'express:server']);
  grunt.registerTask('dev', ['serve', 'watch']);
}