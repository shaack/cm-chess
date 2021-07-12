/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */

export class Fen {

    constructor(fen) {
        this.fen = fen
    }

    get fen() {
        return this._fen
    }

    /**
     * https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
     * @param fen
     */
    set fen(fen) {
        this._fen = fen
        const fenParts = fen.split(" ")
        this.position = fenParts[0]
        this.colorToPlay = fenParts[1]
        this.castlings = fenParts[2].split("")
        this.enPassantTargetSquare = fenParts[3]
        if(this.enPassantTargetSquare === "-") {
            this.enPassantTargetSquare = undefined
        }
        this.plyClock = parseInt(fenParts[4], 10)
        this.moveNumber = parseInt(fenParts[5], 10)
    }

}