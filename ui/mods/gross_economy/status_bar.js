define([
  'gross_economy/resource',
  'text!gross_economy/status_bar_resource.html'
],
function(extendResource, html) {
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

  var installTemplate = function ($after, html, model) {
    var $parent = $after.parent()
    $parent.find('.div_status_bar_midpsan').remove()
    $parent.addClass(model.resource)
    $(html).insertAfter($after)
    ko.applyBindings(model, $parent[0]);
  };

  return {
    ready: function() {
      console.log("Gross Economy ready, modifing status bar");
      installTemplate($('.div_status_bar .left_angle'), html, metal);
      installTemplate($('.div_status_bar .right_flat'), html, energy);
    },
    metal: metal,
    energy: energy
  }
})
