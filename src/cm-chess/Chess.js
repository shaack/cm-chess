/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */
import {Pgn} from "../../lib/cm-pgn/Pgn.js"
import {ChessJs} from "./ChessJs.js"

export class Chess extends ChessJs {

    static FEN = {
        empty: "8/8/8/8/8/8/8/8 w - - 0 1",
        start: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    }

    constructor(fen) {
        super(fen)
        // this.state.pgn = new Pgn() ToDo
    }

    // overrides of the chess.js API
    /* only standard chess.js for now
    load_pgn(pgn, options) {
        return this.state.pgn.parse(pgn, options) // ToDo, load_pgn
    }
     */
}