# StepCat Calculator v252.1

StepCat calculates Estimate projections and records Finalized outcomes, stores Saved History locally, and copies exact A-M rows into the matching Google Sheets workbook template.

## What changed in correction-spec rebuild R9

- The Optional Fields control now changes both its title and helper text:
  - Closed: **Show Optional Fields** with a description of the extra information available.
  - Open: **Hide Optional Fields** with **Collapse the optional information shown below.**
- The main **Write Feedback** title and helper text are centered at every phone width while retaining the Show Math color treatment.
- Every **Quick Explanation** header now includes a short visible description of what opening the section provides.
- **Calculate and Save** remains the only Quick Explanation open by default.
- The affected Optional Fields and Help illustrations were retaken, and the browser guides, DOCX, and PDF were updated.
- The application calculations, Saved History behavior, workbook formulas, and A-M copy order were not changed.

## Spreadsheet compatibility

A previously uploaded v252 Google Sheets spreadsheet remains usable with StepCat v252.1. Replacing a working copy is optional.

The included `StepCat_Blank_Profitability_Analysis_Template_v252.1.xlsx` is unchanged from R8 and keeps the same A-M paste workflow and calculation/report sheets. Its reorganized Instructions sheet and refreshed visual formatting remain included for clarity.

## Included files

- `index.html` - StepCat v252.1 R9 app
- `manifest.json` and `service-worker.js` - PWA configuration
- `quick-start-guide.html` - browser Quick Start Guide
- `standalone.html` - Full Documentation
- `StepCat_Quick_Start_Guide_v252.1.pdf` - illustrated PDF guide
- `StepCat_Quick_Start_Guide_v252.1.docx` - editable guide
- `StepCat_Blank_Profitability_Analysis_Template_v252.1.xlsx` - Google Sheets workbook template
- `V252_1_RELEASE_NOTES.txt` - detailed changes
- `V252_1_TESTING_CHECKLIST.txt` - remaining hosted-device checks
- `V252_1_RELEASE_QA.txt` - completed package checks and limits
- `UPLOAD_INSTRUCTIONS.txt` - GitHub/Netlify deployment steps
- `images/` - documentation illustrations

## Four-step workflow

1. Choose Estimate or Finalized - Step 1.
2. Confirm Member or Non-Member - Step 2.
3. Complete Game Entry - Step 3.
4. Calculate Result and save - Step 4.

## Repository icons

Keep the seven existing StepCat icon PNG files in the GitHub repository. This package deliberately does not duplicate them.

## Publishing status

R9 is ready for a hosted-device test. Do not call it the final production release until the checks in `V252_1_TESTING_CHECKLIST.txt` pass on the live Netlify page and installed PWA.
