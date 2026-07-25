# StepCat Calculator v246.3

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, PWA installation, and the six-sheet Profitability Analysis workbook.

## v246.3 guided webpage entry update — July 25, 2026

v246.3 improves the webpage workflow without changing spreadsheet calculations or copied rows:

- **D · Entry Mode** and **E · Membership Type** are visibly mapped to their workbook columns.
- Game Entry remains permanently open, but its fields stay dim and inactive until Member or Non-Member is tapped for the current entry.
- Remembered input values remain visible after refresh when enabled, but a fresh membership tap is still required.
- **Calculate & Save** remains subdued until the selected mode's required fields are valid. A live status identifies what is missing, and tapping early still scrolls to and highlights the first issue.
- Every copied input has a subtle **A–M badge** matching the workbook column.
- **Open Game Entry by default** was removed from Settings because Game Entry is now always present.
- Saved History's default-open setting is disabled whenever Saved History is hidden.
- Spreadsheet Copy Setup remains removed; the existing compact Spreadsheet Copy Help section is retained.

## Workbook compatibility

v246.3 is primarily a webpage-interface update. Existing **v246.2 workbooks remain fully current** and accept the same exact A–M rows copied from the v246.3 webpage. No migration or replacement workbook is required.

The workbook included in this package is labeled v246.3 only for release consistency and contains an explanatory notice. Its formulas, columns, accounting behavior, cash/chips separation, formatting, reports, and totals are unchanged from v246.2.

## Public deployment files

- `index.html` — StepCat Calculator v246.3
- `manifest.json` — PWA metadata
- `service-worker.js` — offline cache and update handling
- `quick-start-guide.html` — concise operating guide
- `standalone.html` — full documentation
- `StepCat_Blank_Profitability_Analysis_Template.xlsx` — optional v246.3-labeled workbook; v246.2 remains compatible
- Existing StepCat icon files

The Personal Master workbook and internal testing files are private and should not be uploaded to a public repository.

## Deployment

Upload the public package files to the repository root and commit them to `main`. Keep the stable workbook filename `StepCat_Blank_Profitability_Analysis_Template.xlsx`. Leave the existing GitHub `images/` folder unchanged; this package does not replace those screenshots. After publishing, confirm v246.3 on the live page and verify that Game Entry activates only after Membership Type is tapped.
