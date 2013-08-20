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

function utilsTestAdjustValue() {
    var testCases = [
        {
            input: -1,
            expectedOutput: 0xffffffff,
        },
        {
            input: 0x80 << 24,
            expectedOutput: 2147483648,
        },
        {
            input: 0xA907F5BB,
            expectedOutput: 2835871163,
        },
        {
            input: 0xF1F1,
            expectedOutput: 0xF1F1,
        },
    ];

    for (var i = 0; i < testCases.length; i++)
        strictEqual(Utils.adjustValue(testCases[i].input), testCases[i].expectedOutput);
}

function utilsTestReadUint32() {
    var testCases = [
        {
            input: [0x43, 0xB5, 0x66, 0xDD],
            expectedOutput: 1135961821,
        },
        {
            input: [0x89, 0xFF, 0x7E, 0x11],
            expectedOutput: 2315222545,
        },
        {
            input: [0x00, 0x00, 0xFF, 0x00],
            expectedOutput: 65280,
        },
    ];

    for (var i = 0; i < testCases.length; i++)
        strictEqual(Utils.readUint32(testCases[i].input), testCases[i].expectedOutput);
}
