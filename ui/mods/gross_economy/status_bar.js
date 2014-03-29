define([
  'gross_economy/resource',
  'gross_economy/judgement',
  'text!gross_economy/status_bar_resource.html'
],
function(extendResource, judgement, html) {
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
    judgement: judgement.metal,
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
    min: 2000,
    tick: 1000,
    judgement: judgement.energy,
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

  var installTemplate = function ($parent, html, model) {
    $parent.addClass(model.resource)
    $parent.html(html)
    model.$parent = $parent.parents('.div_status_bar_cont')
    ko.applyBindings(model, $parent[0]);
  };

  return {
    ready: function() {
      console.log("Gross Economy ready, modifing status bar");
      installTemplate($('.div_status_bar_left tr'), html, metal);
      installTemplate($('.div_status_bar_right tr'), html, energy);
    },
    metal: metal,
    energy: energy
  }
})
