// Copyright (C) 2013 Žan Doberšek
//
// This file is part of png.js.
//
// png.js is free software: you can redistribute it and/or modify it
// under the terms of the GNU Lesser General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// png.js is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License
// for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with png.js. If not, see <http://www.gnu.org/licenses/>.

function huffmanCodeTestProcessingEndToEnd() {
    var testCases = [
        {
            input: [3, 3, 3, 3, 3, 2, 4, 4],
            expected: {
                maxCodeLength: 4,
                codesPerLength: { 2: [0], 3: [2, 3, 4, 5, 6], 4: [14, 15] },
                codes: [2, 3, 4, 5, 6, 0, 14, 15],
            },
        },
        {
            input: [4, 2, 1, 6, 1, 3, 3, 4, 1, 6, 2, 1, 3, 5, 4, 2],
            expected: {
                maxCodeLength: 6,
                codesPerLength: { 1: [0, 1, 2, 3], 2: [8, 9, 10], 3: [22, 23, 24], 4: [50, 51, 52], 5: [106], 6: [214, 215] },
                codes: [50, 8, 0, 214, 1, 22, 23, 51, 2, 215, 9, 3, 24, 106, 52, 10],
            },
        },
    ];

    for (var i = 0; i < testCases.length; i++) {
        var huffmanCode = new HuffmanCode(testCases[i].input);

        strictEqual(huffmanCode._maxCodeLength, testCases[i].expected.maxCodeLength);

        deepEqual(huffmanCode._codesPerLength, testCases[i].expected.codesPerLength);
        deepEqual(huffmanCode._codes, testCases[i].expected.codes);

        for (var j = 0; j < huffmanCode._codes.length; j++) {
            strictEqual(huffmanCode.alphabetLetterForCode(huffmanCode._codes[j]), j);
            for (var k = 0; k < huffmanCode._maxCodeLength; k++)
                strictEqual(huffmanCode.codeExistsForLength(huffmanCode._codes[j], k), k === testCases[i].input[j]);
        }
    }
}
