# StepCat Calculator v250.1

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, PWA installation, and the six-sheet Profitability Analysis workbook.

## v250.1 Maintenance Correction

The native Google Sheets Game Records table now permits calculated columns N, O, and T to return either numbers or the intentional text `N/A`. This removes false red validation markers while preserving formulas, formatting, inserted-row inheritance, and profitability calculations.

## Quick workflow

1. Choose **Estimate** or **Finalized**.
2. Confirm **Member** or **Non-Member**.
3. Enter the record and calculation details.
4. Tap **Calculate & Save**.
5. Tap **Copy This Sheet Row** and paste into the first empty **Game Records** cell in column A.

## Illustrated app workflow

<table>
<tr>
<td align="center" width="50%"><img src="images/01-game-record-information.jpg" alt="Game and record information"><br><strong>Game and record information</strong></td>
<td align="center" width="50%"><img src="images/03-filled-record-details.jpg" alt="Completed record details"><br><strong>Completed record details</strong></td>
</tr>
<tr>
<td align="center"><img src="images/02-membership-confirmation.jpg" alt="Membership confirmation"><br><strong>Confirm Member or Non-Member</strong></td>
<td align="center"><img src="images/04-calculation-information.jpg" alt="Calculation information"><br><strong>Enter calculation information</strong></td>
</tr>
<tr>
<td align="center"><img src="images/05-final-earned-requirement.jpg" alt="Final Earned requirement"><br><strong>Final Earned is required in Finalized mode</strong></td>
<td align="center"><img src="images/07-final-earned-entered.jpg" alt="Final Earned entered"><br><strong>Enter the official Final Earned amount</strong></td>
</tr>
<tr>
<td align="center"><img src="images/06-notes-field.jpg" alt="Notes field"><br><strong>Use Notes for cash-and-points details</strong></td>
<td align="center"><img src="images/08-calculate-and-save.jpg" alt="Calculate and Save"><br><strong>Calculate and save the record</strong></td>
</tr>
<tr>
<td align="center"><img src="images/09-newest-saved-result.jpg" alt="Newest Saved History result"><br><strong>Newest Saved History result</strong></td>
<td align="center"><img src="images/10-saved-history-card.jpg" alt="Saved History card"><br><strong>Full Saved History card</strong></td>
</tr>
<tr>
<td align="center"><img src="images/11-copy-sheet-row.jpg" alt="Copy workbook row"><br><strong>Copy the workbook row</strong></td>
<td align="center"><img src="images/12-sheet-row-copied.jpg" alt="Sheet row copied"><br><strong>Sheet row copied</strong></td>
</tr>
</table>


## Google Sheets Workbook

[**Make a StepCat Google Sheets Copy**](https://docs.google.com/spreadsheets/d/1STrfkd-GI7LL8BBIaPv6v3YtSv4oQKqP8LL_GvDmTj4/copy)

On mobile, choose **Make a copy**. Do not choose **Save As**—no file format is required. My Drive is the default destination; users may choose another Drive folder before tapping **OK**. If Google asks which account to use, select the account where the copy should be stored. Each user sees only accounts already signed in on their own device. If the template opens in the Sheets app rather than showing the copy prompt, use the three-dot menu and choose **Make a copy**.

![Privacy-safe Google Sheets copy example](images/13-google-sheets-copy-privacy-examples.jpg)

*Privacy-safe example: the visible folders and files are generic placeholders. Each user sees their own Google Drive content.*

A free Google account is required to save a copy. The Google Sheets app is recommended for convenient mobile editing. Browser use may also work but is less convenient; the Google Drive app is optional.

## Workbook workflow

<p align="center"><img src="images/13-workbook-instructions.jpg" alt="Upper Workbook Instructions"><br><strong>Main workflow, Record Review note, and result-color key</strong></p>

<p align="center"><img src="images/13-workbook-instructions-lower.jpg" alt="Lower Workbook Instructions"><br><strong>Carryover, calculations, forgotten-game insertion, fallback, and migration</strong></p>

<p align="center"><img src="images/14-game-records-top.jpg" alt="Game Records input columns"><br><strong>Editable input columns A–M</strong></p>

<p align="center"><img src="images/15-game-records-scrolled.jpg" alt="Game Records result colors"><br><strong>Profit, Draw, Free Game, Subscription, and Disqualified colors</strong></p>

<p align="center"><img src="images/16-formula-columns.jpg" alt="Formula columns N through Z"><br><strong>Formula columns N–Z calculate automatically</strong></p>

<p align="center"><img src="images/17-record-review-totals.jpg" alt="Formula-driven Record Review"><br><strong>Record Review is formula-driven and must not be edited directly</strong></p>

<p align="center"><img src="images/20-summary.jpg" alt="Summary dashboard"><br><strong>Summary totals and exact counts</strong></p>

<p align="center"><img src="images/21-summary-tally.jpg" alt="Games by Result exact tally"><br><strong>Games by Result exact tally</strong></p>

<p align="center"><img src="images/22-game-comparisons.jpg" alt="Game Comparisons"><br><strong>Paid Game and Free Game comparisons</strong></p>

<p align="center"><img src="images/23-best-results.jpg" alt="Best Results"><br><strong>Best Results live reference table</strong></p>

## Workbook status

The workbook distinguishes:

- **Free Game — completed challenge/chips**
- **Subscription — membership charge only**

Rows **1–4** in Game Records remain compact and frozen. Enter or paste only in **A–M**. Formula columns **N–Z** calculate automatically and should not be overwritten. Record Review includes a totals panel at the right. The public workbook is now a **native Google Sheet**. Insert a row above or below from inside the Game Records table and Google Sheets automatically extends formulas, dropdowns, formatting, and visible cell borders.

Summary and Game Comparisons use numerical tables rather than charts for easier mobile viewing and exact verification.

## v250.1 workbook insertion and missing-value update — July 27, 2026

v250.1 updates the workbook and its instructions so direct spreadsheet entry is safer and clearer:

- **Free Games:** Adjusted Pot / Chips and Estimated Earned / Chips display `N/A` when the values required for an estimate are unavailable.
- **Disqualified records:** existing disqualified games display `$0.00` in Final Earned / Chips instead of appearing incomplete.
- **Forgotten games in Google Sheets:** select a cell inside Game Records near the correct chronological position, then insert a row above or below. Enter or paste A–M; N–Z are created automatically.
- **Formula check:** Record Review flags a populated row if an N–Z formula is missing. Undo and reinsert the row from inside the table if this occurs.
- **Direct spreadsheet updates:** later changes made in A–M recalculate the record when its N–Z formulas are intact.

The public workbook is distributed through a Google Sheets copy link rather than an Excel download. Each user receives an independent native Google Sheet in their own Google account. The private Personal Master is never included in the public repository.

## Migration requirements

Migration to v250.1 is recommended to adopt native Google Sheets table-row insertion, Free Game N/A safeguards, visible $0.00 disqualification values, missing-formula warnings, and the finalized frozen-row layout.

First compare the older workbook’s **A–M headers** with v250.1. When the order matches, copy only populated **Game Records A–M** cells. Paste values only into **A5** of a new unused v250.1 copy, or into the next available A–M row if the v250.1 copy already contains records. Do not copy whole sheets, headers, Record Review, or formula columns **N–Z**. Keep the older workbook as a backup until records and totals are verified.



### Feedback workflow screenshots

<table>
<tr>
<td align="center" valign="top" width="50%"><img src="images/18-feedback-dialog.jpg" alt="StepCat feedback dialog" width="520"><br><strong>Enter a question, issue, or suggestion</strong></td>
<td align="center" valign="top" width="50%"><img src="images/19-feedback-email-prepared.jpg" alt="Prepared feedback email with generic addresses" width="520"><br><strong>Email opens with the message prepared</strong></td>
</tr>
</table>

Open **Help (?)**, scroll to **Guides & Downloads**, and tap **Write Feedback**. The dialog opens over Help. After the email app opens, send the prepared message and return or swipe back to StepCat. The addresses shown above are generic examples; no feedback email address is stored in the workbook.

## Guides, downloads, and feedback

- [Illustrated Quick Start Guide — HTML](quick-start-guide.html)
- [Illustrated Quick Start Guide — PDF](StepCat_Quick_Start_Guide_v250.1.pdf)
- [Editable Quick Start Guide — DOCX](StepCat_Quick_Start_Guide_v250.1.docx)
- [Fully Illustrated Full Documentation](standalone.html)
- [Blank Profitability Analysis Template v250.1 — Excel](StepCat_Blank_Profitability_Analysis_Template_v250.1_FINAL.xlsx)

To send feedback from StepCat, open **Help (?)**, scroll to **Guides & Downloads**, and tap **Write Feedback**. The form opens over Help; StepCat copies the message and opens the device's email app with the recipient and subject prepared.

## Original app icons

The StepCat icon PNG files are deliberately omitted from this upload package. Preserve the existing original no-border icons already stored in the GitHub repository; do not replace or delete them. Upload this package over the existing repository rather than clearing the repository first.

## Public files

- `index.html` — StepCat webpage
- `service-worker.js` — offline cache
- [Make a StepCat Google Sheets Copy](https://docs.google.com/spreadsheets/d/1STrfkd-GI7LL8BBIaPv6v3YtSv4oQKqP8LL_GvDmTj4/copy) — public native workbook
- `README.md` — repository overview and illustrated workflow
- `quick-start-guide.html` — illustrated browser Quick Start Guide
- `StepCat_Quick_Start_Guide_v250.1.pdf` — downloadable illustrated PDF
- `StepCat_Quick_Start_Guide_v250.1.docx` — editable downloadable guide
- `standalone.html` — fully illustrated full documentation with all 20 current screenshots
- `images/` — current v250.1 app and workbook screenshots
- `StepCat_Blank_Profitability_Analysis_Template_v250.1_FINAL.xlsx` — blank Excel-compatible workbook; personal records are not included
- `UPLOAD_INSTRUCTIONS.txt` — replacement instructions

The Personal Master workbook is private and must not be uploaded to a public repository.
