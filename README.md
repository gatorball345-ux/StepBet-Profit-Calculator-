# StepCat Calculator v240

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, and the six-sheet Profitability Analysis workbook.

## Important workbook update — July 24, 2026

Anyone who downloaded a StepCat workbook before July 24, 2026 should use the current v240 workbook. It contains corrected Draw formulas and the latest reporting, color, and readability updates.

### Moving existing records into v240

1. Open **Game Records** in the older workbook.
2. Copy only populated cells in **A5:M**.
3. Open the v240 workbook, select **A5**, and paste—preferably as values only.
4. Do not copy the entire sheet, header rows, Summary, Game Comparisons, Instructions, or columns **N–Z**.
5. Keep the older workbook as a backup until the transferred records and totals are verified.

## Package contents

- `index.html` — StepCat Calculator v240
- `quick-start-guide.html` — concise action guide
- `standalone.html` — full numbered documentation
- `StepCat_Blank_Profitability_Analysis_Template.xlsx` — current blank workbook used by direct links
- `StepCat_Profitability_Analysis_Personal_Master_2025_2026_v240.xlsx` — personal workbook; do not publish publicly
- `V240_FINAL_CORRECTION_RETEST.txt` — focused final retest
- `V240_CONSOLIDATED_TESTING_INSTRUCTIONS.txt` — full regression reference
- `V240_SCREENSHOT_PLAN_AFTER_PASS.txt` — final screenshot list
- `V240_RELEASE_NOTES.txt` — current release notes
- `STEP_BY_STEP_NEXT_ACTIONS_v240.txt` — testing and deployment sequence
- `manifest.json`, `service-worker.js`, and icon files — install/offline support

## Core calculation rules

- **Member Estimate:** Gross Pot ÷ Eligible Players.
- **Non-Member Estimate:** Gross Pot × 0.85 ÷ Eligible Players.
- **Profit:** returned amount is above Entry Fee.
- **Draw:** a normal returned amount equal to or below Entry Fee; Profit/Loss and ROI are $0.00 and 0.0%.
- **Paid Disqualified:** Final Earned is $0.00 and the full Entry Fee is lost.
- **Free Game:** returned amount is Net Gain; ROI is N/A because Entry Fee is $0.00.
- **Disqualified Free Game:** status is retained with $0.00 monetary loss.

## Saved History and workbook copying

Each **Calculate & Save** action creates one compact Saved History card. Tap **Copy This Sheet Row** to copy the exact A–M workbook row, or use **Copy All Sheet Rows** for all saved records. In Game Records, select the first empty column-A cell and paste. Never overwrite formula columns N–Z.

## v240 highlights

1. Corrected Draw formulas and a prominent July 24 workbook-update notice.
2. Safe A5:M migration guidance for existing workbook users.
3. Consistent workbook wrapping, title sizing, Summary category colors, and Instructions formatting.
4. Compact solid Saved History cards with direct row copying.
5. Added a compact main-page Install StepCat strip with Install and Not now; Add to Home Screen remains in Help, and the Membership Type selector stays dim until actively confirmed for each entry.

## Deployment

Use the public deployment files for GitHub and Netlify. Do not publish the Personal Master workbook, internal testing files, or private screenshots. Replace the older hosted workbook with `StepCat_Blank_Profitability_Analysis_Template.xlsx` so every download points to the corrected v240 material. The stable filename will remain the same for future workbook updates.
