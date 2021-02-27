import {COLOR} from "./Chess.mjs"
import {TextUtils} from "../../lib/cm-web-modules/utils/TextUtils.mjs"
import {PIECES_VALUES} from "./Chess.mjs"

export const PIECES = {
    // https://en.wikipedia.org/wiki/Chess_piece_relative_value
    values: PIECES_VALUES,
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

export class ChessRender {
    static san(san, color = COLOR.white, lang = "en", mode = "text", pieces = PIECES.figures.utf8) {
        if(mode === "figures") {
            if (color === COLOR.white) {
                return TextUtils.replaceAll(san, {
                    "R": pieces.Rw,
                    "N": pieces.Nw,
                    "B": pieces.Bw,
                    "Q": pieces.Qw,
                    "K": pieces.Kw
                })
            } else {
                return TextUtils.replaceAll(san, {
                    "R": pieces.Rb,
                    "N": pieces.Nb,
                    "B": pieces.Bb,
                    "Q": pieces.Qb,
                    "K": pieces.Kb
                })
            }
        } else if(mode === "text") {
            return TextUtils.replaceAll(san, PIECES.notation[lang])
        } else {
            console.error("mode must be 'text' or 'figures'")
        }
    }
}