/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */

/**
 * chess.js must be included in the HTML.
 * Extending it, converts it into a ES6 Module.
 */
export class ChessJsProxy extends Chess {

    constructor(fen) {
        super(fen)
    }

    // the chess.js API
    // https://github.com/jhlywa/chess.js/blob/master/README.md

    ascii() {
        return super.ascii()
    }

    board() {
        return super.board()
    }

    clear() {
        return super.clear()
    }

    fen() {
        return super.fen()
    }

    game_over() {
        return super.game_over()
    }

    get(square) {
        return super.get(square)
    }

    history(options) {
        return super.history(options)
    }

    in_check() {
        return super.in_check()
    }

    in_checkmate() {
        return super.in_checkmate()
    }

    in_draw() {
        return super.in_draw()
    }

    in_stalemate() {
        return super.in_stalemate()
    }

    in_threefold_repetition() {
        return super.in_threefold_repetition()
    }

    header() {
        return this.pgn.header() // ToDo, return cm-pgns header (Tags)
    }

    insufficient_material() {
        return super.insufficient_material()
    }

    load(fen) {
        return super.load(fen)
    }

    load_pgn(pgn, options) {
        return super.load_pgn(pgn, options)
    }

    move(move, options) {
        return super.move(move, options)
    }

    moves(options) {
        return super.moves(options)
    }

    pgn(options) {
        return super.pgn(options) // Todo, return cm-pgns pgn
    }

    put(piece, square) {
        return super.put(piece, square)
    }

    remove(square) {
        return super.remove(square)
    }

    reset() {
        return super.reset()
    }

    turn() {
        return super.turn()
    }

    undo() {
        return super.undo()
    }

    validate_fen(fen) {
        return super.validate_fen(fen)
    }
}