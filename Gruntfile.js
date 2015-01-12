module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      compile: {
        files: [{
          expand: true,
          cwd: "src/less",
          src: ["*.less"],
          dest: "build/css",
          ext: ".css"
        }]
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },

    concat: {
      dist: {
        src: 'src/**/*.js',
        dest: 'build/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/js/<%= pkg.name %>.js',
        dest: 'build/js/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      options: {
        interrupt: true
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['compile:js'],
      },
      less: {
        files: ['src/less/**/*.less'],
        tasks: ['compile:less']
      }
    }
  });

  // Load Gunt plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define Grunt tasks
  grunt.registerTask('default', ['compile']);
  grunt.registerTask('compile', ['compile:js', 'compile:less']);
  grunt.registerTask('compile:js', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('compile:less', ['less']);

};

