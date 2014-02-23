define([], function() {
  return {
    metal: function(storage, ratio) {
      if (storage > 0.99) {
        return 'wasted'
      } else if (storage > 0) {
        return 'good'
      } else {
        if (ratio > 0.75) {
          return 'good'
        } else if (ratio > 0.5) {
          return 'warning'
        } else if (ratio > 0.33) {
          return 'danger'
        } else {
          return 'critical'
        }
      }
    },
    energy: function(storage, ratio) {
      if (storage > 0.99) {
        if (ratio > 1.5) {
          return 'wasted'
        } else if (ratio > 1.1) {
          return 'good'
        } else {
          return 'warning'
        }
      } else if (storage > 0) {
        if (ratio >= 1) {
          return 'warning'
        } else {
          return 'danger'
        }
      } else {
        if (ratio > 0.9) {
          return 'danger'
        } else {
          return 'critical'
        }
      }
    }
  }
})
