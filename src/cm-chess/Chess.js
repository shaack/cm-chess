/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */
import {Pgn} from "../../lib/cm-pgn/Pgn.js"
import {TAGS} from "../../lib/cm-pgn/Header.js"
import {ChessJs} from "./ChessJs.js"

export const PIECES_VALUES = {
    R: 5, N: 3, B: 3, Q: 9, K: 4, P: 1
}

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
        if (fen) {
            this.load(fen)
        } else {
            this.cmPgn = new Pgn()
        }
    }

    // like game_over() in chess.js
    gameOver() {
        const lastMove = this.lastMove()
        return lastMove && lastMove.gameOver
    }

    fen() {
        const lastMove = this.lastMove()
        if (lastMove) {
            return lastMove.fen
        } else if (this.setUpFen()) {
            return this.setUpFen()
        } else {
            return FEN.start
        }
    }

    /**
     * return the setUp FEN in the header or the default start-FEN
     * @returns {string}
     */
    setUpFen() {
        if (this.cmPgn.header.tags.get(TAGS.SetUp)) {
            return this.cmPgn.header.tags.get(TAGS.FEN)
        } else {
            return FEN.start
        }
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
        if (chess && chess.fen() === fen) {
            this.cmPgn = new Pgn()
            this.cmPgn.header.tags.set(TAGS.SetUp, "1")
            this.cmPgn.header.tags.set(TAGS.FEN, chess.fen())
            this.cmPgn.history.clear()
            this.cmPgn.history.setUpFen = fen
        } else {
            throw Error("Invalid fen " + fen)
        }
    }

    loadPgn(pgn) {
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
        // TODO create pgn with variants, annotations, nags (for now just render main variant)
        const chess = new ChessJs(this.setUpFen())
        const moves = this.cmPgn.history.moves
        for (const move of moves) {
            chess.move(move)
        }
        return chess.pgn()
    }

    /**
     * return the pieces (positions) at a specific move
     */
    pieces(type = null, color = null, move = this.lastMove()) {
        const chessJs = move ? new ChessJs(move.fen) : new ChessJs()
        let result = []
        for (let i = 0; i < 64; i++) {
            const square = chessJs.SQUARES[i]
            const piece = chessJs.get(square)
            if (piece !== null) {
                piece.square = square
            }
            if (type === null) {
                if (color === null && piece !== null) {
                    result.push(piece)
                }
            } else if (color === null && piece !== null && piece.type === type) {
                result.push(piece)
            } else if (piece !== null && piece.color === color && piece.type === type) {
                result.push(piece)
            }
        }
        return result
    }

    turn() {
        let factor = 0
        if (this.setUpFen()) {
            const fenParts = this.setUpFen().split(" ")
            if (fenParts[1] === "b") {
                factor = 1
            }
        }
        return (this.cmPgn.history.moves.length) % 2 === factor ? COLOR.white : COLOR.black
    }

    /**
     * undo a move and all moves after it
     */
    undo(move = this.lastMove()) {
        // decouple from previous
        if (move.previous) {
            move.previous.next = null
        }
        // splice all next moves
        const index = move.variation.findIndex(element => {
            return element.ply === move.ply
        })
        move.variation = move.variation.splice(index)
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