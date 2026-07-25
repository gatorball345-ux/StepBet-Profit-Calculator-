# StepCat Calculator v246.3.5

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, PWA installation, and the six-sheet Profitability Analysis workbook.

## v246.3.5 Record Review indexing correction — July 25, 2026

The webpage calculation and copied A–M row structure are unchanged. The included workbook corrects two Record Review presentation issues:

- Subscription records are excluded without leaving blank rows between games.
- Game Records IDs now follow the displayed sequential Game #, so the list continues as `G-0009`, `G-0010`, `G-0011`, and so forth.

The v246.3.4 row-height correction remains in place, so wrapped Game Name, review guidance, and Notes text remain visible.

## Workbook status

The workbook continues to distinguish:

- **Free Game — completed challenge/chips**
- **Subscription — membership charge only**

It also keeps Free Game reporting limited to Finalized records and excludes unknown blank chip amounts from averages while retaining recorded 0.00-chip results.

### Calculation baseline and migration requirements

**v246.2 was the last substantive workbook release that established the correct core calculation logic.** Later workbook releases retain that calculation base while adding classification clarity, reporting safeguards, and Record Review corrections.

Users may continue using v246.2 or v246.3 when they only need those established calculations and their records are classified correctly. However, **migration is required to adopt the v246.3.5 workbook improvements**, including the clearer Free Game/Subscription choices, later Free Game reporting safeguards, corrected row height, and uninterrupted Record Review numbering.

To migrate, copy only populated **Game Records A5:M** cells from the older workbook. In v246.3.5, select **A5** and paste, preferably as values only. Do not copy whole sheets, headers, Record Review, or formula columns **N–Z**. Keep the older workbook as a backup until records and totals are verified.

Rows copied from the v246.3 webpage retain the same A–M structure and remain compatible with workbook v246.3.5.

## Files in this update-only package

- `index.html` — current v246.3.5 webpage notice with embedded workbook and documentation
- `service-worker.js` — refreshed offline cache
- `StepCat_Blank_Profitability_Analysis_Template.xlsx` — workbook v246.3.5
- `README.md` — current workbook and migration explanation
- `quick-start-guide.html` — current migration steps
- `standalone.html` — current full documentation
- `UPLOAD_INSTRUCTIONS.txt` — replacement instructions

The Personal Master workbook is private and must not be uploaded to a public repository.

## Deployment

Replace the seven files above in the repository root and commit them to `main`. Keep the stable workbook filename `StepCat_Blank_Profitability_Analysis_Template.xlsx`. Leave the existing GitHub `images/` folder and all icon files unchanged.
