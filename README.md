# StepCat Calculator v246

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, PWA installation, and the six-sheet Profitability Analysis workbook.

## Important calculation update — July 25, 2026

v246 corrects the narrow app/workbook rounding mismatch identified in v245:

- StepCat now rounds **payout minus Entry Fee to two decimal places** before assigning Profit or Draw.
- A difference that displays as **$0.00** is always a **Draw**, never Profit.
- Profit and ROI use the same rounded-cent difference shown to the user.
- The workbook already used this two-decimal rule; v246 makes the app agree with it.
- The v245 Free Game chips/game-credit correction remains unchanged.

This improves arithmetic consistency. Estimate mode is still a projection because Gross Pot and Eligible Players may change before the official result.

### Moving existing records into v246

1. Keep the older workbook as a backup.
2. In the older workbook, copy only populated **Game Records A5:M** cells.
3. Open the v246 workbook, select **A5**, and paste—preferably as values only.
4. Do not copy entire sheets, headers, reports, or columns **N–Z**.
5. Existing paid results and Free Game rows recalculate automatically under the current rules.

## Public deployment files

- `index.html` — StepCat Calculator v246
- `manifest.json` — PWA metadata
- `service-worker.js` — offline cache and update handling
- `quick-start-guide.html` — concise operating guide
- `standalone.html` — full documentation
- `StepCat_Blank_Profitability_Analysis_Template.xlsx` — current public v246 workbook
- StepCat icon files

The Personal Master workbook and internal testing files are private and should not be uploaded to a public repository.

## Core result rules

- **Profit:** a paid return whose rounded two-decimal difference above Entry Fee is greater than `$0.00`.
- **Draw:** a normal paid return equal to or below Entry Fee, or whose rounded difference is `$0.00`; Net Profit and ROI are zero.
- **Disqualified paid game:** Final Earned is `$0.00`, the full Entry Fee is lost, and ROI is `−100.0%`.
- **Free Game:** returned amount is chips/game credit; ROI is N/A and cash Net Profit is `$0.00`.
- **Disqualified Free Game:** status is retained, chips earned are `0.00`, and monetary loss is `$0.00`.
- **Subscription:** workbook-only non-game cost that reduces Actual Running Net Profit without increasing game counts.

## v246 highlights

1. Profit and Draw classification now uses the same rounded-cent rule in the app and workbook.
2. A displayed `$0.00` difference can no longer be labeled Profit.
3. Free Game chips/game credit remain separated from all cash totals.
4. The compact install strip keeps native Install access visible without cluttering the calculator.
5. Membership Type remains visibly unconfirmed until Member or Non-Member is tapped for the current entry.

## Deployment

Upload the public deployment files to the repository root. Keep the stable workbook filename `StepCat_Blank_Profitability_Analysis_Template.xlsx` so existing links continue to work. After publishing, open the live site in a private tab, confirm **v246**, test the `$40.0049` versus `$40.00` edge case as a Draw, and download the current workbook.
