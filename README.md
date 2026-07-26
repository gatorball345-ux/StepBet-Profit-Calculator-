# StepCat Calculator v246.3.6

StepCat is a mobile-first payout calculator and recordkeeping tool for projected and finalized challenge results. It supports Member and Non-Member calculations, Saved History, workbook-ready A–M row copying, Free Games, disqualified records, Notes, PWA installation, and the six-sheet Profitability Analysis workbook.

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

## Workbook workflow

<p align="center"><img src="images/13-workbook-instructions.jpg" alt="Workbook instructions"><br><strong>Workbook instructions and entry guidance</strong></p>

<p align="center"><img src="images/14-game-records-top.jpg" alt="Compact Game Records headings"><br><strong>Compact frozen headings in Game Records</strong></p>

<p align="center"><img src="images/15-game-records-scrolled.jpg" alt="Frozen headings while scrolling"><br><strong>Frozen headings remain visible while scrolling</strong></p>

<p align="center"><img src="images/16-formula-columns.jpg" alt="Formula columns N through Z"><br><strong>Formula columns N–Z calculate automatically</strong></p>

<p align="center"><img src="images/17-record-review-totals.jpg" alt="Record Review totals"><br><strong>Record Review checks fields and summarizes results</strong></p>

## Workbook status

The workbook distinguishes:

- **Free Game — completed challenge/chips**
- **Subscription — membership charge only**

Rows **1–4** in Game Records remain compact and frozen. Enter or paste only in **A–M**; formula columns **N–Z** calculate automatically. Record Review totals are positioned below the frozen-pane divider so they remain readable while scrolling.

Summary and Game Comparisons use numerical tables rather than charts for easier mobile viewing and exact verification.

## v246.3.6 Record Review compatibility correction

The webpage calculation and copied A–M row structure are unchanged. The workbook uses standard row-by-row `INDEX`/`MATCH` formulas for reliable use in Microsoft Excel and Google Sheets.

The correction preserves the intended Record Review behavior:

- Subscription records are excluded without leaving blank rows between games.
- Game IDs remain continuously numbered as `G-0001`, `G-0002`, `G-0003`, and so forth.
- Existing non-subscription records remain visible in Google Sheets.
- Wrapped Game Name, review guidance, and Notes text remain readable.

No payout, Profit/Draw, loss, ROI, membership, Free Game, or copied-row calculation logic changed. v246.2 remains the substantive calculation baseline.

## Migration requirements

Users may continue using an older workbook for its established calculations, but migration is required to adopt the v246.3.6 Record Review compatibility correction and final frozen-row layout.

Copy only populated **Game Records A5:M** cells from the older workbook. In v246.3.6, select **A5** and paste, preferably as values only. Do not copy whole sheets, headers, Record Review, or formula columns **N–Z**. Keep the older workbook as a backup until records and totals are verified.



### Feedback workflow screenshots

<table>
<tr>
<td align="center" width="50%"><img src="images/18-feedback-dialog.jpg" alt="StepCat feedback dialog"><br><strong>Enter a question, issue, or suggestion</strong></td>
<td align="center" width="50%"><img src="images/19-feedback-email-prepared.jpg" alt="Prepared feedback email with generic addresses"><br><strong>Email opens with the message prepared</strong></td>
</tr>
</table>

Open **Help (?)**, scroll to **Guides & Downloads**, and tap **Write Feedback**. The dialog opens over Help. After the email app opens, send the prepared message and return or swipe back to StepCat. The addresses shown above are generic examples; no feedback email address is stored in the workbook.

## Guides, downloads, and feedback

- [Illustrated Quick Start Guide — HTML](quick-start-guide.html)
- [Illustrated Quick Start Guide — PDF](StepCat_Quick_Start_Guide_v246.3.6.pdf)
- [Editable Quick Start Guide — DOCX](StepCat_Quick_Start_Guide_v246.3.6.docx)
- [Full Documentation](standalone.html)

To send feedback from StepCat, open **Help (?)**, scroll to **Guides & Downloads**, and tap **Write Feedback**. The form opens over Help; StepCat copies the message and opens the device's email app with the recipient and subject prepared.

## Public files

- `index.html` — StepCat webpage
- `service-worker.js` — offline cache
- `StepCat_Blank_Profitability_Analysis_Template.xlsx` — public workbook
- `README.md` — repository overview and illustrated workflow
- `quick-start-guide.html` — illustrated browser Quick Start Guide
- `StepCat_Quick_Start_Guide_v246.3.6.pdf` — downloadable illustrated PDF
- `StepCat_Quick_Start_Guide_v246.3.6.docx` — editable downloadable guide
- `standalone.html` — full documentation
- `images/` — current app and workbook screenshots
