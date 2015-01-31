# Gross Economy

A status bar mod for Planetary Annihilation that emphasises income and expense so that they can be visually compared.

## Features

Note: colors refer to default inverse color scheme.  You can change the theme a more traditional black in the settings.

Income is represented by larger hollow box, demand by a smaller solid bar.  The tick scale is currently 10 metal and 800 energy, what a typical bot fabber uses, with emphasized marks at 5x.  Note: due to the large range of values that are covered, ticks will be removed when they get too crowded.

A white extension to a bar represents a shortfall being made up by storage, or a surplus being sent to storage.

The grey dash in the demand bar is the range of values over the last 30 seconds.

The net amount of each resource is expressed in "basic fabbers" that could be started or stopped to balance that side of the economy.  This can also be set to percent or PA standard in settings.

The background color is coded similar to Economic Efficiency (see below)

The net amount is invert highlighted when that resource is the limit on build rate.

Storage has been made smaller and vertical.  Units are expressed in basic-fabber-seconds.

## Color Code

Percents efficiency rate

### Metal

Storage full: blue

Storage not-empty: green

Storage empty:
- > 75%: green
- 50%-75%: yellow
- 33%-50%: orange
- < 33%: red

### Energy

Storage full:
- > 150+: blue
- 110%-150%: green
- < 110%: yellow

Storage not-empty:
- > 100%: yellow
- < 100%: orange

Storage empty:
- > 90%: orange
- < 90%: red

## Conflicts

Any other mod which replaces the economy/status bar
