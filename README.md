# StepCat Calculator v246.3.4

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, PWA installation, and the six-sheet Profitability Analysis workbook.

## v246.3.4 readability correction — July 25, 2026

The webpage now identifies itself as v246.3.4. Eligible Players and Total Players guidance now renders the intended bold emphasis instead of displaying literal `<strong>` tags. Guided entry, calculations, and copied A–M row structure are unchanged.

## Workbook v246.3.4 Record Review readability fix

Workbook v246.3.4 keeps the manual Payment / Record Type choices unmistakable:

- **Free Game — completed challenge/chips**
- **Subscription — membership charge only**

It also keeps Free Game reporting limited to Finalized records, excludes unknown blank chip amounts from averages while retaining recorded 0.00-chip results, and gives Record Review rows 5–504 a consistent 24-point height so wrapped review text and Notes are not clipped.

### Calculation baseline and migration requirements

**v246.2 was the last substantive workbook release that established the correct core calculation logic.** The v246.3 workbook retained the same formulas and was also calculation-correct; v246.3 was primarily a webpage/interface release.

Users may continue using v246.2 or v246.3 when they only need those established calculations and their records are classified correctly. However, **migration is required to adopt the v246.3.4 workbook improvements**, including the clearer Free Game/Subscription choices and the later Free Game reporting safeguards.

To migrate, copy only populated **Game Records A5:M** cells from the older workbook. In v246.3.4, select **A5** and paste, preferably as values only. Do not copy whole sheets, headers, or formula columns **N–Z**. Keep the older workbook as a backup until records and totals are verified.

Rows copied from the v246.3 webpage retain the same A–M structure and remain compatible with workbook v246.3.4.

## Files in this update-only package

- `index.html` — current v246.3.4 webpage with the corrected workbook notice and embedded workbook/docs
- `service-worker.js` — refreshed offline cache
- `StepCat_Blank_Profitability_Analysis_Template.xlsx` — workbook v246.3.4
- `README.md` — corrected compatibility and migration explanation
- `quick-start-guide.html` — corrected migration steps
- `standalone.html` — corrected full documentation
- `UPLOAD_INSTRUCTIONS.txt` — replacement instructions

The Personal Master workbook is private and must not be uploaded to a public repository.

## Deployment

Replace the seven files above in the repository root and commit them to `main`. Keep the stable workbook filename `StepCat_Blank_Profitability_Analysis_Template.xlsx`. Leave the existing GitHub `images/` folder and all icon files unchanged.
