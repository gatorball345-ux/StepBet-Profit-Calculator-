# StepCat Calculator v251.1

StepCat calculates Estimate projections and records Finalized outcomes, keeps Saved History locally, and copies exact A-M rows into the matching profitability workbook.

## What changed in v251.1

v251.1 reorganizes the app around the actual workflow: choose **Entry Mode**, confirm **Membership Type**, enter the required calculation fields, and open optional details only when needed. It adds **Start New Entry**, contextual information controls, remembered-choice settings, clearer validation, and a state-aware disqualification control.

Estimate cards now include **Finalize This Estimate**. The finalization dialog updates the existing Saved History record rather than adding a duplicate. In the workbook, paste the finalized A-M values over that game's original A-M cells.

The matched workbook retains StepCat's brown, amber, orange, cream, gold, green, and blue visual language. Editable A-M cells remain pale gold; formula N-Z cells remain blue-gray; result colors retain their semantic meaning. Header clipping, instruction-row consistency, result-chart labels, and no-data report messages were also corrected.

## Corrected rebuild highlights

This package adds protected Start New Entry and Clear Entry actions, completed-draft cleanup, permanent non-editable SC Record IDs, Free Game fee validation, targeted Estimate-finalization scrolling, startup-only drawer defaults, Haptic Feedback reset through Restore Defaults, individual-delete Undo, and matching Record Review warnings. Core calculation and A-M copying behavior are retained.

## Release status

This package is local until deliberately uploaded. The version currently published on GitHub remains available to users in the meantime.

## Included files

- `index.html` - StepCat v251.1 app
- `manifest.json` and `service-worker.js` - PWA configuration
- `quick-start-guide.html` - browser Quick Start Guide
- `standalone.html` - Full Documentation
- `StepCat_Quick_Start_Guide_v251.1.pdf` - illustrated PDF guide
- `StepCat_Quick_Start_Guide_v251.1.docx` - editable guide
- `StepCat_Blank_Profitability_Analysis_Template_v251.1.xlsx` - matched blank workbook
- `V251.1_RELEASE_NOTES.txt` - detailed changes
- `V251.1_TESTING_CHECKLIST.txt` - focused regression tests
- `UPLOAD_INSTRUCTIONS.txt` - GitHub deployment and migration steps
- `images/` - documentation screenshots

## Basic workflow

1. Choose Estimate or Finalized.
2. Confirm Member or Non-Member.
3. Enter the required values.
4. Calculate & Save.
5. Copy This Sheet Row into the first unused Game Records column-A cell.
6. When an Estimate ends, use Finalize This Estimate and replace the same workbook row.

## Workbook safety

Enter or paste only in Game Records columns A-M. Columns N-Z are formulas. Keep the older workbook as a backup and verify Record Review and report totals after migration.

## Publishing

Do not replace the live GitHub files until the focused v251.1 regression checklist passes. After deployment, verify hosted installation, service-worker updating, downloads, feedback, and workbook copying.
