
import {Assert} from "../lib/cm-web-modules/assert/Assert.mjs"
import {ChessRender, PIECES} from "../src/cm-chess/ChessRender.mjs"
import {COLOR} from "../src/cm-chess/Chess.mjs"

describe("ChessRender", function () {

    it("should render figures SAN", function (done) {
        Assert.equals(ChessRender.san("Qa4", COLOR.white, "en", "figures"), PIECES.figures.utf8.Qw + "a4")
        done()
    })

    it("should render text SAN", function (done) {
        Assert.equals(ChessRender.san("Bb4", COLOR.white, "en"), "Bb4")
        Assert.equals(ChessRender.san("Bb4", COLOR.white, "de"), "Lb4")
        done()
    })

})