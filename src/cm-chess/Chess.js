/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */
import {Pgn} from "../../lib/cm-pgn/Pgn.js"
import {ChessJs} from "./ChessJs.js"
import {TAGS} from "../../lib/cm-pgn/Header.js"

export const COLOR = {
    white: "w",
    black: "b"
}

export const FEN = {
    empty: "8/8/8/8/8/8/8/8 w - - 0 1",
    start: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
}

export class Chess {

    constructor(fen) {
        this.cmPgn = new Pgn()
        if (fen) {
            this.loadFen(fen)
        }
        this.chessJs = new ChessJs()
    }

    // like game_over() in chess.js
    gameOver() {
        return this.lastMove() && this.lastMove().gameOver
    }

    fen() {
        if (this.lastMove()) {
            return this.lastMove().fen
        } else {
            return FEN.start
        }
    }

    header() {
        return this.cmPgn.header.tags
    }

    history() {
        return this.cmPgn.history.moves
    }

    /**
     * @returns {null|*} the last move of the main variant
     */
    lastMove() {
        if (this.cmPgn.history.moves.length > 0) {
            return this.cmPgn.history.moves[this.cmPgn.history.moves.length - 1]
        } else {
            return null
        }
    }

    loadFen(fen) {
        if (this.chessJs.validate_fen(fen)) {
            this.cmPgn.header.tags[TAGS.SetUp] = 1
            this.cmPgn.header.tags[TAGS.FEN] = fen
            this.cmPgn.history.clear()
        } else {
            console.error("invalid fen", fen)
        }
    }

    loadPgn(pgn, options = null) {
        this.cmPgn = new Pgn(pgn)
    }


    move(move, previousMove = null, sloppy = false) {
        return this.cmPgn.history.addMove(move, previousMove, sloppy)
    }

    pgn() {
        this.cmPgn.render(pgn) // TODO
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

    // static tools
    static plyCountToColor(plyCount) {
        if (plyCount % 2 === 1) {
            return COLOR.white
        } else {
            return COLOR.black
        }
    }

}