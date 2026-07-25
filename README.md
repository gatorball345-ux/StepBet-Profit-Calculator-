# StepCat Calculator v246.3

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, PWA installation, and the six-sheet Profitability Analysis workbook.

## v246.3 guided webpage entry update — July 25, 2026

The webpage remains v246.3. It adds membership-first guided entry, live Calculate & Save readiness, and A–M workbook-column badges without changing the copied A–M row structure.

## Workbook v246.3.3 calculation-baseline clarification

Workbook v246.3.3 makes the manual Payment / Record Type choices unmistakable:

- **Free Game — completed challenge/chips**
- **Subscription — membership charge only**

It also keeps Free Game reporting limited to Finalized records and excludes unknown blank chip amounts from averages while retaining recorded 0.00-chip results.

### Calculation baseline and migration requirements

**v246.2 was the last substantive workbook release that established the correct core calculation logic.** The v246.3 workbook retained the same formulas and was also calculation-correct; v246.3 was primarily a webpage/interface release.

Users may continue using v246.2 or v246.3 when they only need those established calculations and their records are classified correctly. However, **migration is required to adopt the v246.3.3 workbook improvements**, including the clearer Free Game/Subscription choices and the later Free Game reporting safeguards.

To migrate, copy only populated **Game Records A5:M** cells from the older workbook. In v246.3.3, select **A5** and paste, preferably as values only. Do not copy whole sheets, headers, or formula columns **N–Z**. Keep the older workbook as a backup until records and totals are verified.

Rows copied from the v246.3 webpage retain the same A–M structure and remain compatible with workbook v246.3.3.

## Files in this update-only package

- `index.html` — current v246.3 webpage with the corrected workbook notice and embedded workbook/docs
- `service-worker.js` — refreshed offline cache
- `StepCat_Blank_Profitability_Analysis_Template.xlsx` — workbook v246.3.3
- `README.md` — corrected compatibility and migration explanation
- `quick-start-guide.html` — corrected migration steps
- `standalone.html` — corrected full documentation
- `UPLOAD_INSTRUCTIONS.txt` — replacement instructions

The Personal Master workbook is private and must not be uploaded to a public repository.

## Deployment

Replace the seven files above in the repository root and commit them to `main`. Keep the stable workbook filename `StepCat_Blank_Profitability_Analysis_Template.xlsx`. Leave the existing GitHub `images/` folder and all icon files unchanged.
