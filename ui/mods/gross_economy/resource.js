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
    resource.gain = series(resource.currentGain, resource.scale)
    resource.loss = series(resource.currentLoss, resource.scale)
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

    var per_loss = ko.computed(function() {
      return ''+ (100 * unit_loss() / resource.scale()) + '%'
    })
    var per_toStorage = ko.computed(function() {
      return ''+ (100 * unit_toStorage() / resource.scale()) + '%'
    })
    var per_toSharingBase = ko.computed(function() {
      return ''+ (100 * (unit_loss() + unit_toStorage()) / resource.scale()) + '%'
    })
    var per_toSharing = ko.computed(function() {
      return ''+ (100 * unit_toSharing() / resource.scale()) + '%'
    })
    var per_gain = ko.computed(function() {
      return ''+ (100 * unit_gain() / resource.scale()) + '%'
    })
    var per_fromSharing = ko.computed(function() {
      return ''+ (100 * unit_fromSharing() / resource.scale()) + '%'
    })
    var per_fromStorageBase = ko.computed(function() {
      return ''+ (100 * (unit_gain() + unit_fromSharing()) / resource.scale()) + '%'
    })
    var per_fromStorage = ko.computed(function() {
      return ''+ (100 * unit_fromStorage() / resource.scale()) + '%'
    })

    resource.bars = [
      {
        name: 'ge-bar-range',
        tooltip: '30s range',
        left: resource.loss.rangeStart,
        width: resource.loss.rangeEnd
      },
      {
        name: 'ge-bar-loss',
        tooltip: resource.resource + ' expended',
        left: zero,
        width: per_loss
      },
      {
        name: 'ge-bar-to-storage',
        tooltip: resource.resource + ' to storage',
        left: per_loss,
        width: per_toStorage
      },
      {
        name: 'ge-bar-to-sharing',
        tooltip: resource.resource + ' to allies',
        left: per_toSharingBase,
        width: per_toSharing
      },
      {
        name: 'ge-bar-gain',
        tooltip: resource.resource + ' produced',
        left: zero,
        width: per_gain
      },
      {
        name: 'ge-bar-from-sharing',
        tooltip: resource.resource + ' from allies',
        left: per_gain,
        width: per_fromSharing
      },
      {
        name: 'ge-bar-from-storage',
        tooltip: resource.resource + ' from storage',
        left: per_fromStorageBase,
        width: per_fromStorage
      }
    ]

  }
})
