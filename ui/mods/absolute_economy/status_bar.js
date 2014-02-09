(function() {
    var loadTemplate = function ($element, url, model) {
        $element.load(url, function () {
            console.log("Loading html " + url);
            ko.applyBindings(model, $element[0]);
        });
    };

    var metal = {
      current: model.currentMetal,
      max: model.maxMetal,
      gain: model.metalGain,
      loss: model.metalLoss,
      delta: model.metalDelta,
      net: model.metalNet,
      netString: model.metalNetString,
      fractionString: model.metalFractionString,
      scale: ko.observable(200),
    }

    var energy = {
      current: model.currentEnergy,
      max: model.maxEnergy,
      gain: model.energyGain,
      loss: model.energyLoss,
      delta: model.energyDelta,
      net: model.energyNet,
      netString: model.energyNetString,
      fractionString: model.energyFractionString,
      scale: ko.observable(4000),
    }

    var extendResource = function(resource) {
      resource.gainPercent = ko.computed(function() {
        return '' + (100 * resource.gain() / resource.scale()) + '%'
      })
      resource.lossPercent = ko.computed(function() {
        return '' + (100 * resource.loss() / resource.scale()) + '%'
      })
    }

    extendResource(metal)
    extendResource(energy)

    var statusBarModel = {
      metal: metal,
      energy: energy,
      showResources: model.showResources
    }

    loadTemplate($('.div_status_bar_cont'), 'coui://ui/mods/absolute_economy/status_bar.html', statusBarModel);
})()
