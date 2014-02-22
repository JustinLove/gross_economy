define([], function() {
  return function(value, scale) {
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
      return '' + Math.min(100, 100 * (s.max() - s.min()) / scale()) + '%'
    })

    return s
  }
})
