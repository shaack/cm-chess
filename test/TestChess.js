/**
 * @author Stefan Haack (https://shaack.com)
 */
import {TAGS} from "cm-pgn/src/Header.js"
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {Chess, COLOR, FEN} from "../src/Chess.js"

describe("Chess", function () {

    it("should create empty Chess", () => {
        const chess = new Chess()
        assert.equal(chess.history().length, 0)
        assert.equal(Object.keys(chess.header()).length, 0)
        assert.equal(chess.fen(), FEN.start)
    })

    it("should load a game from FEN", function () {
        const fen = "4k3/pppppppp/8/8/8/8/PPPPPPPP/4K3 w - - 0 1"
        const chess = new Chess(fen)
        assert.equal(chess.pgn.header.tags[TAGS.FEN], fen)
        assert.equal(chess.fen(), fen)
        assert.equal(chess.piece("e1").type, "k")
        assert.equal(chess.piece("e1").color, "w")
    })

    it("should load a pgn with SetUp and FEN", function () {
        const pgn = `[SetUp "1"]
[FEN "4k3/pppppppp/8/8/8/8/PPPPPPPP/4K3 w - - 0 1"]

1. e4 (1. d4 {Die Variante} d5) e5 {Ein Kommentar} 2. a3`
        const chess = new Chess({pgn: pgn})
        assert.equal(chess.move("Nc6"), null)
        const result = chess.move("h6")
        assert.equal(result.fen, "4k3/pppp1pp1/7p/4p3/4P3/P7/1PPP1PPP/4K3 w - - 0 3")
    })

    it("should load a pgn", function () {
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
        chess.loadPgn(pgn)
        assert.equal(chess.history().length, 37)
        assert.equal(chess.header()[TAGS.White], "Deep Blue")
        const firstMove = chess.history()[0]
        assert.equal(firstMove.color, "w")
        assert.equal(firstMove.san, "e4")
        assert.equal(firstMove.fen, "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1")
        assert.equal(chess.history()[19].commentAfter, "Kasparov schüttelt kurz den Kopf")
    })

    it("should load a pgn with SetUp", () => {
        const pgn = `[Event "?"]
[White "?"]
[Black "?"]
[Result "0-1"]
[SetUp "1"]
[FEN "5rk1/2nb1p1p/1p4p1/p2p2P1/1p2qP1P/1P2P3/P1Q1NK2/1B5R w - - 0 1"]

1. Qc1 Qe6 2. Qxc7 
0-1`
        const chess = new Chess({pgn: pgn})
        assert.equal(chess.history()[2].san, "Qxc7")
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
        chess.loadPgn(pgn)
        assert.equal(5, chess.pgn.history.moves.length)
        assert.equal("Schaak opheffen", chess.pgn.header.tags[TAGS.White])
        assert.equal("app 037-1", chess.pgn.header.tags[TAGS.Annotator])
    })

    it('should allow traverse through moves', () => {
        const chess = new Chess()
        const pgn = `[SetUp "1"]
[FEN "8/8/b2Bq3/7Q/3kp3/5pP1/8/3K4 w - - 0 1"]
[Result "1-0"]

1. Qc5+ Kd3 2. Qc2+ Kd4 3. Qd2+ Bd3 4. Qe3+ Kxe3 (4... Kc3 5. Qc1+ Kb3 6. Qa3+ Kc4 7. Qb4+ Kd5 8. Qc5#) 5. Bc5# 
1-0`
        chess.loadPgn(pgn)
        assert.equal(chess.turn(), COLOR.black)
        const firstMove = chess.history()[0]
        assert.equal(firstMove.san, "Qc5+")
        const secondMove = firstMove.next
        assert.equal(secondMove.san, "Kd3")
        assert.equal(chess.lastMove().san, "Bc5#")
        assert.equal(chess.gameOver(), true)
        assert.equal(chess.lastMove().inCheckmate, true)
        assert.equal(chess.inCheckmate(), true)
        assert.equal(chess.inDraw(), false)
        assert.equal(chess.renderPgn(), `[SetUp "1"]
[FEN "8/8/b2Bq3/7Q/3kp3/5pP1/8/3K4 w - - 0 1"]
[Result "1-0"]

1. Qc5+ Kd3 2. Qc2+ Kd4 3. Qd2+ Bd3 4. Qe3+ Kxe3 (4... Kc3 5. Qc1+ Kb3 6. Qa3+
Kc4 7. Qb4+ Kd5 8. Qc5#) 5. Bc5# 1-0`)
    })

    it('should add move at the end of the history', () => {
        const chess = new Chess()
        assert.equal(chess.turn(), COLOR.white)
        chess.move("e4")
        assert.equal(chess.turn(), COLOR.black)
        assert.equal(chess.history()[0].san, "e4")
        chess.move("e5")
        assert.equal(chess.turn(), COLOR.white)
    })

    it('should provide correct turn after loading a FEN', () => {
        const chess = new Chess()
        chess.load('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1')
        assert.equal(chess.turn(), COLOR.black)
    })

    it('invalid move should return `null`', () => {
        const chess = new Chess()
        chess.load('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1')
        assert.equal(chess.turn(), COLOR.black)
        // assert.notEqual(chess.validateMove("a1"), null)
        const move = chess.move("a1")
        assert.equal(move, null)
    })

    it('should return pieces', () => {
        const chess = new Chess()
        assert.equal(chess.pieces().length, 32)
        const pgn = `[SetUp "1"]
[FEN "8/8/b2Bq3/7Q/3kp3/5pP1/8/3K4 w - - 0 1"]

1. Qc5+ Kd3 2. Qc2+ Kd4 3. Qd2+ Bd3 4. Qe3+ Kxe3 (4... Kc3 5. Qc1+ Kb3 6. Qa3+ Kc4 7. Qb4+ Kd5 8. Qc5#) 5. Bc5# 
1-0`
        chess.loadPgn(pgn)
        assert.equal(chess.pieces("k").length, 2)
    })

    it('should undo lastMove', () => {
        const chess = new Chess()
        const pgn = `[SetUp "1"]
[FEN "8/8/b2Bq3/7Q/3kp3/5pP1/8/3K4 w - - 0 1"]

1. Qc5+ Kd3 2. Qc2+ Kd4 3. Qd2+ Bd3 4. Qe3+ Kxe3 (4... Kc3 5. Qc1+ Kb3 6. Qa3+ Kc4 7. Qb4+ Kd5 8. Qc5#) 5. Bc5# 
1-0`
        chess.loadPgn(pgn)
        assert.equal(chess.history().length, 9)
        chess.undo()
        assert.equal(chess.history().length, 8)
    })

    it('should undo more moves', () => {
        const chess = new Chess()
        const pgn = `[SetUp "1"]
[FEN "8/8/b2Bq3/7Q/3kp3/5pP1/8/3K4 w - - 0 1"]

1. Qc5+ Kd3 2. Qc2+ Kd4 3. Qd2+ Bd3 4. Qe3+ Kxe3 (4... Kc3 5. Qc1+ Kb3 6. Qa3+ Kc4 7. Qb4+ Kd5 8. Qc5#) 5. Bc5# 
1-0`
        chess.loadPgn(pgn)
        chess.undo(chess.history()[5])
        assert.equal(chess.history().length, 5)
        assert.equal(chess.plyCount(), 5)
        assert.equal(chess.fenOfPly(0), "8/8/b2Bq3/7Q/3kp3/5pP1/8/3K4 w - - 0 1")
        assert.equal(chess.fenOfPly(3), "8/8/b2Bq3/8/4p3/3k1pP1/2Q5/3K4 b - - 3 2")
    })

    it("should not load incorrect FEN", function () {
        const fen = "4k3/pppppppp/8/8/8/8/PPPPPP/4K3 w - - 0 1"
        try {
            new Chess(fen)
            assert.true(false)
        } catch (e) {
            // OK
        }
        try {
            const chess = new Chess()
            chess.load(fen)
            assert.true(false)
        } catch (e) {
            // OK
        }
    })

    it("should load different PGNs and then work correctly", function () {
        const fen = "ppppkppp/pppppppp/pppppppp/pppppppp/8/8/8/RNBQKBNR w KQ - 0 1"
        const chess = new Chess({fen: fen})
        assert.true(chess.move("e4") === null)
        assert.true(chess.move("Ke2") !== null)
        chess.load(FEN.start)
        assert.true(chess.move("e4"))
    })

    it("should validate Moves", function () {
        const chess = new Chess()
        assert.notEqual(chess.validateMove("e4"), null)
        assert.notEqual(chess.validateMove("e3"), null)
        assert.notEqual(chess.validateMove("Nf3"), null)
        assert.equal(chess.validateMove("xyz"), null)
        assert.equal(chess.validateMove("e6"), null)
    })

    it("should publish events", function () {
        return new Promise((resolve, reject) => {
            const chess = new Chess()
            chess.addObserver((event) => {
                if (event.type === "legalMove" &&
                    event.move.from === "e2" &&
                    event.move.to === "e4") {
                    resolve()
                } else {
                    reject("error event")
                }
            })
            chess.move("e4")
        })
    })

    it("should provide valid moves", function () {
        const chess = new Chess()
        assert.equal(chess.moves().length, 20)
        chess.move("Nc3")
        assert.equal(chess.moves().length, 20)
        chess.move("e5")
        assert.equal(chess.moves().length, 22)
        assert.equal(JSON.stringify(chess.moves({square: "e2"})), '["e3","e4"]')
        assert.equal(JSON.stringify(chess.moves({piece: "n"})), '["Na4","Nb5","Nd5","Ne4","Nb1","Nf3","Nh3"]')
    })

    it("should detect a check in a game without moves", function () {
        const chess = new Chess("4k3/1P6/8/b7/6r1/8/pp2PPPP/2R1KBNR w K - 0 1")
        assert.true(chess.inCheck())
    })

    // see https://www.chessmail.de/forum/thread.html?key=GINGFqlNiAjf&sv=6
    it("should make a move with sloppy SAN", function () {
        let chess = new Chess("r1R2r1k/1R6/1P2B2p/4pPp1/4N1P1/7P/5P2/2R3K1 w - - 1 44")
        let result = chess.move("R8c7", undefined,false)
        assert.true(result !== null)
        chess = new Chess("r1R2r1k/1R6/1P2B2p/4pPp1/4N1P1/7P/5P2/2R3K1 w - - 1 44")
        result = chess.move("Rc8c7", undefined,false)
        assert.true(result == null)
        chess = new Chess("r1R2r1k/1R6/1P2B2p/4pPp1/4N1P1/7P/5P2/2R3K1 w - - 1 44")
        result = chess.move("Rc8-c7", undefined,false)
        assert.true(result == null)
        chess = new Chess("r1R2r1k/1R6/1P2B2p/4pPp1/4N1P1/7P/5P2/2R3K1 w - - 1 44")
        result = chess.move("Rc8-c7", undefined,true)
        assert.true(result != null)
        chess = new Chess("r1R2r1k/1R6/1P2B2p/4pPp1/4N1P1/7P/5P2/2R3K1 w - - 1 44")
        result = chess.move("Rc8c7", undefined,true)
        assert.true(result != null)
    })

    it("should load a sloppy pgn", function () {
        const pgn = `pgn [SetUp "1"]
[FEN "r1R2r1k/1R6/1P2B2p/4pPp1/4N1P1/7P/5P2/2R3K1 w - - 1 44"]

1.Rc8c7 *`
        let chess
        try {
            chess = new Chess({pgn: pgn, sloppy: false})
            assert.fail("should throw error")
        } catch (e) {
            // ok
        }
        assert.true(chess == null)
        // should work with sloppy = true
        chess = new Chess({pgn: pgn, sloppy: true})
        assert.true(chess != null)
    })

})
