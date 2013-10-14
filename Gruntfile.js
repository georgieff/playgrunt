  module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      uglify: {
        options: {
          banner: '/*! <%= pkg.jsFile %> <%= grunt.template.today("yyyy-mm-dd HH:ss") %> */\n',
          report: 'min'
        },
        makeatry: {
          files: [{
          expand: true,                         // Enable dynamic expansion.
          cwd: '<%= pkg.projectPath %>/src/',   // Src matches are relative to this path.
          src: ['/*.js'],                       // Actual pattern(s) to match.
          dest: '<%= pkg.projectPath %>/build/',// Destination path prefix.
          ext: '.min.js',                       // Dest filepaths will have this extension.
        },],
      }
    },

    jshint: {
      all: {
        src: ['<%= pkg.projectPath %>/src/*.js'],
      },
    },

    csslint: {
      options: {
        csslintrc: '.config/.csslintrc'
      },
      strict: {
        options: {
          import: 2
        },
        src: ['<%= pkg.projectPath %>/src/*.css']
      }
    },

    connect: {
      server: {
        options: {
          keepalive: true,
          livereload: true,
          port: 9001,
          base: 'www'
        }
      }
    },

    concurrent: {
        jobs: ['uglify' ,'connect'],
        options: {
          logConcurrentOutput: true
        }
    },

    watch: {
      options: {
        //atBegin: true,
      },
      scripts: {
        tasks: ['jshint', 'uglify'],
        files: ['<%= pkg.projectPath %>/src/**/*.js'],
      },
      page: {
        tasks: [''],
        files: ['www/*.*']
      }
    }

  });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');

    // Default task(s).
    grunt.registerTask('default', ['concurrent']);

    grunt.registerTask('server', ['connect']);
    grunt.registerTask('watch', ['watch']);

    grunt.event.on('watch', function(action, filepath, target) {
      if (target == 'page') {
        grunt.log.writeln('Well, ' + target + ': ' + filepath + ' has ' + action);
      };
    });

  };
