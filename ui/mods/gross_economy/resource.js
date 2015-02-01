define(['gross_economy/series'], function(series) {
  var tickColor = function(weight) {
    return 'rgba(255, 255, 255, ' + weight + ')'
  }

  return function(resource) {
    switch (api.settings.isSet('ui', 'gross_economy_resource_net', true)) {
      default:
      case 'BASIC FABBER SECONDS':
        resource.netString = resource.netStringBfs
        break
      case 'PERCENT':
      case 'EFFICIENCY':
        resource.netString = resource.efficiencyString
        break
      case 'SIMPLE':
        resource.netString = resource.netStringStock
        break
    }

    var currentBfs = ko.computed(function() {
      return Math.round(resource.current() / resource.tick)
    })
    switch (api.settings.isSet('ui', 'gross_economy_resource_storage', true)) {
      case 'BASIC FABBER SECONDS':
        resource.currentString = currentBfs
        break
      case 'PERCENT':
        resource.currentString = resource.fractionString
        break
      default:
      case 'SIMPLE':
        // supplied value
        break
    }
    resource.scale = ko.computed(function() {
      if (resource.loss) {
        return Math.max(resource.min, resource.currentGain() * 2, resource.currentLoss(),
          resource.gain.max() * 2, resource.loss.max())
      } else {
        return Math.max(resource.min, resource.currentGain() * 2, resource.currentLoss())
      }
    })

    /*
    var transform = function(x) {
      return x / resource.scale()
    }
    */

    var transform = function(x) {
      if (x == 0) {
        return 0
      } else {
        var y = Math.log(x/resource.tick) / Math.log(10000)
        return y
      }
    }

    var percent = function(left, right) {
      return ko.computed(function() {
        return '' + (100 * (transform(right()) - transform(left()))) + '%'
      })
    }

    resource.gain = series(resource.currentGain)
    resource.loss = series(resource.currentLoss)
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
    resource.colorCalculated = ko.computed(function() {
      var storage = resource.current() / resource.max()
      var denom = resource.currentLoss()
      if (denom < 1) {denom = 1}
      var ratio = resource.currentGain() / denom
      return 'rate-' + resource.judgement(storage, ratio)
    })

    resource.coloration = ko.observable()

    resource.colorCalculated.subscribe(resource.coloration)

    resource.coloration.subscribe(function(value) {
      if (resource.$parent) {
        resource.$parent.attr('class', 'contents ' + value)
      }
    })

    var zero = function() {return 0}
    var unit_loss = resource.currentLoss
    var unit_toStorage = ko.computed(function() {
      var net = Math.max(0, resource.currentGain() - resource.currentLoss() + resource.shared())
      return Math.min(net, resource.max() - resource.current())
    })
    var unit_toSharing = ko.computed(function() {
      return Math.max(0, -resource.shared())
    })
    var unit_gain = resource.currentGain
    var unit_fromSharing = ko.computed(function() {
      return Math.max(0, resource.shared())
    })
    var unit_fromStorage = ko.computed(function() {
      var net = Math.max(0, resource.currentLoss() - resource.currentGain() - resource.shared())
      return Math.min(net, resource.current())
    })

    var unit_rightToStorage = ko.computed(function() {
      return unit_loss() + unit_toStorage()
    })
    var unit_rightToSharing = ko.computed(function() {
      return unit_loss() + unit_toStorage() + unit_toSharing()
    })
    var unit_rightFromSharing = ko.computed(function() {
      return unit_gain() + unit_fromSharing()
    })
    var unit_rightFromStorage = ko.computed(function() {
      return unit_gain() + unit_fromSharing() + unit_fromStorage()
    })

    resource.bars = [
      {
        name: 'ge-bar-range',
        tooltip: '30s range',
        left: percent(zero, resource.loss.rangeStart),
        width: percent(resource.loss.rangeStart, resource.loss.rangeEnd)
      },
      {
        name: 'ge-bar-loss',
        tooltip: resource.resource + ' expended',
        left: zero,
        width: percent(zero, unit_loss)
      },
      {
        name: 'ge-bar-to-storage',
        tooltip: resource.resource + ' to storage',
        left: percent(zero, unit_loss),
        width: percent(unit_loss, unit_rightToStorage)
      },
      {
        name: 'ge-bar-to-sharing',
        tooltip: resource.resource + ' to allies',
        left: percent(zero, unit_rightToStorage),
        width: percent(unit_rightToStorage, unit_rightToSharing)
      },
      {
        name: 'ge-bar-gain',
        tooltip: resource.resource + ' produced',
        left: zero,
        width: percent(zero, unit_gain)
      },
      {
        name: 'ge-bar-from-sharing',
        tooltip: resource.resource + ' from allies',
        left: percent(zero, unit_gain),
        width: percent(unit_gain, unit_rightFromSharing)
      },
      {
        name: 'ge-bar-from-storage',
        tooltip: resource.resource + ' from storage',
        left: percent(zero, unit_rightFromSharing),
        width: percent(unit_rightFromSharing, unit_rightFromStorage)
      }
    ]
  }
})
