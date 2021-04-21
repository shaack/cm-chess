/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */
import {Pgn} from "../../lib/cm-pgn/Pgn.js"
import {TAGS} from "../../lib/cm-pgn/Header.js"
import {Chess as ChessJs} from "../../lib/chess.mjs/Chess.js"

export const PIECES = {
    p: {name: "pawn", value: 1},
    n: {name: "knight", value: 3},
    b: {name: "bishop", value: 3},
    r: {name: "rook", value: 5},
    q: {name: "queen", value: 9},
    k: {name: "king", value: Infinity}
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
 * Uses chess.js for validation and cm-pgn for history and PGN header
 */
export class Chess {

    constructor(fen = FEN.start) {
        this.load(fen)
    }

    /**
     * @returns {string} the FEN of the last move, or the setUpFen(), if no move was made.
     */
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
     * @returns {string} the setUp FEN in the header or the default start-FEN
     */
    setUpFen() {
        if (this.pgn.header.tags[TAGS.SetUp]) {
            return this.pgn.header.tags[TAGS.FEN]
        } else {
            return FEN.start
        }
    }

    /**
     * @returns {Map<string, string>} the header tags of the PGN.
     */
    header() {
        return this.pgn.header.tags
    }

    /**
     * @param move optional
     * @returns {boolean} true, if the game is over at that move
     */
    gameOver(move = this.lastMove()) {
        return move && move.gameOver
    }

    /**
     * @param move optional
     * @returns {boolean} true, if the game is in draw at that move
     */
    inDraw(move = this.lastMove()) {
        return move && move.inDraw === true
    }

    /**
     * @param move optional
     * @returns {boolean} true, if the game is in statemate at that move
     */
    inStalemate(move = this.lastMove()) {
        return move && move.inStalemate === true
    }

    /**
     * @param move optional
     * @returns {boolean} true, if the game is in draw, because of unsufficiant material at that move
     */
    insufficientMaterial(move = this.lastMove()) {
        return move && move.insufficientMaterial === true
    }

    /**
     * @param move optional
     * @returns {boolean} true, if the game is in draw, because of threefold repetition at that move
     */
    inThreefoldRepetition(move = this.lastMove()) {
        return move && move.inThreefoldRepetition === true
    }

    /**
     * @param move optional
     * @returns {boolean} true, if the game is in checkmate at that move
     */
    inCheckmate(move = this.lastMove()) {
        return move && move.inCheckmate === true
    }

    /**
     * @param move optional
     * @returns {boolean} true, if the game is in check at that move
     */
    inCheck(move = this.lastMove()) {
        return move && move.inCheck === true
    }

    /**
     * cm-chess uses cm-pgn for the history and header. See https://github.com/shaack/cm-pgn
     * @returns {[]} the moves of the game history
     */
    history() {
        return this.pgn.history.moves
    }

    /**
     * @returns {undefined|move} the last move of the main variant or `undefined`, if no move was made
     */
    lastMove() {
        if (this.pgn.history.moves.length > 0) {
            return this.pgn.history.moves[this.pgn.history.moves.length - 1]
        } else {
            return undefined
        }
    }

    /**
     * Load a FEN
     * @param fen
     */
    load(fen) {
        const chess = new ChessJs(fen)
        if (chess && chess.fen() === fen) {
            this.pgn = new Pgn()
            if (fen !== FEN.start) {
                this.pgn.header.tags[TAGS.SetUp] = "1"
                this.pgn.header.tags[TAGS.FEN] = chess.fen()
                this.pgn.history.setUpFen = fen
            }
        } else {
            throw Error("Invalid fen " + fen)
        }
    }

    /**
     * Load a PGN with variants, NAGs, header and annotations. cm-chess uses cm-pgn
     * fot the header and history. See https://github.com/shaack/cm-pgn
     * @param pgn
     */
    loadPgn(pgn) {
        this.pgn = new Pgn(pgn)
    }

    /**
     * Make a move in the game.
     * @param move
     * @param previousMove optional, the previous move (variants)
     * @param sloppy to allow sloppy SAN
     * @returns {{}|undefined}
     */
    move(move, previousMove = undefined, sloppy = true) {
        try {
            return this.pgn.history.addMove(move, previousMove, sloppy)
        } catch (e) {
            return undefined
        }
    }

    /**
     * This one is not fully implemented in cm-pgn. For now, it just uses pgn() of chess.js.
     * @returns {string} the PGN of the game.
     */
    renderPgn() {
        // TODO create pgn with variants, annotations, nags (for now just render main variant)
        const chess = new ChessJs(this.setUpFen())
        const moves = this.pgn.history.moves
        for (const move of moves) {
            chess.move(move)
        }
        return chess.pgn()
    }

    /**
     * Get the position of the specified figures at a specific move
     * @param type "p", "n", "b",...
     * @param color "b" or "w"
     * @param move
     * @returns {[]} the pieces (positions) at a specific move
     */
    pieces(type = undefined, color = undefined, move = this.lastMove()) {
        const chessJs = move ? new ChessJs(move.fen) : new ChessJs()
        let result = []
        for (let i = 0; i < 64; i++) {
            const square = chessJs.SQUARES[i]
            const piece = chessJs.get(square)
            if (piece) {
                piece.square = square
            }
            if (!type) {
                if (!color && piece) {
                    result.push(piece)
                }
            } else if (!color && piece && piece.type === type) {
                result.push(piece)
            } else if (piece && piece.color === color && piece.type === type) {
                result.push(piece)
            }
        }
        return result
    }

    /**
     * @returns {COLOR} "b" or "w" the color to move in the main variant
     */
    turn() {
        let factor = 0
        if (this.setUpFen()) {
            const fenParts = this.setUpFen().split(" ")
            if (fenParts[1] === COLOR.black) {
                factor = 1
            }
        }
        return (this.pgn.history.moves.length) % 2 === factor ? COLOR.white : COLOR.black
    }

    /**
     * Undo a move and all moves after it
     * @param move
     */
    undo(move = this.lastMove()) {
        // decouple from previous
        if (move.previous) {
            move.previous.next = undefined
        }
        // splice all next moves
        const index = move.variation.findIndex(element => {
            return element.ply === move.ply
        })
        move.variation = move.variation.splice(index)
    }

}