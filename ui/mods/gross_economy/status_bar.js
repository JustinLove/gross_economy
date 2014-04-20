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
      $eff.attr('class', "div_status_bar_cont " + value)
    }
  })

  var theme = function() {
    switch (settings.gross_economy_theme) {
      default:
      case 'INVERSE':
        return 'div_status_bar_inverse'
      case 'CLASSIC BLACK':
        return 'div_status_bar_black'
    }
  }
  

  var installTemplate = function ($parent, html, model) {
    $parent.addClass(model.resource)
    $parent.html(html)
    model.$parent = $parent.parents('.div_status_bar_cont')
    ko.applyBindings(model, $parent[0]);
  };

  return {
    ready: function() {
      console.log("Gross Economy ready, modifing status bar");
      $('.div_status_bar_left, .div_status_bar_right').attr('style', '')
      installTemplate($('.div_status_bar_left tr'), html, metal);
      installTemplate($('.div_status_bar_right tr'), html, energy);
      $eff = $('.div_status_bar_mid .div_status_bar_cont')
      $('.div_status_bar').addClass(theme)
    },
    metal: metal,
    energy: energy
  }
})
