# StepCat Calculator v200

StepCat is an independent calculator and recordkeeping tool for step-challenge payout tracking.

It helps estimate possible payouts, save finalized results, track profit/draw/disqualified outcomes, calculate ROI, and copy spreadsheet-ready rows for Google Sheets or similar tracking.

StepCat is an independent project and not an official platform tool.

## Live Web App

Use StepCat from the web version:

https://gatorball345-ux.github.io/StepCat-Profit-Calculator-/

## What's New in v200

- Copied rows paste as plain values so the spreadsheet controls font size and formatting.
- Help and Settings use top-corner close buttons again.
- Result Card uses **Clear Card** so clearing the visible card does not delete Saved History.
- Saved History keeps individual **Delete** actions for saved entries.
- The v200 Profitability Analysis Template includes formulas for older and in-progress rows.
- For best estimate accuracy, add new challenges after warm-up week ends, then update Eligible Winners as the challenge progresses.

## What StepCat Can Do

- Estimate payouts from the gross pot, entry fee, and eligible winners
- Support Non-Member and Member game calculations
- Save finalized official results using the Official Total Earned Amount
- Track profit, draw, disqualified/lost-entry outcomes, and ROI
- Copy plain-value spreadsheet rows
- Keep a saved history of results
- Provide quick access to guides, documentation, and templates

## Basic Calculation Notes

For Non-Member estimates, StepCat subtracts 15% from the gross pot, then divides the adjusted pot by eligible winners.

For Member estimates, StepCat uses the full gross pot, then divides by eligible winners.

For best estimate accuracy, add challenges after warm-up week ends. Gross Pot and Total Players are usually more stable then. Update Eligible Winners whenever you want a fresher estimate.

Finalized mode is for saving the official completed result. Enter the **Official Total Earned Amount**, meaning the total returned, not just extra profit.

Example: a $40 entry plus $4.36 profit should be entered as $44.36 in Finalized mode.

## Result Logic

This workflow does not use partial-loss outcomes. A completed paid entry is treated as:

- Profit when Earned is greater than Entry Fee
- Draw when Earned is equal to Entry Fee, or when an estimate would otherwise be at/below Entry Fee
- Disqualified / Lost Entry Fee only when the full Entry Fee was forfeited

## Spreadsheet Tracking

StepCat copies spreadsheet rows as plain tab-separated values. This lets the Profitability Analysis Template control font size, alignment, borders, and formulas.

### Profitability Analysis Template Copy Order

For the main Profitability Analysis Template, use this StepCat export order:

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

Leave the header-row option off when pasting result rows into an existing template with headers.

Older rows can be pasted into matching columns in the v200 template. Formula columns such as ROI and Result can calculate supported missing values. You can also recalculate an older entry in StepCat and paste the copied row over the matching spreadsheet row.

## Guides and Documentation

- Quick Start Guide: `quick-start-guide.html`
- Full Documentation: `standalone.html`
- Quick Start PDF: `StepCat_Quick_Start_Guide_v200.pdf`
- Profitability Template: `StepCat_Blank_Profitability_Analysis_Template.xlsx`

## Saved History Safety

- **Clear Card** hides only the visible Result Card.
- Saved History entries remain saved unless their individual **Delete** button is used.
- **Clear History** can be restored because StepCat keeps one restore backup on the current device.
- Individual Saved History Delete actions are permanent and cannot be restored with the Restore button.

## Project Files

Common root files include:

- `index.html`
- `manifest.json`
- `service-worker.js`
- `quick-start-guide.html`
- `standalone.html`
- `StepCat_Quick_Start_Guide_v200.pdf`
- `StepCat_Quick_Start_Guide_v200.docx`
- `StepCat_Blank_Profitability_Analysis_Template.xlsx`
- `images/`

## Notes

StepCat is a personal/independent project built to make payout math and result tracking easier.

The official posted game result should always be treated as authoritative.
