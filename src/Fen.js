/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 */

export class Fen {

    constructor(fen) {
        this.parse(fen)
    }

    /**
     * https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
     * @param fen
     */
    parse(fen) {
        if (!fen.match(/^[1-8PpNnBbRrQqKk\/]+ [wb] (-|K?Q?k?q?) (-|[a-h][36]) \d+ \d+$/)) {
            throw new Error("Invalid FEN: " + fen)
        }
        const fenParts = fen.split(" ")
        this.position = fenParts[0]
        this.colorToPlay = fenParts[1]
        if(fenParts[2] !== "-") {
            this.castlings = fenParts[2].split("")
        } else {
            this.castlings = []
        }
        this.enPassantTargetSquare = fenParts[3]
        this.plyClock = parseInt(fenParts[4], 10)
        this.moveNumber = parseInt(fenParts[5], 10)
    }

    toString() {
        let fen = this.position + " " + this.colorToPlay + " "
        if (this.castlings.length > 0) {
            fen += this.castlings.join("")
        } else {
            fen += "-"
        }
        fen += " " + this.enPassantTargetSquare + " " + this.plyClock + " " + this.moveNumber
        return fen
    }

}
