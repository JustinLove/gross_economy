(function() {
  var paths = require.s.contexts._.config.paths
  paths.gross_economy = 'coui://ui/mods/gross_economy'
  paths.text = paths.text || 'coui://ui/mods/gross_economy/text'
})()

require(['gross_economy/status_bar'], function(status_bar) {
  "use strict";

  $(status_bar.ready)
})
