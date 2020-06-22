/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2020-06-21
 */
export class ChessTools {
    static plyCountToColor(plyCount) {
        if (plyCount % 2 === 1) {
            return COLOR.white
        } else {
            return COLOR.black
        }
    }
}