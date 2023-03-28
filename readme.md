# MVP
---
## MVP User Stories
- As a user I want to be able to play picross
  - I want to **_break_** tiles
  - I want to **_fill_** empty tiles
  - I want to **_flag_** tiles that I believe should not be filled
  - I want visual feedback to see what tile my cursor is hovering on, regardless of whether the tile is filled or empty
  - I want to click and drag across a range of tiles in a given column or row to fill or empty
  - I want visual feedback to see the range of tiles I have selected before filling or emptying
  - I want to restart the puzzle when I preform **_an action_** *(button?)*
  - I want to select a different puzzle when I preform **_an action_** *(button?)*
  - I want **_guiding numbers_** that indicate how many consecutive tiles need to be filled for each respective column and row
  - I want to strikethrough guiding numbers that I believe I have been completed for a given row or column
  - I want a modal that gives me instructions about how to play the game when I click a button
- As a user I want an easily viewable timer
  - I want the timer to count up in seconds
  - I want the timer to begin counting when I start the puzzle
  - I want the timer to stop when I have completed the puzzle
  - I want the timer to reset when I select a different puzzle
  - I want to pause the timer
  - I want to resume the timer after it has been paused
<br>
<br>
<br>
# Stretch Goals
---
## Stretch Goal User Stories
<br>
<br>
- Wiring up to a database

- AI generated images
<br>
<br>

# Unanimous Language
---
**_Tile_** - A single square unit which comprises the puzzle board that can be broken, filled, or flagged.

**_Fill_** - A mechanic that allows the player to indicate that a tile(s) is part of the image.

**_Empty_** - A mechanic that allows the player to indicate that a tile(s) is not part of the image. When the game beings, all tiles start "empty".

**_Flag_** - A mechanic that allows the player to mark a tile. A marked tile indicates that a tile is not part of the image, and should not be broken.

**_Guiding Number(s)_** - number(s) written on the sides of the puzzle board, which provide clues to the player on how many tiles in a row or column should be broken and how they should be arranged.