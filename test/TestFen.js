import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Fen} from "../src/cm-chess/Fen.js"

describe("Fen", function () {

    it("should parse a fen", () => {
        const fen = new Fen("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2")
        assert.equal(fen.position, "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R")
        assert.equal(fen.colorToPlay, "b")
        assert.equal(fen.castlings.length, 4)
        assert.equal(fen.enPassantTargetSquare, undefined)
        assert.equal(fen.plyClock, 1)
        assert.equal(fen.moveNumber, 2)
    })
})
