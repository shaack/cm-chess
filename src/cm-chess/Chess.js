/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */
import {Pgn} from "../../lib/cm-pgn/Pgn.js"
import {ChessJsProxy} from "./ChessJsProxy.js"

export class Chess extends ChessJsProxy {

    constructor(fen) {
        super(fen)
        this.FEN = {
            empty: "8/8/8/8/8/8/8/8 w - - 0 1",
            start: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        }
        this.status = {
            pgn: new Pgn(),
            history: [] // Moves
        }
    }

    /** Override the chess.js API */

    load_pgn(pgn, options) {
        this.status.pgn = new Pgn(pgn) // parse pgn
        this.status.history = new Moves(this.status.pgn.history) // fill history with ES6 Moves
        return super.load_pgn(pgn, options)
    }
    /** Returns the game in PGN format. Options is an optional parameter which may include max width and/or a newline character settings. */
    pgn(options) {
        return this.status.pgn.render()
    }

    /*
      // the chess.js API
      // https://github.com/jhlywa/chess.js/blob/master/README.md

      - ascii()
      - board()
      - clear()
      - fen()
      - game_over()
      - get(square)
      - history(options)
      - in_check()
      - in_checkmate()
      - in_draw()
      - in_stalemate()
      - in_threefold_repetition()
      - header()
      - insufficient_material()
      - load(fen)
      - load_pgn(pgn, options)
      - move(move, options)
        - flags: NORMAL= 'n', CAPTURE= 'c', BIG_PAWN= 'b', EP_CAPTURE= 'e', PROMOTION= 'p', KSIDE_CASTLE= 'k', QSIDE_CASTLE= 'q'
      - moves(options)
      - pgn(options)
      - put(piece, square)
      - remove(square)
      - reset()
      - turn()
      - undo()
      - validate_fen(fen)
   */
}