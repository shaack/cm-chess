/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */

import {Pgn} from "../../lib/cm-pgn/Pgn.js"

export class ChessJs {

    constructor(fen) {
        this.state = {}
        this.state.chessJs = new Chess() // `chess.js` must be previously included
        if(!fen) {
            this.state.chessJs.clear()
        }
    }

    // the chess.js API
    // https://github.com/jhlywa/chess.js/blob/master/README.md

    ascii() {
        return this.state.chessJs.ascii()
    }

    board() {
        return this.state.chessJs.board()
    }

    clear() {
        return this.state.chessJs.clear()
    }

    fen() {
        return this.state.chessJs.fen()
    }

    game_over() {
        return this.state.chessJs.game_over()
    }

    get(square) {
        return this.state.chessJs.get(square)
    }

    history(options) {
        return this.state.chessJs.history(options) // ToDo add multiple variants
    }

    in_check() {
        return this.state.chessJs.in_check()
    }

    in_checkmate() {
        return this.state.chessJs.in_checkmate()
    }

    in_draw() {
        return this.state.chessJs.in_draw()
    }

    in_stalemate() {
        return this.state.chessJs.in_stalemate()
    }

    in_threefold_repetition() {
        return this.state.chessJs.in_threefold_repetition()
    }

    header() {
        return this.pgn.header() // ToDo, return cm-pgns header (Tags)
    }

    insufficient_material() {
        return this.state.chessJs.insufficient_material()
    }

    load(fen) {
        return this.state.chessJs.load(fen)
    }

    load_pgn(pgn, options) {
        return this.state.chessJs.load_pgn(pgn, options)
    }

    move(move, options) {
        return this.state.chessJs.move(move, options)
    }

    moves(options) {
        return this.state.chessJs.moves(options)
    }

    pgn(options) {
        return this.state.chessJs.pgn(options) // Todo, return cm-pgns pgn
    }

    put(piece, square) {
        return this.state.chessJs.put(piece, square)
    }

    remove(square) {
        return this.state.chessJs.remove(square)
    }

    reset() {
        return this.state.chessJs.reset()
    }

    turn() {
        return this.state.chessJs.turn()
    }

    undo() {
        return this.state.chessJs.undo()
    }

    validate_fen(fen) {
        return this.state.chessJs.validate_fen(fen)
    }
}