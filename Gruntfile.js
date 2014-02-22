module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    requirejs: {
      target: {
        options: {
          baseUrl: 'ui/mods',
          mainConfigFile: 'ui/mods/gross_economy/bootstrap.js',
          skipDirOptimize: true,
          optimize: 'none',
          stubModules: ['text'],

          //name: 'lib/ext/almond',
          include: 'gross_economy/bootstrap',
          out: 'dist/ui/mods/gross_economy/status_bar.js',
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['requirejs']);

};
