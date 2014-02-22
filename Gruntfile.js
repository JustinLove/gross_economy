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
          out: 'dist/ui/mods/gross_economy/bootstrap.js',
        }
      }
    },
    copy: {
      simple: {
        files: [
          {
            src: [
              'LICENSE.txt',
              'README.md',
              'ui/mods/gross_economy/*.css'],
            dest: 'dist/',
          },
        ],
      },
      modinfo: {
        files: [
          {
            src: 'modinfo.pretty.json',
            dest: 'dist/modinfo.json',
          },
        ],
        options: {
          process: function(content, srcpath) {
            content = content.replace('Gross Economy', 'Gross Economy Test')
            content = content.replace('"gross_economy"', '"gross_economy_test"')
            content = content.replace('com.wondible.pa.gross_economy', 'com.wondible.pa.gross_economy_test')
            return content
          }
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['requirejs', 'copy']);

};
