module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.jsFile %> <%= grunt.template.today("yyyy-mm-dd HH:ss") %> */\n',
        report: 'min'
      },
      build: {
        src: '<%= pkg.projectPath %>/src/<%= pkg.jsFile %>.js',
        dest: '<%= pkg.projectPath %>/build/<%= pkg.jsFile %>.min.js'
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
       files: ['<%= pkg.projectPath %>/src/*.js'],
     },
   }

});

  // Load the plugin that provides the "uglify" task.
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