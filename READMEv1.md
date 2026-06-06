# StepCat Calculator

StepCat Calculator is a mobile-friendly calculator for estimating StepBet-style game payouts, profit, ROI, and export-ready history logs.

The app is designed around three simple areas:

- **Inputs** — temporary workspace for entering one calculation
- **Totals** — current-session results
- **History** — saved master log used for Google Sheets export

---

## Features

### Core Calculator

StepCat calculates:

- Estimated payout
- Profit or loss
- ROI percentage

Required inputs:

- **Total Pot**
- **Entry Fee**
- **Prospects**

Optional inputs:

- **Game Name**
- **Game Start Date**
- **Game End Date**

---

## Member vs Non-Member Mode

The app includes a toggle for game type.

### Non-Member

Non-member mode applies a 15% platform fee.

```text
Payout = (Total Pot / Prospects) × 0.85
```

### Member

Member mode uses the full payout share.

```text
Payout = Total Pot / Prospects
```

The selected mode is saved as a preference and remains selected after reopening the app.

---

## Inputs

Inputs are treated as a temporary workspace.

The app does **not** automatically refill inputs when reopened. This helps prevent accidental calculations using old values.

However, the app remembers the most recent input values in the background.

### Restore Inputs

Use **Restore Inputs** to bring back the last saved input values.

This can be useful if:

- You accidentally clear inputs
- You close and reopen the app
- You want to reuse a previous setup

### Clear Inputs

Use **Clear Inputs** to empty the input fields.

This clears:

- Game Name
- Start Date
- End Date
- Total Pot
- Entry Fee
- Prospects

---

## Totals

Totals are the current-session working results.

Each calculation is added to Totals.

Totals are useful for reviewing recent calculations during the current session.

### Clear Totals

Use **Clear Totals** to clear the current Totals section.

Clearing Totals does **not** clear History.

---

## History

History is the master saved log.

Each calculation is automatically added to History.

History is saved locally in the browser and remains available after closing or refreshing the app.

### Clear History

Use **Clear History** to erase the saved History log.

Because History is persistent, the app asks for confirmation before clearing it.

---

## Date Format

The app supports three display formats:

- **MM-DD-YYYY**
- **DD-MM-YYYY**
- **YYYY-MM-DD**

The selected date format affects how dates appear in Totals, History, and Google Sheets copy output.

Changing the date format updates existing Totals and History entries immediately.

The selected date format is saved as a preference.

---

## Google Sheets Export

StepCat supports copying History data for Google Sheets.

### Copy Full History

Use **Copy Full History** when setting up a new Sheet or replacing an existing Sheet.

This copies:

- Header row
- All saved History rows

Paste into Google Sheets starting at cell A1.

### Copy Latest Row

Use **Copy Latest Row** when adding only the newest calculation to an existing Sheet.

This copies:

- The most recent History entry only
- No headers

Paste into the next empty row of your active Google Sheet.

---

## Google Sheets Columns

Copied History data includes:

```text
Game Name
Game Type
Start Date
End Date
Total Pot
Entry Fee
Prospects
Payout
Profit
ROI
```

Currency values are copied with:

- Dollar signs
- Commas
- Two decimal places

Example:

```text
$69,800.00
$100.00
-$3.37
```

ROI is copied with one decimal place.

Example:

```text
13.7%
-3.4%
```

---

## Why Some Values Paste as Text

Google Sheets often tries to automatically detect numbers, percentages, and currency.

To preserve formatting, StepCat copies currency and ROI values in a way that tells Google Sheets to keep them visually formatted.

This helps prevent Google Sheets from changing:

```text
13.7%
```

into:

```text
13.70%
```

or removing dollar signs from currency values.

---

## Recommended Workflow

### Starting a New Sheet

1. Enter game information.
2. Tap **Calculate**.
3. Repeat for as many games as needed.
4. Tap **Copy Full History**.
5. Open Google Sheets.
6. Select cell A1.
7. Paste.

### Adding One New Entry to an Existing Sheet

1. Open StepCat.
2. Enter the new game information.
3. Tap **Calculate**.
4. Tap **Copy Latest Row**.
5. Open the existing Google Sheet.
6. Select the next empty row.
7. Paste.

---

## Validation

The app checks required fields before calculating.

It will alert the user if:

- Total Pot is missing
- Entry Fee is missing
- Prospects is missing
- Any required value is not a number
- Prospects is zero
- Entry Fee is zero

Game Name and dates are optional.

---

## Data Storage

StepCat uses local browser storage.

The app saves:

- History
- Date format preference
- Member / Non-Member preference
- Last saved input values for Restore Inputs

The app does not use a backend server.

Data remains on the user’s device/browser unless cleared.

---

## FAQ

### Do I need to enter a game name?

No. Game Name is optional.

If no name is entered, the app labels the result based on game type, such as Member Game or Non-Member Game.

---

### Do I need to enter start and end dates?

No. Dates are optional.

If dates are entered, they appear in Totals, History, and Google Sheets copy output.

---

### What is Prospects?

Prospects is the number of projected winners or players expected to receive a payout.

The app divides the Total Pot by Prospects to estimate payout.

---

### What happens when I clear Totals?

Only the current Totals section is cleared.

History remains saved.

---

### What happens when I clear History?

The saved History log is erased.

Because History is persistent, the app asks for confirmation before clearing it.

---

### Why does History stay after reopening the app?

History is saved locally so users do not lose their export log.

It stays available until manually cleared.

---

### Why do inputs open blank if the app remembers them?

Inputs are treated as temporary workspace.

They open blank to prevent accidental calculations using old data.

Use **Restore Inputs** if you want to bring back the most recent saved input values.

---

### Why are there two copy buttons?

**Copy Full History** is for setting up or replacing a Google Sheet.

**Copy Latest Row** is for adding only the newest calculation to an existing Google Sheet.

---

### Does the app create an Excel file?

No. The current stable version uses clipboard-based Google Sheets export.

This avoids mobile browser download issues and prevents Acode/browser freezes.

---

### Can I still use the copied data in Excel?

Yes. The copied table can usually be pasted into spreadsheet software that supports tabular clipboard data, including Google Sheets and many spreadsheet editors.

---

## Current Limitations

- The app does not currently generate XLSX files.
- Rich formatting in Google Sheets may depend on browser support.
- Copying is clipboard-based rather than file-download-based.
- Inputs are not automatically restored on page load.

---

## Planned / Possible Future Improvements

Possible future upgrades include:

- Profit / Draw / Loss result labeling
- Google Sheets color-coding support
- Better visual polish
- Optional backup/export file system
- Advanced export options
- Full README examples with screenshots
