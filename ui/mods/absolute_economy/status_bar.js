(function() {
    var loadTemplate = function ($element, url, model) {
        $element.load(url, function () {
            console.log("Loading html " + url);
            ko.applyBindings(model, $element[0]);
        });
    };

    var statusBarModel = {
      currentMetal: model.currentMetal,
      currentEnergy: model.currentEnergy,
      maxMetal: model.maxMetal,
      maxEnergy: model.maxEnergy,
      metalGain: model.metalGain,
      energyGain: model.energyGain,
      metalLoss: model.metalLoss,
      energyLoss: model.energyLoss,
      metalDelta: model.metalDelta,
      energyDelta: model.energyDelta,
      metalNet: model.metalNet,
      energyNet: model.energyNet,
      metalNetString: model.metalNetString,
      energyNetString: model.energyNetString,
      metalFractionString: model.metalFractionString,
      energyFractionString: model.energyFractionString,
      metalScale: ko.observable(200),
      energyScale: ko.observable(4000),
      showResources: model.showResources,
    }
    statusBarModel.metalGainPercent = ko.computed(function() {
      return '' + (100 * statusBarModel.metalGain() / statusBarModel.metalScale()) + '%'
    })
    statusBarModel.metalLossPercent = ko.computed(function() {
      return '' + (100 * statusBarModel.metalLoss() / statusBarModel.metalScale()) + '%'
    })

    loadTemplate($('.div_status_bar_cont'), 'coui://ui/mods/absolute_economy/status_bar.html', statusBarModel);
})()
