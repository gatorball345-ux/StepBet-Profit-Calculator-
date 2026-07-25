# StepCat Calculator v245

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, installation as a PWA, and the six-sheet Profitability Analysis workbook.

## Important workbook update — July 25, 2026

The v245 workbook corrects how **Free Game payouts** are recorded. Free Games pay in **chips/game credit**, not cash. The workbook now tracks chips separately and excludes them from:

- Gross Profit Earned
- Net Profit
- Running Net Game Profit
- Actual Running Net Profit
- Game Records column Z Running Net Profit

The previously corrected Draw formulas remain in place.

### Moving existing records into v245

1. Keep the older workbook as a backup.
2. In the older workbook, copy only populated **Game Records A5:M** cells.
3. Open the v245 workbook, select **A5**, and paste—preferably as values only.
4. Do not copy entire sheets, headers, reports, or columns **N–Z**.
5. Existing Free Game rows recalculate automatically. Verify that prior Free Game returns appear under **Free Game Chips Earned** and no longer increase cash-profit totals.

## Public deployment files

- `index.html` — StepCat Calculator v245
- `manifest.json` — PWA metadata
- `service-worker.js` — offline cache and update handling
- `quick-start-guide.html` — concise operating guide
- `standalone.html` — full documentation
- `StepCat_Blank_Profitability_Analysis_Template.xlsx` — current public v245 workbook
- StepCat icon files

The Personal Master workbook and internal testing files are private and should not be uploaded to a public repository.

## Core result rules

- **Profit:** a paid return above Entry Fee; cash Profit is Return minus Entry Fee.
- **Draw:** a normal paid return equal to or below Entry Fee; Net Profit and ROI are zero.
- **Disqualified paid game:** Final Earned is `$0.00`, the full Entry Fee is lost, and ROI is `−100.0%`.
- **Free Game:** returned amount is chips/game credit; ROI is N/A and cash Net Profit is `$0.00`.
- **Disqualified Free Game:** status is retained, chips earned are `0.00`, and monetary loss is `$0.00`.
- **Subscription:** workbook-only non-game cost that reduces Actual Running Net Profit without increasing game counts.

## v245 highlights

1. Free Game chips/game credit are tracked separately from cash accounting.
2. The workbook notice explains the v245 change and safe A5:M migration.
3. The compact install strip keeps native Install access visible without cluttering the calculator.
4. Membership Type remains visibly unconfirmed until Member or Non-Member is tapped for the current entry.
5. Saved History displays Free Game returns as chips and keeps Copy This Sheet Row on each compact card.

## Deployment

Upload the public deployment files to the repository root. Keep the stable workbook filename `StepCat_Blank_Profitability_Analysis_Template.xlsx` so existing links continue to work. After publishing, open the live site in a private tab, confirm **v245**, download the workbook, and verify the Free Game chips notice.
