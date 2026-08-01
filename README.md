# StepCat Calculator v252

StepCat calculates Estimate projections and records Finalized outcomes, keeps Saved History locally, and copies exact A-M rows into the matching profitability workbook.

## What changed in v252

v252 is a focused state-management and validation rebuild. It protects meaningful unsaved entries before Clear Entry or Start New Entry, clears completed drafts after a successful save, and prevents Disqualified from returning through draft recovery.

Free Game records now require a $0 Entry Fee in both Estimate and Finalized modes. Saved History records receive permanent, non-editable `SC-####` Record IDs. Named records show the ID as secondary text; unnamed records use it in the card title and copied Game Name value.

Game Entry and Additional Details have visible manual drawer controls and visually distinct collapsed headers. Default-open settings apply when StepCat loads or refreshes without resetting the live drawer state during the current session. Finalizing an Estimate updates and scrolls to the exact existing record. Individual Delete provides a brief Undo action. Restore Defaults now returns Haptic Feedback to Low.

The matched workbook adds a Record Review warning for Free Game rows with a non-zero Entry Fee and retains the existing StepCat colors, formulas, reports, and A-M / N-Z separation.

## Release status

This package is local until deliberately uploaded. The version currently published on GitHub remains available until the owner replaces it.

## Included files

- `index.html` - StepCat v252 app
- `manifest.json` and `service-worker.js` - PWA configuration
- `quick-start-guide.html` - browser Quick Start Guide
- `standalone.html` - Full Documentation
- `StepCat_Quick_Start_Guide_v252.pdf` - illustrated PDF guide
- `StepCat_Quick_Start_Guide_v252.docx` - editable guide
- `StepCat_Blank_Profitability_Analysis_Template_v252.xlsx` - matched blank workbook
- `V252_RELEASE_NOTES.txt` - detailed changes
- `V252_TESTING_CHECKLIST.txt` - focused regression tests
- `UPLOAD_INSTRUCTIONS.txt` - GitHub deployment and migration steps
- `images/` - documentation screenshots

## Help and navigation

Help & Resources places Quick Start, Full Documentation, Google Sheets, PDF, and DOCX destinations first. Separate visible routes open Rules & Troubleshooting, Spreadsheet Copy Help, Installation & Shortcuts, and Feedback.

## Basic workflow

1. Choose Estimate or Finalized.
2. Confirm Member or Non-Member.
3. Open Additional Details only when useful.
4. Enter the required values and Calculate & Save.
5. Copy This Sheet Row into the first unused Game Records column-A cell.
6. When an Estimate ends, use Finalize This Estimate and replace the same workbook row.

## Record IDs

StepCat assigns records permanent IDs such as `SC-0023`. They are not spreadsheet row numbers and are not editable. Existing named workbook rows do not need IDs. An ID enters the workbook Game Name column only as part of an unnamed-record fallback.

## Workbook safety

Enter or paste only in Game Records columns A-M. Columns N-Z are formulas. Keep the older workbook as a backup and verify Record Review and report totals after migration.

## Repository icons

Existing repository icon PNG files must remain in the GitHub repository. This package does not duplicate them.

## Publishing

Do not replace the live GitHub files until the focused v252 regression checklist passes. After deployment, verify hosted installation, service-worker updating, downloads, feedback, and workbook copying.
