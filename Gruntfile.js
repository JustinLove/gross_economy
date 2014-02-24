module.exports = function(grunt) {
  var target = grunt.option('target') || 'gross_economy_test'
  var title = 'Gross Economy Test'
  if (target == 'gross_economy') {
    title = 'Gross Economy'
  }

  // Project configuration.
  grunt.initConfig({
    target: target,
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
          out: '../<%= target %>/ui/mods/gross_economy/bootstrap.js',

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
              'CHANGELOG.md',
              'ui/mods/gross_economy/*.css'],
            dest: '../<%= target %>/',
          },
        ],
      },
      modinfo: {
        files: [
          {
            src: 'modinfo.dev.json',
            dest: '../<%= target %>/modinfo.json',
          },
        ],
        options: {
          process: function(content, srcpath) {
            content = content.replace('2014/02/21', require('dateformat')(new Date(), 'yyyy/mm/dd'))
            content = content.replace('Gross Economy Dev', title)
            content = content.replace('gross_economy_dev', target)
            content = content.replace('    "coui://ui/mods/gross_economy/require.js",\n', '')
            return content
          }
        }
      },
      dev: {
        files: [
          {
            src: 'modinfo.dev.json',
            dest: 'modinfo.json',
          },
        ]
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['requirejs', 'copy:simple', 'copy:modinfo']);

};
