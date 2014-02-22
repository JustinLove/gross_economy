require.config({
  baseUrl: "coui://ui/mods",
  paths: {
  }
})
require(['gross_economy/status_bar'], function(status_bar) {
  "use strict";

  status_bar.load()
})
