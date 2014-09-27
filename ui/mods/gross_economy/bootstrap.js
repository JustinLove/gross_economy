(function() {
  var config = require.s.contexts._.config
  config.waitSeconds = 0
  config.paths.gross_economy = 'coui://ui/mods/gross_economy'
  config.paths.text = config.paths.text || 'coui://ui/mods/gross_economy/text'
})()

require(['gross_economy/status_bar'], function(status_bar) {
  "use strict";

  $(status_bar.ready)
})
