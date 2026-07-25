# StepCat Calculator v246.3.6

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, PWA installation, and the six-sheet Profitability Analysis workbook.

## v246.3.6 Record Review compatibility correction — July 25, 2026

The webpage calculation and copied A–M row structure are unchanged. The included workbook replaces the Record Review spill/`FILTER` approach with standard row-by-row `INDEX`/`MATCH` formulas for reliable use in both Microsoft Excel and Google Sheets.

The correction preserves the intended Record Review behavior:

- Subscription records are excluded without leaving blank rows between games.
- Game IDs remain continuously numbered as `G-0001`, `G-0002`, `G-0003`, and so forth.
- Existing non-subscription records remain visible instead of the review section appearing blank in Google Sheets.
- The 24-point Record Review row height remains in place so wrapped Game Name, review guidance, and Notes text are not clipped.

No payout, Profit/Draw, loss, ROI, membership, Free Game, or copied-row calculation logic changed. v246.2 remains the substantive calculation baseline.

## Workbook status

The workbook continues to distinguish:

- **Free Game — completed challenge/chips**
- **Subscription — membership charge only**

It also keeps Free Game reporting limited to Finalized records and excludes unknown blank chip amounts from averages while retaining recorded 0.00-chip results.

### Calculation baseline and migration requirements

**v246.2 was the last substantive workbook release that established the correct core calculation logic.** Later workbook releases retain that calculation base while adding classification clarity, reporting safeguards, and Record Review corrections.

Users may continue using an older workbook for its established calculations, but **migration is required to adopt the v246.3.6 Record Review compatibility correction**.

To migrate, copy only populated **Game Records A5:M** cells from the older workbook. In v246.3.6, select **A5** and paste, preferably as values only. Do not copy whole sheets, headers, Record Review, or formula columns **N–Z**. Keep the older workbook as a backup until records and totals are verified.

Rows copied from earlier v246.3 webpage builds retain the same A–M structure and remain compatible with workbook v246.3.6.

## Files in this update-only package

- `index.html` — v246.3.6 webpage notice with the corrected workbook and updated documentation embedded
- `service-worker.js` — refreshed offline cache so installed copies receive v246.3.6
- `StepCat_Blank_Profitability_Analysis_Template.xlsx` — corrected public workbook v246.3.6
- `README.md` — current workbook and migration explanation
- `quick-start-guide.html` — current workbook and migration steps
- `standalone.html` — current full documentation
- `UPLOAD_INSTRUCTIONS.txt` — replacement instructions

The Personal Master workbook is private and must not be uploaded to a public repository.

## Deployment

Replace the seven files above in the repository root and commit them to `main`. Keep the stable workbook filename `StepCat_Blank_Profitability_Analysis_Template.xlsx`. Leave the existing GitHub `images/` folder, manifest, and icon files unchanged.
