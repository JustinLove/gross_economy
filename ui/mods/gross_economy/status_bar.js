(function() {
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

  var series = function(value, scale) {
    var valueHistory = []
    var timeHistory = []

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
      var t = Date.now()
      valueHistory.push(v)
      timeHistory.push(t)
      while (timeHistory.length > 0 && t - timeHistory[0] > 30000) {
        valueHistory.shift()
        timeHistory.shift()
      }

      s.max(Math.max.apply(Math, valueHistory))
      s.min(Math.min.apply(Math, valueHistory))
    })

    s.rangeStart = ko.computed(function() {
      return '' + (100 * s.min() / scale()) + '%'
    })
    s.rangeEnd = ko.computed(function() {
      return '' + (100 * (s.max() - s.min()) / scale()) + '%'
    })

    return s
  }

  var tickColor = function(weight) {
    var c = Math.min(15, Math.floor(16 * weight)).toString(16)
    return '#' + c + c + c
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
    resource.ticks = ko.computed(function() {
      var s = resource.scale()
      var axis = []
      var dx = resource.tick
      var w1 = Math.sqrt(dx/s)
      while (w1 < 0.15) {
        dx = dx * 5
        w1 = Math.sqrt(dx/s)
      }
      var w2 = Math.sqrt(5*dx/s)
      var w3 = Math.sqrt(25*dx/s)
      var c1 = tickColor(w1)
      var c2 = tickColor(w2)
      var c3 = tickColor(w3)
      for(var x = 0, i = 0;x < s;x += dx,i+=1) {
        if (i % 25 == 0) {
          axis.push({x: '' + (100 * x / s) + '%', color: c3})
        } else if (i % 5 == 0) {
          axis.push({x: '' + (100 * x / s) + '%', color: c2})
        } else {
          axis.push({x: '' + (100 * x / s) + '%', color: c1})
        }
      }
      return axis
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
    console.log("Gross Economy loaded HTML, modifing status bar");
    loadTemplate($('.div_status_bar_cont .left_angle'), html, metal);
    loadTemplate($('.div_status_bar_cont .right_flat'), html, energy);
  });
})()
