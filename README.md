# cm-chess 

It is like [chess.js](https://github.com/jhlywa/chess.js) (and is based on an older version of chess.js), 
but can handle history variations (tree-structured move history), 
PGN header values, Nags and Comments.

## Install

`npm install cm-chess`

## Features

- It has a similar API to chess.js
- It can handle history variations
- It can add Nags, Comments and Annotations
- It is used by the 7,000 users of [chessmail](https://www.chessmail.de) (it works)

## API

For documentation, see the jsdoc annotations in [Chess.js](https://github.com/shaack/cm-chess/blob/master/src/Chess.js).

cm-chess uses [cm-pgn](https://github.com/shaack/cm-pgn) for the
header and history, therefore you have also the full API of **cm-pgn**.

If I have some time, I will write a better documentation here in this README. :) 

## Examples

See the unit tests for usage examples
https://github.com/shaack/cm-chess/blob/master/test/TestChess.js

And also the unit tests of cm-pgn
https://github.com/shaack/cm-pgn/tree/master/test

## Test

[Run the unit tests](https://shaack.com/projekte/cm-chess/test/)

