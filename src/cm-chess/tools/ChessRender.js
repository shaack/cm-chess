/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 *
 * @deprecated
 */

import {COLOR} from "../Chess.js"

export const PIECES = {
    // https://en.wikipedia.org/wiki/Chess_piece_relative_value
    notation: {
        de: {
            R: "T", N: "S", B: "L", Q: "D", K: "K", P: ""
        }
    },
    figures: {
        utf8: {
            Rw: "♖", Nw: "♘", Bw: "♗", Qw: "♕", Kw: "♔", Pw: "♙",
            Rb: "♜", Nb: "♞", Bb: "♝", Qb: "♛", Kb: "♚", Pb: "♟"
        },
        fontAwesomePro: {
            Rw: '<i class="far fa-fw fa-chess-rook"></i>',
            Nw: '<i class="far fa-fw fa-chess-knight"></i>',
            Bw: '<i class="far fa-fw fa-chess-bishop"></i>',
            Qw: '<i class="far fa-fw fa-chess-queen"></i>',
            Kw: '<i class="far fa-fw fa-chess-king"></i>',
            Pw: '<i class="far fa-fw fa-chess-pawn"></i>',
            Rb: '<i class="fas fa-fw fa-chess-rook"></i>',
            Nb: '<i class="fas fa-fw fa-chess-knight"></i>',
            Bb: '<i class="fas fa-fw fa-chess-bishop"></i>',
            Qb: '<i class="fas fa-fw fa-chess-queen"></i>',
            Kb: '<i class="fas fa-fw fa-chess-king"></i>',
            Pb: '<i class="fas fa-fw fa-chess-pawn"></i>'
        }
    }
}

// noinspection JSUnusedGlobalSymbols
export class ChessRender {
    static san(san, color = COLOR.white, lang = "en", mode = "text", pieces = PIECES.figures.utf8) {
        // console.warn("ChessRender is deprecated and will be removed in future")
        if(mode === "figures") {
            if (color === COLOR.white) {
                return this.replaceAll(san, {
                    "R": pieces.Rw,
                    "N": pieces.Nw,
                    "B": pieces.Bw,
                    "Q": pieces.Qw,
                    "K": pieces.Kw
                })
            } else {
                return this.replaceAll(san, {
                    "R": pieces.Rb,
                    "N": pieces.Nb,
                    "B": pieces.Bb,
                    "Q": pieces.Qb,
                    "K": pieces.Kb
                })
            }
        } else if(mode === "text") {
            return this.replaceAll(san, PIECES.notation[lang])
        } else {
            console.error("mode must be 'text' or 'figures'")
        }
    }
    static replaceAll(str, replacementsObj, ignoreCase = false) {
        let retStr = str
        const flags = ignoreCase ? "gi" : "g"
        for (let needle in replacementsObj) {
            // noinspection JSUnfilteredForInLoop
            retStr = retStr.replace(new RegExp(needle, flags), replacementsObj[needle])
        }
        return retStr
    }
}