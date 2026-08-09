# StepCat v253.0 — R41 test build

R41 is the screenshot-ready visual-polish build. It retains the corrected page hierarchy, guide order, semantic formatting, Game Entry, and calculation behavior while resolving the final screenshot observations. Version remains v253.0.

## Main R41 changes

- Hides subsection Continue controls in Show All Fields while retaining them in Guided Sections; Review Entry remains the single next action after the complete form.
- Keeps clearing at the bottom of Game Entry as a smaller, subdued `Clear Game Entry` action under an `Entry actions` label.
- Adds a compact written Result Color Guide beside Saved History and a consolidated Color Guide in built-in Help.
- Defines Saved History outlines consistently: green Profit, amber Draw, red Loss/Disqualified, blue Estimate, and teal Free Game.
- Uses gold/toffee for hierarchy, cream for ordinary copy and values, and result colors only for directly corresponding status labels and outlines.
- Ensures every color meaning is also written in text and never depends on color alone.
- Locks page scrolling behind dialogs so underlying text cannot drift while Move Existing Records or another modal is open.
- Renames the footer action to `Open Guides & Help`.
- Gives `Browser Install Instructions` a complementary mahogany-brown treatment and keeps `Hide This Prompt` as a compact raised dismissal.
- Keeps Game Entry subsection status pills in their own centered row so they cannot overlap titles or helper text.
- Makes subsection status content-based—Locked, Not Started, In Progress, or Complete—so layout and drawer toggles cannot change it.
- Gives yellow and green information panels one continuous dimensional edge on all four sides, distinguishes Hide This Prompt with charcoal brown, and consolidates expansion controls.
- Reserves a separate control column in Help disclosures so long titles and descriptions cannot run beneath the plus/minus buttons.
- Rebuilds Estimate Tips and Common Fixes as seamless inset disclosures instead of layered header strips.
- Centers the What’s New heading precisely, compacts Step 4, and removes redundant progression wording from Calculation Information.
- Makes Continue Editing return to Game Entry while the individual Edit links continue to return to their exact subsection.
- Replaces stacked Saved History color bands with one continuous result-colored outline.
- Ensures the header Help and Settings controls paint on initial load, page restoration, and return from either panel.
- Limits What’s New to exactly five major updates.
- Centers Spreadsheet Copy Help and removes the dark title strip behind its label.
- Places What’s New before installation and uses a coordinated orange, mahogany, and dark-brown installation action group.
- Keeps locked Game Entry centered and geometrically consistent with its unlocked drawer header.
- Reduces competing gold in Quick Start and Full Documentation; body text and captions now use cream/muted beige, while subsection headings use restrained toffee.
- Shows only `StepCat v253.0 · R41` in the footer.
- Includes `R41_SCREENSHOT_CAPTURE_PLAN_2026-08-09.txt` with the exact 16-shot capture sequence for the final illustrated documentation pass.
- Reduces Install StepCat to a compact single-row prompt; detailed methods remain behind its information button and in Help.
- Moves Write Feedback, Help access, `StepCat v253.0`, and the Independent Project notice into a quiet footer.
- Gives the Move Existing Records × control the same raised toffee/brown depth as other secondary buttons.
- Reorders and consolidates the Quick Start Guide into 11 task-sequenced sections.
- Reorders and consolidates Full Documentation into 16 reference chapters following the app-to-workbook workflow.
- Standardizes labeled Information, Tip, Warning, and Success callouts so color is reinforced by text and border treatment.
- Updates What’s New to summarize the major four-step workflow, Game Entry, validation, Saved History, Help, and workbook changes made during the rebuild.
- Changes the partially open Quick Explanations control to `Expand Remaining Explanations`; expanding scrolls to the first newly opened topic so the result is visible.
- Clarifies Guided Entry colors, cross-device records, forgotten-game row insertion, Estimate Tips, and the scope of Restore Defaults.
- Reorganizes Quick Start controls and adds arrow-backed, light-text navigation in both HTML guides.
- Gives Help Topic buttons a lighter toffee/orange secondary treatment that remains distinct from primary orange actions.
- Moves Notes and Copied Date Format into Game Details and removes the unnecessary Optional Details subsection.
- Routes Estimates directly from Calculation Information to Review; Finalized entries continue through Final Result to Review.
- Compacts the locked and open Game Entry headers, restores the yellow helper rule, and reduces the gap before the first field.
- Removes the double-layer field information circles caused by competing legacy styles.
- Replaces the former drawer-like Install StepCat slab with a smaller, visually subordinate prompt.
- Reorganizes workbook guidance into copying, direct workbook use, spreadsheet apps/devices, and genuine special cases/column notes.
- Includes `R41_TEST_EXAMPLES_IN_SCREEN_ORDER.txt` with six fully tested examples arranged in the exact order shown on screen.
- Replaces the action-style Show All Fields button with a two-position `Guided Sections | Show All Fields` segmented switch.
- Gives each layout its own selected state and explanatory text while preserving all entered values during switching.
- Replaces the heavy Game Entry lock treatment with the normal warm-brown header and a restrained `Locked` status pill.
- Keeps the Game Entry body truly closed and inactive until Entry Mode and Membership Type are confirmed.
- Leaves Saved History and other available drawers with ordinary `+`/`−` disclosure controls so collapsed and unavailable states are not confused.
- Uses the consistently capitalized `Install StepCat Information` heading in the installation information dialog.
- Adds bottom breathing room beneath the Help Topics buttons so the last topic no longer rests against the drawer edge.
- Right-aligns the Remember Entry Mode information control to match the other Settings rows.

- Rebuilds the correction from the supplied R23 package instead of stacking changes on the rejected build.
- Lets Game Details, Calculation Information, and Final Result close and reopen in Guided Entry; Show All Fields also permits independent subsection closing.
- Replaces the fragile Disqualified label/checkbox overlay with a native button switch and verified two-way state synchronization.
- Keeps Game Entry genuinely closed and inactive until Entry Mode and Membership Type are confirmed.
- Removes the conflicting subsection status/button overlay and centers field badges and labels.
- Restyles information controls as restrained 28 px visible circles inside accessible 44 px touch targets.
- Rebalances the Install StepCat panel and places its information control at the right edge.
- Reduces the oversized Clear Entry Fields action, restores normal Notes typography, removes the Step 4 badge-line collision, contains Help Topic buttons, and removes the Spreadsheet Copy Help appendage band.

- Consolidates the Independent Project notice into the footer so the opening page reaches the workflow sooner.
- Removes the duplicate Independent Project notice from What’s New.
- Keeps Write Feedback available in the footer, Settings, and Help without a detached main-page slab.
- Keeps Help/Settings submenu and disclosure controls in the brown/toffee secondary family while major actions remain orange.
- Reworks Contact & Feedback into a composed Help section rather than a loose final button.
- Replaces separate Expand All and Collapse All controls with one state-aware toggle.
- Makes the Help workflow mirror the same four numbered steps shown on the main page; clear/copy actions are no longer presented as extra workflow steps.
- Capitalizes Guided Entry when it names the StepCat feature. Google’s own “Make a copy” command remains in Google’s displayed capitalization.
- Makes Move your records more noticeable with a small filled white arrowhead and no arrow shaft.
- Presents Guided Sections and Show All Fields as equal layout choices rather than an action and its reverse label.
- Streamlines Step 3 Continue buttons so they guide progression without dominating each subsection.
- Tightens Game Entry header, badge, helper, status, and subsection spacing for a more uniform vertical rhythm.
- Clarifies that Show Math’s live example is driven automatically by Gross Pot and Eligible Players entered in Step 3.
- Preserves the calm viewport behavior, four-step structure, live validation guidance, raised outcome cards, and save/undo behavior.

## Testing

Extract the ZIP into a new folder and open `index.html`. R41 uses isolated browser-storage keys and a new service-worker cache so earlier test data does not determine the initial state.

Use `R41_SCREENSHOT_VERIFICATION_LIST_2026-08-09.txt` for the focused on-device review. Automated DOM interaction tests are included in the QA record; a real Chromium binary could not be downloaded in this workspace, so final phone/Chrome visual acceptance remains an explicit test-package step. The included DOCX, PDF, and existing guide images remain pre-recapture references until the R41 interface is approved.
