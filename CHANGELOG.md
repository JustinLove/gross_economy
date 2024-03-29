## 6.3.2

- Fix binding error, presumed to be change in KO version
- Layout triage

## 6.3.1

- Triage layout of overall efficiency for 86422 (titans); still a little wonky with eco multiplier

## 6.3.0

- Rearranged elements to emphasize resource bars.
- Demand number is in number bar; supply number is larger and semi-transparent
- Changed default net unit to simple.
- Optional log scale
- Add tag `economy`

## 6.2.0

- Changed the energy unit for basic fabber seconds from 1000 to 800 to match 77443

## 6.1.1

- Disable Require.js timeout due to longer game load times with default render process limit.

## 6.1.0

- Update to new settings layout circa 17378

## 6.0.0

- If unpacked RequireJS is good enough for Galactic War, it's good enough for me.
- Without a build process, remove Grunt
- Remove depreciated fields from modinfo
- Patch to make mod settings appear in Settings page

## 5.0.1

- CSS fix to allow top player vision/control checkboxes to be clicked.

## 5.0.0

- Implement shared resources, in same manner as storage.  Color up in air, don't like any of them.
- Dev: routines to fake economy data
- Major refactoring of bars
- Implement tooltips as in main game
- Borrow metric units from main game
- Update for new settings system, no longer depends on rSettingsManager

## 4.0.0

- Update for Galactic phase UI
- Nuke the CSS from orbit, it's the only way to be sure
- Add icon

## 3.0.1

- Fix a minor styling issue.

## 3.0.0

- Supply is a box with the demand bar inside
- Setting for net amount display: bot fabbers, percent, or standard
- Settable theme, classic black or, inverse: color coding in the bar backdrop
- Now depends on Settings Manager

## 2.0.1

- Fix cosmetic updates from 63180
- Update modinfo for scenes key

## 2.0

- Loads in Gamma (62037)
- Fixed range going off scale; the scale will use the range max, so it should be a little less jumpy.

## 1.1

- Using RequireJS interally, built with Grunt
- Scale is set to supply * 2 (unless demand is > 200%)
- Dark bar extension shows amount going to or from storage
- Range indicator moved to bottom edge
- The net amount is colored similar to Economic Efficiency
- Swapped supply and demand bars verically

## 1.0.1

- Added [REL] forum url
