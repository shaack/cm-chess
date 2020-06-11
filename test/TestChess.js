import {Chess} from "../src/cm-chess/Chess.js"
import {Assert} from "../lib/cm-web-modules/assert/Assert.js"

describe("Chess", function () {
    it("should create empty Chess", () => {
        const chess = new Chess()
        Assert.equals(chess.fen(), Chess.FEN.start)
    })

    it("should load a simple pgn", function() {
        const chess = new Chess()
        const pgn = `[Event "IBM Kasparov vs. Deep Blue Rematch"]
[Site "New York, NY USA"]
[Date "1997.05.11"]
[Round "6"]
[White "Deep Blue"]
[Black "Kasparov, Garry"]
[Opening "Caro-Kann: 4...Nd7"]
[ECO "B17"]
[Result "1-0"]

1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 h6
8.Nxe6 Qe7 9.O-O fxe6 10.Bg6+ Kd8 {Kasparov schüttelt kurz den Kopf}
11.Bf4 b5 12.a4 Bb7 13.Re1 Nd5 14.Bg3 Kc8 15.axb5 cxb5 16.Qd3 Bc6
17.Bf5 exf5 18.Rxe7 Bxe7 19.c4 1-0`
        chess.load_pgn(pgn)
        Assert.equals(chess.history().length, 37)
        // todo test for Annotation "Kasparov schüttelt kurz den Kopf"
    })

    it("should provide SQUARES", () => {
        const chess = new Chess()
        Assert.equals(chess.SQUARES[1], "b8")
    })
})