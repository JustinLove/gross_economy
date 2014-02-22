define(['gross_economy/resource'], function(extendResource) {
  "use strict";

  var metal = {
    resource: 'metal',
    current: model.currentMetal,
    max: model.maxMetal,
    currentGain: model.metalGain,
    currentLoss: model.metalLoss,
    net: model.metalNet,
    netString: ko.computed(function() {
      return ((model.metalNet() > 0) ? '+' : '') + Math.round(model.metalNet()/10)
    }),
    fractionString: model.metalFractionString,
    min: 20,
    tick: 10,
  }

  var energy = {
    resource: 'energy',
    current: model.currentEnergy,
    max: model.maxEnergy,
    currentGain: model.energyGain,
    currentLoss: model.energyLoss,
    net: model.energyNet,
    netString: ko.computed(function() {
      return ((model.energyNet() > 0) ? '+' : '') + Math.round(model.energyNet()/1000)
    }),
    fractionString: model.energyFractionString,
    min: 4000,
    tick: 1000,
  }

  extendResource(metal)
  extendResource(energy)

  var limit = metal.limit = energy.limit = ko.computed(function() {
    if (metal.ratio() < 1) {
      return 'metal'
    } else if (energy.ratio() < 1) {
      return 'energy'
    } else {
      return 'none'
    }
  })

  var loadTemplate = function ($after, html, model) {
    var $parent = $after.parent()
    $parent.find('.div_status_bar_midpsan').remove()
    $parent.addClass(model.resource)
    $(html).insertAfter($after)
    ko.applyBindings(model, $parent[0]);
  };

  return {
    load: function() {
      $.get('coui://ui/mods/gross_economy/status_bar_resource.html', function(html) {
        console.log("Gross Economy loaded HTML, modifing status bar");
        loadTemplate($('.div_status_bar .left_angle'), html, metal);
        loadTemplate($('.div_status_bar .right_flat'), html, energy);
      })
    },
    metal: metal,
    energy: energy
  }
})
