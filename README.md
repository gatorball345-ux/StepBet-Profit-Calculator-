# StepCat Calculator

StepCat is an independent calculator and recordkeeping tool for StepBet-style games.

It helps estimate possible payouts, save finalized results, track profit/loss/draws, calculate ROI, and copy spreadsheet-friendly rows for Google Sheets or similar tracking.

StepCat is not an official StepBet tool.

## Live Web App

Use StepCat from the web version:

https://gatorball345-ux.github.io/StepBet-Profit-Calculator-/

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
- `images/`

## Saved History Safety

Clear History can be restored because StepCat keeps one restore backup on the current device. Individual Delete actions are permanent and cannot be restored with the Restore button. Use Copy All Saved Rows first if you need a backup.

## Notes

StepCat is a personal/independent project built to make payout math and result tracking easier.

The official posted game result should always be treated as authoritative.
