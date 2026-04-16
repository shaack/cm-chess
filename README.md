# cm-chess

A chess engine wrapper inspired by [chess.js](https://github.com/jhlywa/chess.js), with first-class support for:

- **Variations** — full tree-structured move history (not just a linear list)
- **PGN import/export** — header tags, NAGs, annotations and comments
- **Chess960 (Fischer Random)** — including proper O-O / O-O-O castling
- **Sloppy SAN** — lenient parsing of common notation mistakes
- **Observers** — subscribe to legal/illegal/undo events

It powers the online chess server [chessmail.de](https://www.chessmail.de).

## Install

```bash
npm install cm-chess
```

## Quick start

```js
import { Chess, COLOR, GAME_VARIANT } from "cm-chess"

const chess = new Chess()
chess.move("e4")
chess.move("e5")
chess.move("Nf3")

console.log(chess.fen())        // position after last move
console.log(chess.turn())       // "b"
console.log(chess.history())    // array of move nodes
console.log(chess.renderPgn())  // PGN string
```

## Run the tests

A hosted runner is available at **<https://shaack.com/projekte/cm-chess/test/>**.
Locally, open [`test/index.html`](test/index.html) in a browser.

---

## Constructor

`new Chess(props)` — `props` is an optional object:

| Option        | Type                      | Default       | Description                                                    |
|---------------|---------------------------|---------------|----------------------------------------------------------------|
| `fen`         | `string`                  | start FEN     | Load from a FEN.                                               |
| `pgn`         | `string`                  | —             | Load from a PGN (overrides `fen`).                             |
| `gameVariant` | `"standard"` / `"chess960"` | `"standard"`  | Variant. Required for Chess960 castling to work.               |
| `sloppy`      | `boolean`                 | `true`        | Lenient SAN parsing (e.g. `Rc8c7`, `Rc8-c7`).                  |

```js
new Chess()
new Chess({ fen: "4k3/pppppppp/8/8/8/8/PPPPPPPP/4K3 w - - 0 1" })
new Chess({ pgn: "1. e4 e5 2. Nf3" })
new Chess({ gameVariant: GAME_VARIANT.chess960 })
```

---

## Making moves

### `move(san, previousMove?, sloppy?)`

Apply a move in SAN. Returns the created move node, or `null` if illegal.

```js
chess.move("e4")                         // simple move
chess.move("gxh8=Q")                     // promotion
chess.move("dxc6")                       // en passant (flags include 'e')
chess.move("O-O")                        // castling, letter O (not zero)
chess.move("Nbd7", previousMove)         // add a variation branching from previousMove
```

### `validateMove(san, previousMove?, sloppy?)`

Check whether a move would be legal without making it. Returns a move object or `null`.

### `moves(options?, move?)`

Return all legal moves from a given position (defaults to the last move).

```js
chess.moves()                             // all legal SAN strings
chess.moves({ square: "e2" })             // only moves from e2
chess.moves({ piece: "n" })               // only knight moves
chess.moves({ verbose: true })            // detailed move objects
```

### `undo(move?)`

Remove a move and everything after it from its variation. Defaults to the last move.

---

## Inspecting state

| Method                    | Returns                                                       |
|---------------------------|---------------------------------------------------------------|
| `fen(move?)`              | FEN of the given move, or the last move                       |
| `setUpFen()`              | Starting FEN (from PGN header or default start)               |
| `turn(move?)`             | `"w"` or `"b"`                                                |
| `piece(square, move?)`    | `{ type, color }` or `null`                                   |
| `pieces(type?, color?, move?)` | array of pieces with `square`, `type`, `color`           |
| `history()`               | array of move nodes (main line)                               |
| `lastMove()`              | last move node or `null`                                      |
| `plyCount()`              | number of plies played                                        |
| `fenOfPly(n)`             | FEN after the n-th ply (`fenOfPly(0)` returns the setup FEN)  |
| `header()`                | map of PGN header tags                                        |

---

## Game status

All accept an optional `move` argument and default to the last move.

| Method                       | True when…                                     |
|------------------------------|------------------------------------------------|
| `gameOver(move?)`            | the game has ended                             |
| `inCheck(move?)`             | the side to move is in check                   |
| `inCheckmate(move?)`         | the side to move is checkmated                 |
| `inStalemate(move?)`         | the position is stalemate                      |
| `inDraw(move?)`              | the game is drawn (any reason)                 |
| `insufficientMaterial(move?)`| insufficient material                          |
| `inThreefoldRepetition(move?)`| threefold repetition                          |

---

## Loading

### `load(fen)`

Replace the game state with the given FEN. Throws on an invalid FEN.

### `loadPgn(pgn, sloppy?)`

Replace the game state from a PGN string, including header, variations, NAGs and comments.
If the PGN's `[Variant "Chess960"]` tag is present, `gameVariant` is set automatically.

---

## Exporting PGN

### `renderPgn(renderHeader = true, renderComments = true, renderNags = true)`

Return a PGN string for the current game.

```js
chess.renderPgn()                 // full PGN
chess.renderPgn(false)            // no header
chess.renderPgn(true, false)      // no comments
```

---

## Variations

Move history is a tree. Each move node has `next`, `previous`, `variations` and `variation`
references, so you can walk the main line and any side lines.

```js
const first = chess.history()[0]
console.log(first.san)            // "e4"
console.log(first.next.san)       // "e5"

// Start a side variation from `first`:
chess.move("e5", first)           // becomes the main continuation of `first`
chess.move("c5", first)           // creates a Sicilian variation off `first`
```

Each move node also carries computed fields: `fen`, `uci`, `ply`, `color`, `flags`,
`piece`, `captured`, `promotion`, `inCheck`, `inCheckmate`, `inStalemate`,
`inDraw`, `insufficientMaterial`, `inThreefoldRepetition`, `gameOver`.

See [cm-pgn](https://github.com/shaack/cm-pgn) for the full history/header API.

---

## Events

Subscribe to moves with `addObserver(callback)`:

```js
import { EVENT_TYPE } from "cm-chess"

chess.addObserver((event) => {
    switch (event.type) {
        case EVENT_TYPE.initialized: /* fen/pgn loaded */; break
        case EVENT_TYPE.legalMove:   console.log("played", event.move.san); break
        case EVENT_TYPE.illegalMove: console.warn("rejected", event.move); break
        case EVENT_TYPE.undoMove:    console.log("undid", event.move.san); break
    }
})
```

---

## Chess960 (Fischer Random)

Pass `gameVariant: GAME_VARIANT.chess960` to enable 960-style castling.
Use `O-O` / `O-O-O` (letter O, not zero) — cm-chess resolves them to the
correct king/rook destinations for the given FEN.

```js
import { Chess, GAME_VARIANT } from "cm-chess"

const chess = new Chess({ gameVariant: GAME_VARIANT.chess960 })
chess.load("nrkbrnbq/pppppppp/8/8/8/8/PPPPPPPP/NRKBRNBQ w KQkq - 0 1")
chess.move("f4")
// …
chess.move("O-O-O")
```

When loading a PGN containing `[Variant "Chess960"]`, the variant is detected
automatically.

---

## Exports

```js
import {
    Chess,
    COLOR,         // { white: "w", black: "b" }
    PIECES,        // { p, n, b, r, q, k } with { name, value }
    FEN,           // { empty, start }
    EVENT_TYPE,    // { initialized, legalMove, illegalMove, undoMove }
    GAME_VARIANT   // { standard, chess960 }
} from "cm-chess"
```

---

## Examples

- [`test/TestChess.js`](test/TestChess.js) — core API, loading, variations, events
- [`test/TestChess960.js`](test/TestChess960.js) — Chess960 castling and PGN
- [`test/TestFen.js`](test/TestFen.js) — FEN handling
- Tests of [cm-pgn](https://github.com/shaack/cm-pgn/tree/master/test) for the underlying history/header API

---

## Related

- [cm-pgn](https://github.com/shaack/cm-pgn) — PGN parser and history tree (used internally)
- [chess.mjs](https://www.npmjs.com/package/chess.mjs) — ES-module fork of chess.js (used for move validation)
- [cm-chessboard](https://github.com/shaack/cm-chessboard) — companion chessboard component

## License

MIT — see [LICENSE](LICENSE).
