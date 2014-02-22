# Gross Economy

A status bar mod for Planetary Annihilation that emphasises income and expense so that they can be visually compared.

## Features

The main bars are the income and expense for each resource.  The tick scale is currently 10 metal and 1000 energy, what a typical bot fabber uses, with emphasized marks at 5x.  Note: due to the large range of values that are covered, ticks will be removed when they get too crowded.

The white dash in each bar is the range of values over the last 30 seconds.

The net amount of each resource is expressed in "basic fabbers" that could be started or stopped to balance that side of the economy.

The net amount is invert highlighted when that resource is the limit on build rate.

The energy icon has a dull red circle background when energy is negative and radar etc. is shut down.

Storage has been made smaller and vertical.  Units are expressed in basic-fabber-seconds.

## Conflicts

Partially compatible with Economic Efficiency - the additional center box will remain if both are enabled.

## Development

The project is set up to use combine files using [RequireJS](http://requirejs.org/) and [amdclean](https://github.com/gfranko/amdclean), with build automation through [Grunt](http://gruntjs.com/), which combines the JS, inlines HTML, copies files, and edits `modinfo.json` to fix up paths and names.

The repository expects to be in a mod folder named `gross_economy_dev`.  The default grunt task builds to `gross_economy_test`.  The 'production' build is through:

    grunt --target=gross_economy

The main mod file is `modinfo.dev.json` because PAMM rewrites `modinfo.json` when updating it.  `grunt copy:dev` is a convience task to update the live file from the formatted one.

