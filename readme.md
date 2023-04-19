# MVP

---

Puzzle object shape:

```json
{
  "title": "string",
  "size": 0,
  "solution": [[], [], []],
  "hint": "string"
}
```

Example:

```json
{
  "title": "Box",
  "size": 10,
  "solution": [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  "hint": "It's just a box"
}
```

<br>
<br>

## MVP User Stories

- ✅ As a user I want to be able to play picross
  - ✅ I want to **_fill_** empty tiles
  - ✅ I want to **_empty_** filled or flagged tiles
  - ✅ I want to **_flag_** tiles that I believe should not be filled
  - ✅ I want visual feedback to see what tile my cursor is hovering on, regardless of whether the tile is filled or empty
  - ✅ I want to click and drag across a range of tiles in a given column or row to fill or empty
  - ✅ I want visual feedback to see the range of tiles I have selected before filling or emptying
  - ✅ I want **_guiding numbers_** that indicate how many consecutive tiles need to be filled for each respective column and row
  - ✅ I want to strikethrough guiding numbers that I believe I have been completed for a given row or column
- ✅ As a user I want an easily viewable timer
  - ✅ I want the timer to count up in seconds
  - ✅ I want the timer to begin counting when I start the puzzle
  - ✅ I want the timer to stop when I have completed the puzzle
  - ✅ I want the timer to reset when I select a different puzzle
  - ✅ I want to pause the timer
  - ✅ I want to resume the timer after it has been paused
- I want a modal that gives me instructions about how to play the game when I click a button
- ✅ I want to see the title of the puzzle once I have completed it
- ✅ I want a button that will provide a hint when I am stuck on the puzzle
- ✅ I want to restart the puzzle when I preform **_an action_** _(button?)_
- ✅ I want to select a different puzzle when I preform **_an action_** _(button?)_

<br>
<br>
<br>

# Stretch Goals

---

## Stretch Goal Brainstorm List

- Dark mode

- Auto-crossout for guide numbers (toggleable?)

  - strict matching to puzzle solution?
  - strict matching to current puzzle progress?

- Hint mechanic:

  - complete row or column or both (user selected?)
  - complete a cell (user selected?)

- Wiring up to a database

- AI generated images

- An undo button

- Display image with color upon completion of the puzzle

- Image encoder (turning image into solution array)

- Gamepad support

- Live count of how many tiles are selected that follows cursor on drag

- Add state management

<br>
<br>
<br>

# Unanimous Language

---

**_Tile_** - A single square unit which comprises the puzzle board that can be broken, filled, or flagged.

**_Fill_** - A mechanic that allows the player to indicate that a tile(s) is part of the image.

**_Empty_** - A mechanic that allows the player to indicate that a tile(s) is not part of the image. When the game beings, all tiles start "empty".

**_Flag_** - A mechanic that allows the player to mark a tile. A marked tile indicates that a tile is not part of the image, and should not be broken.

**_Guiding Number(s)_** - number(s) written on the sides of the puzzle board, which provide clues to the player on how many tiles in a row or column should be broken and how they should be arranged.

<br>
<br>
<br>

# Controls

---

## Tile state controls on click:

```
Empty -> Filled : Left-click
Empty -> Flagged: Right-click
Filled -> Empty: Left-click OR right-click
Filled -> Flagged: Not possible
Flagged -> Empty: Right-click
Flagged -> Filled: Not possible
```

<br />
<br />

## Tile state controls on drag:

### Notation format:

**mouseDownTileState to mouseUpTileStartingState**

```
[mouseDownTileState -> mouseDownTileEndState]
=>(drag)
[Empty -> newState]
=>(drag)
[Filled -> newState]
=>(drag)
[Flagged -> newState]
=>(drag)
[mouseUpTileStartingState -> mouseUpTileEndState]
```

<br />

## Left Click

<details>
<summary> Empty Start </summary>
<br />

**EMPTY to EMPTY**

```
[Empty -> Filled]
=>
[Empty -> Filled]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Empty -> Filled]
```

**EMPTY to FILLED**

```
[Empty -> Filled]
=>
[Empty -> Filled]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Filled -> Filled]
```

**EMPTY to FLAGGED**

```
[Empty -> Filled]
=>
[Empty -> Filled]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Flagged -> Flagged]
```

</details>

<br />

<details>
<summary> Filled Start </summary>
<br />

**FILLED to EMPTY**

```
[Filled -> Empty]
=>
[Empty -> Empty]
=>
[Filled -> Empty]
=>
[Flagged -> Flagged]
=>
[Empty -> Empty]
```

**FILLED to FILLED**

```
[Filled -> Empty]
=>
[Empty -> Empty]
=>
[Filled -> Empty]
=>
[Flagged -> Flagged]
=>
[Filled -> Empty]
```

**FILLED to FLAGGED**

```
[Filled -> Empty]
=>
[Empty -> Empty]
=>
[Filled -> Empty]
=>
[Flagged -> Flagged]
=>
[Flagged -> Flagged]
```

</details>

<br />

<details>
<summary> Flagged Start </summary>
<br />

**FLAGGED to EMPTY**

```
[Flagged -> Flagged]
=>
[Empty -> Filled]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Empty -> Filled]
```

**FLAGGED to FILLED**

```
[Flagged -> Flagged]
=>
[Empty -> Filled]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Filled -> Filled]
```

**FLAGGED to FLAGGED**

```
[Flagged -> Flagged]
=>
[Empty -> Filled]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Flagged -> Flagged]
```

</details>

## Right Click

<details>
<summary> Empty Start </summary>
<br />

**EMPTY to EMPTY**

```
[Empty -> Flagged]
=>
[Empty -> Flagged]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Empty -> Flagged]
```

**EMPTY to FILLED**

```
[Empty -> Flagged]
=>
[Empty -> Flagged]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Filled -> Filled]
```

**EMPTY to FLAGGED**

```
[Empty -> Flagged]
=>
[Empty -> Flagged]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Flagged -> Flagged]
```

</details>

<br />

<details>
<summary> Filled Start </summary>
<br />

**FILLED to EMPTY**

```
[Filled -> Filled]
=>
[Empty -> Flagged]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Empty -> Flagged]
```

**FILLED to FILLED**

```
[Filled -> Filled]
=>
[Empty -> Flagged]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Filled -> Filled]
```

**FILLED to FLAGGED**

```
[Filled -> Filled]
=>
[Empty -> Flagged]
=>
[Filled -> Filled]
=>
[Flagged -> Flagged]
=>
[Flagged -> Flagged]
```

</details>

<br />

<details>
<summary> Flagged Start </summary>
<br />

**FLAGGED to EMPTY**

```
[Flagged -> Empty]
=>
[Empty -> Empty]
=>
[Filled -> Filled]
=>
[Flagged -> Empty]
=>
[Empty -> Empty]
```

**FLAGGED to FILLED**

```
[Flagged -> Empty]
=>
[Empty -> Empty]
=>
[Filled -> Filled]
=>
[Flagged -> Empty]
=>
[Filled -> Filled]
```

**FLAGGED to FLAGGED**

```
[Flagged -> Empty]
=>
[Empty -> Empty]
=>
[Filled -> Filled]
=>
[Flagged -> Empty]
=>
[Flagged -> Empty]
```

</details>
