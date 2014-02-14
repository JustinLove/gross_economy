(function() {
    var metal = {
      resource: 'metal',
      current: model.currentMetal,
      max: model.maxMetal,
      currentGain: model.metalGain,
      currentLoss: model.metalLoss,
      net: model.metalNet,
      netString: model.metalNetString,
      fractionString: model.metalFractionString,
      min: 20,
    }

    var energy = {
      resource: 'energy',
      current: model.currentEnergy,
      max: model.maxEnergy,
      currentGain: model.energyGain,
      currentLoss: model.energyLoss,
      net: model.energyNet,
      netString: model.energyNetString,
      fractionString: model.energyFractionString,
      min: 4000,
    }

    var series = function(value, scale) {
      var history = []

      var s = {
        scale: scale,
        value: value,
        percent: ko.computed(function() {
          return '' + (100 * value() / scale()) + '%';
        }),
        max: ko.observable(0),
        min: ko.observable(1000000000)
      }

      value.subscribe(function(v) {
        history.unshift(v)
        history.splice(10,10)

        s.max(Math.max.apply(Math, history))
        s.min(Math.min.apply(Math, history))
      })

      s.rangeStart = ko.computed(function() {
        return '' + (100 * s.min() / scale()) + '%'
      })
      s.rangeEnd = ko.computed(function() {
        return '' + (100 * (s.max() - s.min()) / scale()) + '%'
      })

      return s
    }

    var extendResource = function(resource) {
      var highestSeen = 0;
      var gainHistory = [];
      var lossHistory = [];
      resource.highest = ko.computed(function() {
        highestSeen = Math.max(resource.currentGain(), resource.currentLoss(), highestSeen)
        return highestSeen
      })
      resource.scale = ko.computed(function() {
        return Math.max(resource.min, resource.highest())
      })

      resource.gain = series(resource.currentGain, resource.scale)
      resource.loss = series(resource.currentLoss, resource.scale)
    }

    extendResource(metal)
    extendResource(energy)

    var loadTemplate = function ($after, html, model) {
      var $parent = $after.parent()
      $parent.find('.div_status_bar_midpsan').remove()
      $parent.addClass(model.resource)
      $(html).insertAfter($after)
      ko.applyBindings(model, $parent[0]);
    };

    $.get('coui://ui/mods/gross_economy/status_bar_resource.html', function(html) {
      console.log("Loading html ");
      loadTemplate($('.div_status_bar_cont .left_angle'), html, metal);
      loadTemplate($('.div_status_bar_cont .right_flat'), html, energy);
    });

})()
