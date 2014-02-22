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
          name: 'gross_economy/main',
          out: '../gross_economy_test/ui/mods/gross_economy/bootstrap.js',

          skipModuleInsertion: true,
          onBuildWrite: function( name, path, contents ) {
            return require('amdclean').clean({
              code: contents,
              globalObject: true,
              globalObjectName: 'gross_economy',
            });
          },
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
            dest: '../gross_economy_test/',
          },
        ],
      },
      modinfo: {
        files: [
          {
            src: 'modinfo.dev.json',
            dest: '../gross_economy_test/modinfo.json',
          },
        ],
        options: {
          process: function(content, srcpath) {
            content = content.replace('Gross Economy Dev', 'Gross Economy Test')
            content = content.replace('gross_economy_dev', 'gross_economy_test')
            content = content.replace('    "coui://ui/mods/gross_economy/require.js",\n', '')
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
