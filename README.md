# StepCat Calculator v246.1

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, PWA installation, and the six-sheet Profitability Analysis workbook.

## v246.1 workbook layout update — July 25, 2026

v246.1 makes two workbook presentation corrections identified during the final package audit:

- The **Summary** title is merged and centered so the full title remains visible.
- **Game Records rows 1–4 are frozen**, keeping the running totals and headers visible while scrolling.
- No calculation formulas, result classifications, Free Game chips accounting, or personal totals changed.
- The v246 rounded-cent rule remains in place: a payout-minus-Entry-Fee difference displayed as `$0.00` is a Draw.
- Free Game chips/game credit remain excluded from every cash-profit total.

### Moving existing records

No migration is required when moving from v246 to v246.1. For an older workbook, copy only populated **Game Records A5:M** cells into **A5** of the v246.1 workbook, preferably as values only. Do not copy whole sheets or formula columns **N–Z**.

## Public deployment files

- `index.html` — StepCat Calculator v246.1
- `manifest.json` — PWA metadata
- `service-worker.js` — offline cache and update handling
- `quick-start-guide.html` — concise operating guide
- `standalone.html` — full documentation
- `StepCat_Blank_Profitability_Analysis_Template.xlsx` — current public v246.1 workbook
- StepCat icon files

The Personal Master workbook and internal testing files are private and should not be uploaded to a public repository.

## Core result rules

- **Profit:** a paid return whose rounded two-decimal difference above Entry Fee is greater than `$0.00`.
- **Draw:** a normal paid return equal to or below Entry Fee, or whose rounded difference is `$0.00`; Net Profit and ROI are zero.
- **Disqualified paid game:** Final Earned is `$0.00`, the full Entry Fee is lost, and ROI is `−100.0%`.
- **Free Game:** returned amount is chips/game credit; ROI is N/A and cash Net Profit is `$0.00`.
- **Disqualified Free Game:** status is retained, chips earned are `0.00`, and monetary loss is `$0.00`.
- **Subscription:** workbook-only non-game cost that reduces Actual Running Net Profit without increasing game counts.

## Deployment

Upload the public files to the repository root. Keep the stable workbook filename `StepCat_Blank_Profitability_Analysis_Template.xlsx` so existing links continue to work. Leave the existing GitHub `images/` folder unchanged; the v246.1 package does not replace those screenshots. After publishing, open the live site in a private tab, confirm **v246.1**, and download the current workbook.
