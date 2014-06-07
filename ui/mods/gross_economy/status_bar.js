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
    netStringStock: model.metalNetString,
    netStringBfs: ko.computed(function() {
      return ((model.metalNet() > 0) ? '+' : '') + Math.round(model.metalNet()/10)
    }),
    fractionString: ko.computed(function () {
      return '' + (100 * model.metalFraction()).toFixed(0) + '%';
    }),
    shared: model.metalShared,
    sharedArray: model.sharedMetalArray,
    sharedTooltip: model.sharedMetalTooltip,
    showSharedResources: model.showSharedResources,
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
    netStringStock: model.energyNetString,
    netStringBfs: ko.computed(function() {
      return ((model.energyNet() > 0) ? '+' : '') + Math.round(model.energyNet()/1000)
    }),
    fractionString: ko.computed(function () {
      return '' + (100 * model.energyFraction()).toFixed(0) + '%';
    }),
    shared: model.energyShared,
    sharedArray: model.sharedEnergyArray,
    sharedTooltip: model.sharedEnergyTooltip,
    showSharedResources: model.showSharedResources,
    min: 2000,
    tick: 1000,
    judgement: judgement.energy,
  }

  var settings = decode(localStorage.settings)
  console.log(settings)

  extendResource(metal, settings)
  extendResource(energy, settings)

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
    switch (settings.gross_economy_theme) {
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
    },
    metal: metal,
    energy: energy
  }
})
