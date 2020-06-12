/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */
// import {Pgn} from "../../lib/cm-pgn/Pgn.js"

/**
 * chess.js must be included in the HTML
 */
class CmChess extends Chess {

    constructor(fen) {
        super(fen)
        this.FEN = {
            empty: "8/8/8/8/8/8/8/8 w - - 0 1",
            start: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        }
        // this.state.pgn = new Pgn() ToDo
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
      - history(options) // todo cm-pgn
      - in_check()
      - in_checkmate()
      - in_draw()
      - in_stalemate()
      - in_threefold_repetition()
      - header() // ToDo, return cm-pgns header (Tags)
      - insufficient_material()
      - load(fen)  ToDo cm-pgn
      - load_pgn(pgn, options) // ToDo cm-pgn
      - move(move, options) // ToDo add Variants
      - moves(options)
      - pgn(options) // todo cm-pgn
      - put(piece, square)
      - remove(square)
      - reset()
      - turn()
      - undo()
      - validate_fen(fen)
   */
}

export {CmChess as Chess}