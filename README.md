# StepCat v253.0

StepCat is a mobile-forward browser/PWA payout calculator with a Google Sheets record and reporting workflow.

## Current spreadsheet

As of **August 4, 2026**, use **v253.0**. It corrects the missing-calculation problem that could occur when a whole Game Records row was inserted later, such as when adding a forgotten game.

Choose **Create My Google Sheets Copy**. Enter or paste records in **A–M**; protected expanding formulas calculate **N–Z** automatically.


## Local-first and cross-device use

StepCat stores unfinished fields, settings, and Saved History in the current browser/device. Those local items do **not** automatically transfer to another phone, tablet, computer, browser, or browser profile.

The Google Sheet is the permanent cross-device record. Open the same Sheet through the same Google account on any device. Users may either:

- calculate in StepCat and paste the prepared **A–M** row, or
- maintain the workbook directly by entering **A–M** in Google Sheets.

In either workflow, protected expanding formulas calculate **N–Z** automatically. The workbook is self-contained; StepCat is an optional guided-entry and row-copying companion.

## Moving older records

Copy populated **Game Records A5:M** cells into v253.0 **A5**.

- Computer: use **Paste special → Values only**.
- Phone or tablet: regular Paste is acceptable when only A–M are copied. Minor appearance differences can be corrected later.
- Do not copy N–Z, headers, entire rows, entire sheets, reports, or charts.

Before deployment, set the public blank Google Sheet to **Anyone with the link → Viewer**.

StepCat is an independent calculator and record-keeping tool. It is not officially affiliated with, endorsed by, or sponsored by any step challenge platform.
