(function() {
  var gross_economy_settings = {
    gross_economy_resource_net: {
      title: 'Resource Net',
      type: 'select',
      options: ['BASIC FABBER SECONDS', 'EFFICIENCY', 'SIMPLE'],
      default: 'BASIC FABBER SECONDS'
    },
    gross_economy_resource_storage: {
      title: 'Resource Storage',
      type: 'select',
      options: ['BASIC FABBER SECONDS', 'PERCENT', 'SIMPLE'],
      default: 'SIMPLE'
    },
    gross_economy_theme: {
      title: 'Theme',
      type: 'select',
      options: ['INVERSE', 'CLASSIC BLACK'],
      default: 'INVERSE'
    }
  }

  _.extend(api.settings.definitions.ui.settings, gross_economy_settings)

  // force model.settingsLists to update
  model.settingDefinitions(api.settings.definitions)

  var $group = $('<div class="sub-group"></div>').appendTo('.option-list.ui .form-group')
  $group.append('<div class="sub-group-title">Gross Economy</div>')

  Object.keys(gross_economy_settings).forEach(function(setting) {
    $group.append('<div class="option" data-bind="template: { name: \'setting-template\', data: $root.settingsItemMap()[\'ui.' + setting + '\'] }"></div>')
  })
})()
