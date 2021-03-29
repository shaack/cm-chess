/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chess
 * License: MIT, see file 'LICENSE'
 *
 * @deprecated
 */

const openings = [
    {
        "moves": "d2d4d7d5e2e4d5e4b1c3g8f6f2f3e4f3",
        "name_de": "BDG",
        "name_en": "BDG",
        "descriptionLink_de": "Blackmar-Diemer-Gambit",
        "descriptionLink_en": "Blackmar–Diemer_Gambit"
    },
    {
        "moves": "d2d4g8f6c2c4e7e6g1f3c7c5d4d5b7b5",
        "name_de": "Blumfeld-Gambit",
        "name_en": "Blumenfeld Gambit",
        "descriptionLink_de": "Blumenfeld-Gambit",
        "descriptionLink_en": "Blumenfeld_Gambit"
    },
    {
        "moves": "c2c4g8f6d2d4e7e6g1f3c7c5d4d5b7b5",
        "name_de": "Blumfeld-Gambit",
        "name_en": "Blumenfeld Gambit",
        "descriptionLink_de": "Blumenfeld-Gambit",
        "descriptionLink_en": "Blumenfeld_Gambit"
    },
    {
        "moves": "d2d4g8f6c2c4g7g6b1c3f8g7e2e4d7d6",
        "name_de": "Königsindisch",
        "name_en": "King's Indian Def.",
        "descriptionLink_de": "Königsindische_Verteidigung",
        "descriptionLink_en": "King%27s_Indian_Defence"
    },
    {
        "moves": "c2c4g8f6d2d4g7g6b1c3f8g7e2e4d7d6",
        "name_de": "Königsindisch",
        "name_en": "King's Indian Def.",
        "descriptionLink_de": "Königsindische_Verteidigung",
        "descriptionLink_en": "King%27s_Indian_Defence"
    },
    {
        "moves": "e2e4e7e5d2d4e5d4c2c3d4c3f1c4",
        "name_de": "Nordisches Gambit",
        "name_en": "Danish Gambit",
        "descriptionLink_de": "Nordisches_Gambit",
        "descriptionLink_en": "Danish_Gambit"
    },
    {
        "moves": "d2d4g8f6c2c4e7e6g1f3f8b4",
        "name_de": "Bogoindisch",
        "name_en": "Bogo-Indian",
        "descriptionLink_de": "Bogoljubow-Indische_Verteidigung",
        "descriptionLink_en": "Bogo-Indian_Defence"
    },
    {
        "moves": "c2c4g8f6d2d4e7e6g1f3f8b4",
        "name_de": "Bogoindisch",
        "name_en": "Bogo-Indian",
        "descriptionLink_de": "Bogoljubow-Indische_Verteidigung",
        "descriptionLink_en": "Bogo-Indian_Defence"
    },
    {
        "moves": "d2d4g8f6c2c4e7e5d4e5f6g4",
        "name_de": "Budapester Gambit",
        "name_en": "Budapest Gambit",
        "descriptionLink_de": "Budapester_Gambit",
        "descriptionLink_en": "Budapest_Gambit"
    },
    {
        "moves": "c2c4g8f6d2d4e7e5d4e5f6g4",
        "name_de": "Budapester Gambit",
        "name_en": "Budapest Gambit",
        "descriptionLink_de": "Budapester_Gambit",
        "descriptionLink_en": "Budapest_Gambit"
    },
    {
        "moves": "d2d4g8f6c2c4e7e6g1f3b7b6",
        "name_de": "Damenindisch",
        "name_en": "Queen's Indian",
        "descriptionLink_de": "Damenindische_Verteidigung",
        "descriptionLink_en": "Queen%27s_Indian_Defense"
    },
    {
        "moves": "c2c4g8f6d2d4e7e6g1f3b7b6",
        "name_de": "Damenindisch",
        "name_en": "Queen's Indian",
        "descriptionLink_de": "Damenindische_Verteidigung",
        "descriptionLink_en": "Queen%27s_Indian_Defense"
    },
    {
        "moves": "d2d4g8f6c2c4g7g6b1c3d7d5",
        "name_de": "Grünfeld-Indisch",
        "name_en": "Grünfeld Defence",
        "descriptionLink_de": "Grünfeld-Indische_Verteidigung",
        "descriptionLink_en": "Grünfeld_Defence"
    },
    {
        "moves": "c2c4g8f6d2d4g7g6b1c3d7d5",
        "name_de": "Grünfeld-Indisch",
        "name_en": "Grünfeld Defence",
        "descriptionLink_de": "Grünfeld-Indische_Verteidigung",
        "descriptionLink_en": "Grünfeld_Defence"
    },
    {
        "moves": "e2e4e7e5g1f3b8c6f1c4f8c5",
        "name_de": "Italienisch",
        "name_en": "Giuoco Piano",
        "descriptionLink_de": "Italienische_Partie",
        "descriptionLink_en": "Giuoco_Piano"
    },
    {
        "moves": "d2d4g8f6c2c4e7e6b1c3f8b4",
        "name_de": "Nimzo-Indisch",
        "name_en": "Nimzo-Indian Def.",
        "descriptionLink_de": "Nimzowitsch-Indische_Verteidigung",
        "descriptionLink_en": "Nimzo-Indian_Defence"
    },
    {
        "moves": "d2d4e7e6c2c4g8f6b1c3f8b4",
        "name_de": "Nimzo-Indisch",
        "name_en": "Nimzo-Indian Def.",
        "descriptionLink_de": "Nimzowitsch-Indische_Verteidigung",
        "descriptionLink_en": "Nimzo-Indian_Defence"
    },
    {
        "moves": "c2c4g8f6d2d4e7e6b1c3f8b4",
        "name_de": "Nimzo-Indisch",
        "name_en": "Nimzo-Indian Def.",
        "descriptionLink_de": "Nimzowitsch-Indische_Verteidigung",
        "descriptionLink_en": "Nimzo-Indian_Defence"
    },
    {
        "moves": "e2e4e7e5g1f3b8c6d2d4e5d4",
        "name_de": "Schottisch",
        "name_en": "Scotch Game",
        "descriptionLink_de": "Schottische_Partie",
        "descriptionLink_en": "Scotch_Game"
    },
    {
        "moves": "e2e4e7e5g1f3b8c6f1c4f8e7",
        "name_de": "Ungarisch",
        "name_en": "Hungarian Defence",
        "descriptionLink_de": "Ungarische_Verteidigung",
        "descriptionLink_en": "Hungarian_Defense"
    },
    {
        "moves": "e2e4e7e5g1f3b8c6b1c3g8f6",
        "name_de": "Vierspringerspiel",
        "name_en": "Four Knights Game",
        "descriptionLink_de": "Vierspringerspiel",
        "descriptionLink_en": "Four_Knights_Game"
    },
    {
        "moves": "d2d4g8f6c2c4c7c5d4d5b7b5",
        "name_de": "Wolga-Gambit",
        "name_en": "Benko Gambit",
        "descriptionLink_de": "Wolga-Gambit",
        "descriptionLink_en": "Benko_Gambit"
    },
    {
        "moves": "c2c4g8f6d2d4c7c5d4d5b7b5",
        "name_de": "Wolga-Gambit",
        "name_en": "Benko Gambit",
        "descriptionLink_de": "Wolga-Gambit",
        "descriptionLink_en": "Benko_Gambit"
    },
    {
        "moves": "e2e4e7e5g1f3b8c6f1c4g8f6",
        "name_de": "Zweispringerspiel",
        "name_en": "Two Knights Def.",
        "descriptionLink_de": "Zweispringerspiel_im_Nachzuge",
        "descriptionLink_en": "Two_Knights_Defense"
    },
    {
        "moves": "d2d4g8f6c2c4e7e6g2g3",
        "name_de": "Katalanisch",
        "name_en": "Catalan Opening",
        "descriptionLink_de": "Katalanische_Eröffnung",
        "descriptionLink_en": "Catalan_Opening"
    },
    {
        "moves": "c2c4g8f6d2d4e7e6g2g3",
        "name_de": "Katalanisch",
        "name_en": "Catalan Opening",
        "descriptionLink_de": "Katalanische_Eröffnung",
        "descriptionLink_en": "Catalan_Opening"
    },
    {
        "moves": "e2e4e7e5g1f3b8c6c2c3",
        "name_de": "Ponziani",
        "name_en": "Ponziani Opening",
        "descriptionLink_de": "Ponziani-Eröffnung",
        "descriptionLink_en": "Ponziani_Opening"
    },
    {
        "moves": "e2e4e7e5g1f3b8c6f1b5",
        "name_de": "Spanisch",
        "name_en": "Ruy Lopez",
        "descriptionLink_de": "Spanische_Partie",
        "descriptionLink_en": "Ruy_Lopez"
    },
    {
        "moves": "d2d4g8f6c2c4d7d6",
        "name_de": "Altindisch",
        "name_en": "Old Indian Defence",
        "descriptionLink_de": "Altindische_Verteidigung",
        "descriptionLink_en": "Old_Indian_Defense"
    },
    {
        "moves": "c2c4g8f6d2d4d7d6",
        "name_de": "Altindisch",
        "name_en": "Old Indian Defence",
        "descriptionLink_de": "Altindische_Verteidigung",
        "descriptionLink_en": "Old_Indian_Defense"
    },
    {
        "moves": "d2d4g8f6c2c4c7c5",
        "name_de": "Benoni",
        "name_en": "Benoni Defence",
        "descriptionLink_de": "Benoni-Verteidigung",
        "descriptionLink_en": "Benoni_Defense"
    },
    {
        "moves": "c2c4g8f6d2d4c7c5",
        "name_de": "Benoni",
        "name_en": "Benoni Defence",
        "descriptionLink_de": "Benoni-Verteidigung",
        "descriptionLink_en": "Benoni_Defense"
    },
    {
        "moves": "d2d4g8f6c2c4b8c6",
        "name_de": "Mexikanisch",
        "name_en": "King's Indian Def.",
        "descriptionLink_de": "Mexikanische_Verteidigung",
        "descriptionLink_en": "Black_Knights%27_Tango"
    },
    {
        "moves": "c2c4g8f6d2d4b8c6",
        "name_de": "Mexikanisch",
        "name_en": "Black Knights' Tango",
        "descriptionLink_de": "Mexikanische_Verteidigung",
        "descriptionLink_en": "Black_Knights%27_Tango"
    },
    {
        "moves": "e2e4e7e5d2d4e5d4",
        "name_de": "Mittelgambit",
        "name_en": "Center Game",
        "descriptionLink_de": "Mittelgambit",
        "descriptionLink_en": "Center_Game"
    },
    {
        "moves": "e2e4e7e5g1f3d7d6",
        "name_de": "Philidor",
        "name_en": "Philidor Defence",
        "descriptionLink_de": "Philidor-Verteidigung",
        "descriptionLink_en": "Philidor_Defence"
    },
    {
        "moves": "e2e4e7e5g1f3g8f6",
        "name_de": "Russisch",
        "name_en": "Russian",
        "descriptionLink_de": "Russische_Verteidigung",
        "descriptionLink_en": "Petrov%27s_Defence"
    },
    {
        "moves": "e2e4e7e5g1e2",
        "name_de": "Alapin",
        "name_en": "Alapin's Opening",
        "descriptionLink_de": "Alapin-Eröffnung",
        "descriptionLink_en": "Alapin%27s_Opening"
    },
    {
        "moves": "d2d4d7d5c2c4",
        "name_de": "Damengambit",
        "name_en": "Queen's Gambit",
        "descriptionLink_de": "Damengambit",
        "descriptionLink_en": "Queen%27s_Gambit"
    },
    {
        "moves": "d2d4g8f6c2c4",
        "name_de": "Indisch",
        "name_en": "Indian Defence",
        "descriptionLink_de": "Indische_Verteidigung",
        "descriptionLink_en": "Indian_Defence"
    },
    {
        "moves": "c2c4g8f6d2d4",
        "name_de": "Indisch",
        "name_en": "Indian Defence",
        "descriptionLink_de": "Indische_Verteidigung",
        "descriptionLink_en": "Indian_Defence"
    },
    {
        "moves": "e2e4e7e5f2f4",
        "name_de": "Königsgambit",
        "name_en": "King's Gambit",
        "descriptionLink_de": "Königsgambit",
        "descriptionLink_en": "King%27s_Gambit"
    },
    {
        "moves": "e2e4e7e5f1c4",
        "name_de": "Läuferspiel",
        "name_en": "Bishop's Opening",
        "descriptionLink_de": "Läuferspiel",
        "descriptionLink_en": "Bishop%27s_Opening"
    },
    {
        "moves": "e2e4d7d5e4d5",
        "name_de": "Skandinavisch",
        "name_en": "Scandinavian Def.",
        "descriptionLink_de": "Skandinavische_Verteidigung",
        "descriptionLink_en": "Scandinavian_Defense"
    },
    {
        "moves": "e2e4g8f6",
        "name_de": "Aljechin",
        "name_en": "Alekhine's Defence",
        "descriptionLink_de": "Aljechin-Verteidigung",
        "descriptionLink_en": "Alekhine%27s_Defence"
    },
    {
        "moves": "e2e4c7c6",
        "name_de": "Caro-Kann",
        "name_en": "Caro–Kann Defence",
        "descriptionLink_de": "Caro-Kann",
        "descriptionLink_en": "Caro–Kann_Defence"
    },
    {
        "moves": "d2d4d7d5",
        "name_de": "Damenbauernspiel",
        "name_en": "Queen's Pawn Game",
        "descriptionLink_de": "Damenbauernspiel",
        "descriptionLink_en": "Queen%27s_Pawn_Game"
    },
    {
        "moves": "e2e4e7e6",
        "name_de": "Französisch",
        "name_en": "French Defence",
        "descriptionLink_de": "Französische_Verteidigung",
        "descriptionLink_en": "French_Defence"
    },
    {
        "moves": "d2d4f7f5",
        "name_de": "Holländisch",
        "name_en": "Dutch Defence",
        "descriptionLink_de": "Holländische_Verteidigung",
        "descriptionLink_en": "Dutch_Defence"
    },
    {
        "moves": "e2e4d7d6",
        "name_de": "Jugoslawisch",
        "name_en": "Pirc Defence",
        "descriptionLink_de": "Pirc-Ufimzew-Verteidigung",
        "descriptionLink_en": "Pirc_Defence"
    },
    {
        "moves": "e2e4b8c6",
        "name_de": "Nimzowitsch",
        "name_en": "Nimzowitsch Def.",
        "descriptionLink_de": "Nimzowitsch-Verteidigung",
        "descriptionLink_en": "Nimzowitsch_Defence"
    },
    {
        "moves": "e2e4b7b5",
        "name_de": "Owen",
        "name_en": "Owen's Defence",
        "descriptionLink_de": "Owen-Verteidigung",
        "descriptionLink_en": "Owen%27s_Defence"
    },
    {
        "moves": "e2e4g7g6",
        "name_de": "Robatsch",
        "name_en": "Robatsch Defence",
        "descriptionLink_de": "Moderne_Verteidigung",
        "descriptionLink_en": "Modern_Defense"
    },
    {
        "moves": "e2e4c7c5",
        "name_de": "Sizilianisch",
        "name_en": "Sicilian Defence",
        "descriptionLink_de": "Sizilianische_Verteidigung",
        "descriptionLink_en": "Sicilian_Defence"
    },
    {
        "moves": "c2c4",
        "name_de": "Englisch",
        "name_en": "English Opening",
        "descriptionLink_de": "Englische_Eröffnung",
        "descriptionLink_en": "English_Opening"
    },
    {
        "moves": "b2b4",
        "name_de": "Orang Utan",
        "name_en": "Orangutan",
        "descriptionLink_de": "Orang-Utan_(Schach)",
        "descriptionLink_en": "Sokolsky_Opening"
    }
];

export function detect(moves) {
    console.warn("Openings is deprecated")
    let i;
    for (i in openings) {
        const opening = openings[i];
        if (opening.moves.length <= moves.length) {
            const movesTruncated = moves.substring(0, opening.moves.length);
            if (movesTruncated === opening.moves) {
                return opening;
            }
        }
    }
}