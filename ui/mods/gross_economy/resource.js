define(['gross_economy/series'], function(series) {
  var tickColor = function(weight) {
    var c = Math.min(15, Math.floor(16 * weight)).toString(16)
    return '#' + c + c + c
  }

  return function(resource) {
    var gainHistory = [];
    var lossHistory = [];
    resource.currentBfs = ko.computed(function() {
      return Math.round(resource.current() / resource.tick)
    })
    resource.scale = ko.computed(function() {
      return Math.max(resource.min, resource.currentGain() * 2, resource.currentLoss())
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
    resource.ratio = ko.computed(function() {
      if (resource.current() > 1) {
        return 1
      }
      var denom = resource.currentLoss()
      if (denom < 1) {denom = 1}
      return resource.currentGain() / denom
    })
    resource.toStorage = ko.computed(function() {
      var net = Math.max(0, resource.currentGain() - resource.currentLoss())
      net = Math.min(net, resource.max() - resource.current())
      return '' + (100 * net / resource.scale()) + '%'
    })
    resource.fromStorage = ko.computed(function() {
      var net = Math.max(0, resource.currentLoss() - resource.currentGain())
      net = Math.min(net, resource.current())
      return '' + (100 * net / resource.scale()) + '%'
    })

    resource.gain = series(resource.currentGain, resource.scale)
    resource.loss = series(resource.currentLoss, resource.scale)
  }
})
