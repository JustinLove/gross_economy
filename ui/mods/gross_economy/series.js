define([], function() {
  return function(value) {
    var valueHistory = []
    var timeHistory = []

    var s = {
      value: value,
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
      return Math.max(0, s.min())
    })
    s.rangeEnd = ko.computed(function() {
      return Math.min(1000000, s.max())
    })

    return s
  }
})
