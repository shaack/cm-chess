/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */
import {Pgn} from "../../lib/cm-pgn/Pgn.js"
import {ChessJs} from "./ChessJs.js"

class CmChess extends ChessJs {

    constructor(fen) {
        super(fen)
        this.state.pgn = new Pgn()
    }

    // overrides of the chess.js API

    load_pgn(pgn, options) {
        return this.state.pgn.parse(pgn, options) // ToDo, load_pgn
    }
}

export {CmChess as Chess}