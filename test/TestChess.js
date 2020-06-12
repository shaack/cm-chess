import {Chess} from "../src/cm-chess/Chess.js"
import {Assert} from "../lib/cm-web-modules/assert/Assert.js"

describe("Chess", function () {
    it("should create empty Chess", () => {
        const chess = new Chess()
        Assert.equals(chess.fen(), chess.FEN.start)
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

    it("should load a pgn with SetUp", () => {
        const chess = new Chess()
        const pgn = `[Event "?"]
[White "?"]
[Black "?"]
[Result "0-1"]
[SetUp "1"]
[FEN "5rk1/2nb1p1p/1p4p1/p2p2P1/1p2qP1P/1P2P3/P1Q1NK2/1B5R w - - 0 1"]

1. Qc1 Qe6 2. Qxc7 
0-1`
        chess.load_pgn(pgn)
        Assert.equals(chess.history()[2], "Qxc7")
    })

    it("should load a pgn with a variant", () => {
        const chess = new Chess()
        const pgn = `[Event "?"]
[Site "?"]
[Date "2012.??.??"]
[Round "?"]
[White "Schaak opheffen"]
[Black "Materiaal"]
[Result "0-1"]
[Annotator "S3"]
[Annotator "app 037-1"]
[SetUp "1"]
[FEN "r1b1Q1k1/1p2bpqp/8/8/p1Pr4/4PpN1/P6P/R4RK1 b - - 0 1"]

1... Bf8 (1... Qf8? 2. Qxf8+ Bxf8 3. exd4) 2. exd4 Qxd4+ {%Q} 3. Kh1 Bh3 
0-1`
        chess.load_pgn(pgn)
        console.log(chess.history())
    })
})