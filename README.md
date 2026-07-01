# StepCat Calculator

StepCat is an independent calculator and recordkeeping tool for step-challenge payout tracking.

It helps estimate possible payouts, save finalized results, track profit/loss/draws, calculate ROI, and copy spreadsheet-friendly rows for Google Sheets or similar tracking.

StepCat is an independent project and not an official platform tool.

## Live Web App

Use StepCat from the web version:

https://gatorball345-ux.github.io/StepCat-Profit-Calculator-/


## What's New

The Profitability Analysis template has been updated.

- Built-in formulas now support in-progress games and older manual entries added before using StepCat.
- When a game ends, update Earned and either Profit, Draw, or Lost. ROI and Result can update from the spreadsheet formulas.
- StepCat's recommended copy order now matches the template: Game Name, Start Date, End Date, Payment Type, Entry Fee, Earned, Profit, Draw, Lost, ROI, Result.
- Download the updated Profitability Analysis template if you have an older version.

## What StepCat Can Do

- Estimate payouts from the gross pot, entry fee, and eligible winners
- Support Non-Member and Member game calculations
- Save finalized official payouts
- Track profit, loss, draw, and ROI
- Copy saved rows into a spreadsheet
- Keep a saved history of results
- Provide quick access to guides, documentation, and templates

## Install App or Add to Home Screen

StepCat works as a normal webpage. On supported browsers, it can also be installed as an app-style shortcut or added to the home screen.

Install options work from the **web version opened in a browser**.

If the install box does not appear, use your browser menu or Share menu and choose **Install app** or **Add to Home Screen**.

On iPhone or iPad, open StepCat in Safari, tap **Share**, then choose **Add to Home Screen**.

Exact wording and install behavior may vary by device, browser, operating system, and launcher.

## Guides and Documentation

- Quick Start Guide: `quick-start-guide.html`
- Full Documentation: `standalone.html`
- Quick Start PDF: `StepCat_Quick_Start_Guide_v145.pdf`

## Basic Calculation Notes

For Non-Member estimates, StepCat subtracts 15% from the gross pot, then divides the adjusted pot by eligible winners.

For Member estimates, StepCat uses the full gross pot, then divides by eligible winners.

Finalized mode is for saving the official posted payout after the game is complete or officially settled.


## Result Logic

This workflow does not use partial-loss outcomes. A completed paid entry is treated as:

- Profit when Earned is greater than Entry Fee
- Draw when Earned is equal to Entry Fee, or when an estimate would otherwise be at/below Entry Fee
- Disqualified / Lost Entry Fee only when the full Entry Fee was forfeited

For finalized records, enter the Entry Fee as the Official Earned Amount for a draw. Use Disqualified / Lost Entry Fee only for full forfeiture.

## Spreadsheet Tracking

StepCat can copy saved results in a spreadsheet-friendly row format. This makes it easier to paste results into Google Sheets without rebuilding the row manually.

## Project Files

Common root files include:

- `index.html`
- `manifest.json`
- `service-worker.js`
- `quick-start-guide.html`
- `standalone.html`
- `StepCat_Quick_Start_Guide_v145.pdf`
- `StepCat_Blank_Profitability_Analysis_Template.xlsx`
- `images/`


### Profitability Analysis Template Copy Order

For the main Profitability Analysis template, use this StepCat export order:

1. Game Name
2. Start Date
3. End Date
4. Payment Type
5. Entry Fee
6. Earned
7. Profit
8. Draw
9. Lost
10. ROI
11. Result

Leave the header-row option off when pasting result rows into an existing sheet.

Older manual entries added before using StepCat may need spreadsheet formulas if ROI or Result were left blank. StepCat exports calculated values for new rows, but it cannot update rows already pasted into your spreadsheet.

For games already listed as in progress, update the existing spreadsheet row with Earned and either Profit, Draw, or Lost. ROI and Result can then calculate from the spreadsheet formulas. For completed games copied directly from StepCat, pasting ROI and Result is fine because StepCat already calculated them.

## Saved History Safety

Clear History can be restored because StepCat keeps one restore backup on the current device. Individual Delete actions are permanent and cannot be restored with the Restore button. Use Copy All Saved Rows first if you need a backup.

## Notes

StepCat is a personal/independent project built to make payout math and result tracking easier.

The official posted game result should always be treated as authoritative.
