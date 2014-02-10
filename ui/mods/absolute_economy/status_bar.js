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
      min: 20,
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
      min: 4000,
    }

    var extendResource = function(resource) {
      var highestSeen = 0;
      var gainHistory = [];
      var lossHistory = [];
      resource.highest = ko.computed(function() {
        highestSeen = Math.max(resource.gain(), resource.loss(), highestSeen)
        return highestSeen
      })
      resource.scale = ko.computed(function() {
        return Math.max(resource.min, resource.highest())
      })

      resource.gainHistory = ko.computed(function() {
        gainHistory.unshift('' + (100 * resource.gain() / resource.scale()) + '%')
        gainHistory.splice(10,10)
        return gainHistory
      })
      resource.gainPercent = ko.computed(function() {
        return resource.gainHistory()[0]
      })
      resource.lossHistory = ko.computed(function() {
        lossHistory.unshift('' + (100 * resource.loss() / resource.scale()) + '%')
        lossHistory.splice(10,10)
        return lossHistory
      })
      resource.lossPercent = ko.computed(function() {
        return resource.lossHistory()[0]
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
