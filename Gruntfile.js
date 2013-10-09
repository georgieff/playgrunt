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
          files: [
          {
          expand: true,                         // Enable dynamic expansion.
          cwd: '<%= pkg.projectPath %>/src/',   // Src matches are relative to this path.
          src: ['/*.js'],                       // Actual pattern(s) to match.
          dest: '<%= pkg.projectPath %>/build/',// Destination path prefix.
          ext: '.min.js',                       // Dest filepaths will have this extension.
        },
        ],
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

    watch: {
      options: {
        atBegin: true,
      },
      scripts: {
       tasks: ['jshint', 'uglify'],
       files: ['<%= pkg.projectPath %>/src/**/*.js'],
     },
   }

 });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

    grunt.event.on('watch', function(action, filepath, target) {
      //grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

  };
