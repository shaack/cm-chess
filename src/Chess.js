/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */
const {Pgn} = await importNodeModule("/cm-pgn/src/Pgn.js")
const {TAGS} = await importNodeModule("/cm-pgn/src/Header.js")
const {Chess: ChessJs, SQUARES} = await importNodeModule("/chess.mjs/src/Chess.js")

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

export const EVENT_TYPE = {
    illegalMove: "illegalMove",
    legalMove: "legalMove",
    undoMove: "undoMove",
    initialized: "initialized"
}

function publishEvent(observers, eventType, data = {}) {
    for (const observer of observers) {
        setTimeout(() => {
            observer(eventType, data)
        })
    }
}

/**
 * Like chess.js, but handles variations and is written in ES5
 * Uses chess.js for validation and cm-pgn for the history and PGN header
 */
export class Chess {

    constructor(fenOrProps = FEN.start) {
        this.observers = []
        if (typeof fenOrProps === "string") {
            this.load(fenOrProps)
        } else {
            if (fenOrProps.fen) {
                this.load(fenOrProps.fen)
            } else if (fenOrProps.pgn) {
                this.loadPgn(fenOrProps.pgn)
            } else {
                this.load(FEN.start)
            }
        }
    }

    /**
     * @returns {string} the FEN of the last move, or the setUpFen(), if no move was made.
     */
    fen(move = this.lastMove()) {
        if (move) {
            return move.fen
        } else {
            return this.setUpFen()
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
     * @returns {null|move} the last move of the main variation or `null`, if no move was made
     */
    lastMove() {
        if (this.pgn.history.moves.length > 0) {
            return this.pgn.history.moves[this.pgn.history.moves.length - 1]
        } else {
            return null
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
        publishEvent(this.observers, EVENT_TYPE.initialized, {fen: fen})
    }

    /**
     * Load a PGN with variations, NAGs, header and annotations. cm-chess uses cm-pgn
     * fot the header and history. See https://github.com/shaack/cm-pgn
     * @param pgn
     */
    loadPgn(pgn) {
        this.pgn = new Pgn(pgn)
        publishEvent(this.observers, EVENT_TYPE.initialized, {pgn: pgn})
    }

    /**
     * Make a move in the game.
     * @param move
     * @param previousMove optional, the previous move (for variations)
     * @param sloppy to allow sloppy SAN
     * @returns {{}|null}
     */
    move(move, previousMove = undefined, sloppy = true) {
        try {
            const moveResult = this.pgn.history.addMove(move, previousMove, sloppy)
            publishEvent(this.observers, EVENT_TYPE.legalMove, {move: move, previousMove: previousMove})
            return moveResult
        } catch (e) {
            publishEvent(this.observers, EVENT_TYPE.illegalMove, {move: move, previousMove: previousMove})
            return null
        }
    }

    /**
     * Return all valid moves
     * @param options {{ square: "e2", piece: "n", verbose: true }}
     * Fields with { verbose: true }
     * - `color` indicates the color of the moving piece (w or b).
     * - `from` and `to` fields are from and to squares in algebraic notation.
     * - `piece`, `captured`, and `promotion` fields contain the lowercase representation of the applicable piece (pnbrqk). The captured and promotion fields are only present when the move is a valid capture or promotion.
     * - `san` is the move in Standard Algebraic Notation (SAN).
     * - `flags` field contains one or more of the string values:
     *      n - a non-capture
     *      b - a pawn push of two squares
     *      e - an en passant capture
     *      c - a standard capture
     *      p - a promotion
     *      k - kingside castling
     *      q - queenside castling
     *   A flags value of pc would mean that a pawn captured a piece on the 8th rank and promoted.
     * @param previousMove
     * @returns {{}}
     */
    moves(options = undefined, previousMove = this.lastMove()) {
        const chessJs = new ChessJs(this.fen(previousMove))
        return chessJs.moves(options)
    }

    /**
     * Don't make a move, just validate, if it would be a correct move
     * @param move
     * @param previousMove optional, the previous move (for variations)
     * @param sloppy to allow sloppy SAN
     * @returns the move object or null if not valid
     */
    validateMove(move, previousMove = undefined, sloppy = true) {
        return this.pgn.history.validateMove(move, previousMove, sloppy)
    }

    /**
     * Render the game as PGN with header, comments and NAGs
     * @param renderHeader optional, default true
     * @param renderComments optional, default true
     * @param renderNags optional, default true
     * @returns {string} the PGN of the game.
     */
    renderPgn(renderHeader = true, renderComments = true, renderNags = true) {
        return this.pgn.render(renderHeader, renderComments, renderNags);
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
            const square = SQUARES[i]
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
     * @returns {string} "b" or "w" the color to move in the main variation
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
        publishEvent(this.observers, EVENT_TYPE.undoMove, {move: move})
    }

    plyCount() {
        return this.history().length
    }

    fenOfPly(plyNumber) {
        if (plyNumber > 0) {
            return this.history()[plyNumber - 1].fen
        } else {
            return this.setUpFen()
        }
    }

    addObserver(callback) {
        this.observers.push(callback)
    }
}
