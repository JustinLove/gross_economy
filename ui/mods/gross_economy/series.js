define([], function() {
  return function(value, transform) {
    var valueHistory = []
    var timeHistory = []

    var s = {
      transform: transform,
      value: value,
      percent: ko.computed(function() {
        return '' + transform(value()) + '%';
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
      return '' + transform(s.min()) + '%'
    })
    s.rangeEnd = ko.computed(function() {
      return '' + transform(Math.min(1000000, s.max()) - Math.max(0, s.min())) + '%'
    })

    return s
  }
})
