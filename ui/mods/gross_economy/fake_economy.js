define([], function() {
  var resource = function(scale) {
    var gain = Math.round(Math.random() * scale)
    var loss = Math.round(Math.random() * Math.random() * scale * 2)
    var storage = scale * 10
    if (Math.random() < 0.33) {
      var current = 0
    } else if (Math.random() < 0.5) {
      var current = Math.round(Math.random() * storage)
    } else {
      var current = storage
    }
    var net = gain - loss
    var shared = Math.round(-1 * Math.random() * net)
    return {
      current: current,
      storage: storage,
      production: gain,
      demand: loss,
      shared: shared
    }
  }

  var payload = function() {
    return {
      energy: resource(10000000),
      metal: resource(10000)
    }
  }

  var update = function() {
    setTimeout(update, 1000)
    var p = payload()
    handlers.army(p)
  }


  return {
    resource: resource,
    payload: payload,
    update: update,
  }
})
