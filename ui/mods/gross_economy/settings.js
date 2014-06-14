(function() {
  _.extend(api.settings.definitions.ui.settings, {
    gross_economy_resource_net: {
      title: 'Gross Economy - Resource Net',
      type: 'select',
      options: ['BASIC FABBER SECONDS', 'EFFICIENCY', 'SIMPLE'],
      default: 'BASIC FABBER SECONDS'
    },
    gross_economy_resource_storage: {
      title: 'Gross Economy - Resource Storage',
      type: 'select',
      options: ['BASIC FABBER SECONDS', 'PERCENT', 'SIMPLE'],
      default: 'SIMPLE'
    },
    gross_economy_theme: {
      title: 'Gross Economy - Theme',
      type: 'select',
      options: ['INVERSE', 'CLASSIC BLACK'],
      default: 'INVERSE'
    }
  })
})()
