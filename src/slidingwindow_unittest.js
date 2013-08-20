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

function slidingWindowTestSequenceMatching() {
    var slidingWindow = new SlidingWindow(32);

    var inputString = "ABCDEABCDEFGH";
    var pos = 0;

    for (; pos < 3; pos++)
        slidingWindow.addSequence(inputString.slice(pos, pos + 3), pos);

    deepEqual(slidingWindow._sequences, { "ABC": [0], "BCD": [1], "CDE": [2] });

    for (; pos < inputString.length - 2; pos++)
        slidingWindow.addSequence(inputString.slice(pos, pos + 3), pos);

    deepEqual(slidingWindow._sequences, {
        "ABC": [5, 0], "BCD": [6, 1], "CDE": [7, 2],
        "DEA": [3], "EAB": [4], "DEF": [8], "EFG": [9], "FGH": [10]
    });
}

function slidingWindowTestWindowSize() {
    var slidingWindow = new SlidingWindow(4);

    var inputString = "ABCDEABCDEFGH";
    var pos = 0;

    for (; pos < 3; pos++)
        slidingWindow.addSequence(inputString.slice(pos, pos + 3), pos);

    deepEqual(slidingWindow._sequenceList, ["ABC", "BCD", "CDE"]);

    slidingWindow.addSequence(inputString.slice(pos, pos + 3), pos);
    pos++;
    deepEqual(slidingWindow._sequenceList, ["ABC", "BCD", "CDE", "DEA"]);

    slidingWindow.addSequence(inputString.slice(pos, pos + 3), pos);
    pos++;
    deepEqual(slidingWindow._sequenceList, ["BCD", "CDE", "DEA", "EAB"]);

    for (; pos < inputString.length - 2; pos++)
        slidingWindow.addSequence(inputString.slice(pos, pos + 3), pos);
    deepEqual(slidingWindow._sequenceList, ["CDE", "DEF", "EFG", "FGH"]);
}

function slidingWindowTestMatchesForSequence() {
    var slidingWindow = new SlidingWindow(8);

    var inputString = "ABCDEABCDEABCDE";
    for (var pos = 0; pos < inputString.length - 2; pos++)
        slidingWindow.addSequence(inputString.slice(pos, pos + 3), pos);

    deepEqual(slidingWindow.matchesForSequence("ABC"), [10, 5]);
    deepEqual(slidingWindow.matchesForSequence("BCD"), [11, 6]);
    deepEqual(slidingWindow.matchesForSequence("CDE"), [12, 7]);
    deepEqual(slidingWindow.matchesForSequence("DEA"), [8]);
    deepEqual(slidingWindow.matchesForSequence("EAB"), [9]);
}

function slidingWindowTestSequenceUpdating() {
    var slidingWindow = new SlidingWindow(4);

    var inputString = "ABCDEABEABCDEABC";
    var pos = 0;

    for (; pos < 8; pos++)
        slidingWindow.addSequence(inputString.slice(pos, pos + 3), pos);
    deepEqual(slidingWindow._sequenceList, ["EAB", "ABE", "BEA", "EAB"]);
    deepEqual(slidingWindow._sequences, { "EAB": [7, 4], "ABE": [5], "BEA": [6] });

    for (; pos < inputString.length - 2; pos++)
        slidingWindow.addSequence(inputString.slice(pos, pos + 3), pos);
    deepEqual(slidingWindow._sequenceList, ["CDE", "DEA", "EAB", "ABC"]);
    deepEqual(slidingWindow._sequences, { "CDE": [10], "DEA": [11], "EAB": [12], "ABC": [13] });
}
