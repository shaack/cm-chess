import {Chess, FEN} from "../src/cm-chess/Chess.js"
import {Assert} from "../lib/cm-web-modules/assert/Assert.js"
import {TAGS} from "../lib/cm-pgn/Header.js"

describe("Chess", function () {
    it("should create empty Chess", () => {
        const chess = new Chess()
        Assert.equals(chess.fen(), FEN.start)
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
        Assert.equals(chess.history()[2].san, "Qxc7")
    })

    it('should parse stappenmethode weekly.pgn', () => {
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
        chess.load_pgn(pgn, {}, true)
        Assert.equals(5, chess.cmPgn.history.moves.length)
        Assert.equals("Schaak opheffen", chess.cmPgn.header.tags.get(TAGS.White))
        Assert.equals("app 037-1", chess.cmPgn.header.tags.get(TAGS.Annotator))
    })

    it('should allow traverse through moves', () => {
        const chess = new Chess()
        const pgn = `[SetUp "1"]
[FEN "8/8/b2Bq3/7Q/3kp3/5pP1/8/3K4 w - - 0 1"]

1. Qc5+ Kd3 2. Qc2+ Kd4 3. Qd2+ Bd3 4. Qe3+ Kxe3 (4... Kc3 5. Qc1+ Kb3 6. Qa3+ Kc4 7. Qb4+ Kd5 8. Qc5#) 5. Bc5# 
1-0`
        chess.load_pgn(pgn)
        const firstMove = chess.history()[0]
        Assert.equals(firstMove.san, "Qc5+")
        // TODO const secondMove = move.next()
        // Assert.equals(secondMove.san, "f4")
    })

})