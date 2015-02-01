define([
  'gross_economy/resource',
  'gross_economy/judgement',
  'text!gross_economy/status_bar_resource.html'
], function(
  extendResource,
  judgement,
  html
) {
  "use strict";

  var metal = {
    resource: 'metal',
    current: model.currentMetal,
    currentString: model.currentMetalString,
    max: model.maxMetal,
    currentGain: model.metalGain,
    currentGainString: model.metalGainString,
    currentLoss: model.metalLoss,
    currentLossString: model.metalLossString,
    net: model.metalNet,
    netStringStock: model.metalNetString,
    netStringBfs: ko.computed(function() {
      return ((model.metalNet() > 0) ? '+' : '') + Math.round(model.metalNet()/10)
    }),
    efficiencyString: model.metalEfficiencyPercString,
    fractionString: ko.computed(function () {
      return '' + (100 * model.metalFraction()).toFixed(0) + '%';
    }),
    shared: model.metalShared,
    min: 20,
    tick: 10,
    judgement: judgement.metal,
  }

  var energy = {
    resource: 'energy',
    current: model.currentEnergy,
    currentString: model.currentEnergyString,
    max: model.maxEnergy,
    currentGain: model.energyGain,
    currentGainString: model.energyGainString,
    currentLoss: model.energyLoss,
    currentLossString: model.energyLossString,
    net: model.energyNet,
    netStringStock: model.energyNetString,
    netStringBfs: ko.computed(function() {
      return ((model.energyNet() > 0) ? '+' : '') + Math.round(model.energyNet()/800)
    }),
    efficiencyString: model.energyEfficiencyPercString,
    fractionString: ko.computed(function () {
      return '' + (100 * model.energyFraction()).toFixed(0) + '%';
    }),
    shared: model.energyShared,
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

  var effColorCalculated = ko.computed(function() {
    if (energy.ratio() < metal.ratio()) {
      return energy.coloration()
    } else {
      return metal.coloration()
    }
  })

  var effColoration = ko.observable()

  effColorCalculated.subscribe(effColoration)

  var $eff

  effColoration.subscribe(function(value) {
    if ($eff) {
      $eff.attr('class', "gross-economy-eff " + value)
    }
  })

  var theme = function() {
    switch (api.settings.isSet('ui', 'gross_economy_theme', true)) {
      default:
      case 'INVERSE':
        return 'ge-color-inverse'
      case 'CLASSIC BLACK':
        return 'ge-color-black'
    }
  }

  var installTemplate = function ($parent, html, model) {
    $parent.parent().attr('class', model.resource + ' receiveMouse')
    $parent.html(html)
    model.$parent = $parent
    ko.applyBindings(model, $parent[0]);
  };

  return {
    ready: function() {
      console.log("Gross Economy ready, modifing status bar");
      installTemplate($('.div-metal .contents'), html, metal);
      installTemplate($('.div-energy .contents'), html, energy);
      $eff = $('.div-eff').attr('class', 'gross-economy-eff')
      $('.div-econ-bar').attr('class', 'gross-economy-bar ignoreMouse ' + theme())

      //require(['gross_economy/fake_economy'], function(fake) {
        //setTimeout(function() { fake.update() }, 1000)
      //})
    },
    metal: metal,
    energy: energy
  }
})
