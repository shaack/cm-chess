/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */
import {Pgn} from "../../lib/cm-pgn/Pgn.js"
import {TAGS} from "../../lib/cm-pgn/Header.js"
import {ChessJs} from "./ChessJs.js"

export const COLOR = {
    white: "w",
    black: "b"
}

export const FEN = {
    empty: "8/8/8/8/8/8/8/8 w - - 0 1",
    start: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
}

/**
 * Like chess.js, but handles variations and is written in ES5
 * Uses chess.js for validation
 */
export class Chess {

    constructor(fen) {
        this.cmPgn = new Pgn()
        // this.chessJs = new ChessJs()
        this.startTurn = 0 // set to 1, if startTurn is black after loading FEN
        if (fen) {
            this.load(fen)
        }

    }

    // like game_over() in chess.js
    gameOver() {
        const lastMove = this.lastMove()
        return lastMove && lastMove.gameOver
    }

    fen() {
        const lastMove = this.lastMove()
        return lastMove ? lastMove.fen : FEN.start
    }

    header() {
        return this.cmPgn.header.tags
    }

    inDraw(move = this.lastMove()) {
        return move && move.inDraw === true
    }

    inStalemate(move = this.lastMove()) {
        return move && move.inStalemate === true
    }

    insufficientMaterial(move = this.lastMove()) {
        return move && move.insufficientMaterial === true
    }

    inThreefoldRepetition(move = this.lastMove()) {
        return move && move.inThreefoldRepetition === true
    }

    inCheckmate(move = this.lastMove()) {
        return move && move.inCheckmate === true
    }

    inCheck(move = this.lastMove()) {
        return move && move.inCheck === true
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

    load(fen) {
        const chess = new ChessJs(fen)
        if (chess) {
            this.cmPgn.header.tags[TAGS.SetUp] = 1
            this.cmPgn.header.tags[TAGS.FEN] = fen
            this.cmPgn.history.clear()
            if(chess.turn() === "b") {
                this.startTurn = 1
            } else {
                this.startTurn = 0
            }
        } else {
            console.error("invalid fen", fen)
        }
    }

    loadPgn(pgn, options = null) {
        this.cmPgn = new Pgn(pgn)
    }


    move(move, previousMove = null, sloppy = false) {
        try {
            return this.cmPgn.history.addMove(move, previousMove, sloppy)
        } catch (e) {
            return null
        }

    }

    pgn() {
        this.cmPgn.render(pgn) // TODO
    }

    turn() {
        return (this.cmPgn.history.moves.length + this.startTurn) % 2 === 0 ? COLOR.white : COLOR.black
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
    /*
    static plyCountToTurn(plyCount) {
        if (plyCount % 2 === 1) {
            return COLOR.white
        } else {
            return COLOR.black
        }
    }
     */

}