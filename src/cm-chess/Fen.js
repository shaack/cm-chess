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

    set fen(fen) {
        this._fen = fen
        const fenParts = fen.split(" ")
        this.position = fenParts[0]
        this.colorToPlay = fenParts[1]
        this.castlings = fenParts[2].split("")
    }

}