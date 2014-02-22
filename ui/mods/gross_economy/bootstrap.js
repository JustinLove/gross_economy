require.config({
  baseUrl: "coui://ui/mods",
  paths: {
    text: 'gross_economy/text',
  }
})
require(['gross_economy/status_bar'], function(status_bar) {
  "use strict";

  status_bar.load()
})
