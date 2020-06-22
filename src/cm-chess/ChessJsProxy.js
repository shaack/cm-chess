/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */

/**
 * chess.js must be included in the HTML.
 * The API of ChessJsProxy will be the same as of chess.js
 */
export class ChessJsProxy {

    constructor(fen) {
        this.chessJs = new Chess(fen)
        // public constants
        this.WHITE = this.chessJs.WHITE
        this.BLACK = this.chessJs.BLACK
        this.PAWN = this.chessJs.PAWN
        this.KNIGHT = this.chessJs.KNIGHT
        this.BISHOP = this.chessJs.BISHOP
        this.ROOK = this.chessJs.ROOK
        this.QUEEN = this.chessJs.QUEEN
        this.KING = this.chessJs.KING
        this.SQUARES = this.chessJs.SQUARES
        this.FLAGS = this.chessJs.FLAGS
    }

    // the chess.js API
    // https://github.com/jhlywa/chess.js/blob/master/README.md

    ascii() {
        return this.chessJs.ascii()
    }

    board() {
        return this.chessJs.board()
    }

    clear() {
        return this.chessJs.clear()
    }

    fen() {
        return this.chessJs.fen()
    }

    game_over() {
        return this.chessJs.game_over()
    }

    get(square) {
        return this.chessJs.get(square)
    }

    history(options) {
        return this.chessJs.history(options)
    }

    in_check() {
        return this.chessJs.in_check()
    }

    in_checkmate() {
        return this.chessJs.in_checkmate()
    }

    in_draw() {
        return this.chessJs.in_draw()
    }

    in_stalemate() {
        return this.chessJs.in_stalemate()
    }

    in_threefold_repetition() {
        return this.chessJs.in_threefold_repetition()
    }

    header() {
        return this.chessJs.header() // ToDo, return cm-pgns header (Tags)
    }

    insufficient_material() {
        return this.chessJs.insufficient_material()
    }

    load(fen) {
        return this.chessJs.load(fen)
    }

    load_pgn(pgn, options) {
        return this.chessJs.load_pgn(pgn, options)
    }

    move(move, options) {
        return this.chessJs.move(move, options)
    }

    moves(options) {
        return this.chessJs.moves(options)
    }

    pgn(options) {
        return this.chessJs.pgn(options) // Todo, return cm-pgns pgn
    }

    put(piece, square) {
        return this.chessJs.put(piece, square)
    }

    remove(square) {
        return this.chessJs.remove(square)
    }

    reset() {
        return this.chessJs.reset()
    }

    turn() {
        return this.chessJs.turn()
    }

    undo() {
        return this.chessJs.undo()
    }

    validate_fen(fen) {
        return this.chessJs.validate_fen(fen)
    }
}