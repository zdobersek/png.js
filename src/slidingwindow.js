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

var SlidingWindow;

(function () {

    SlidingWindow = function(windowSize) {
        this._windowSize = windowSize;

        this._sequenceList = [];
        this._sequences = {};
    }

    SlidingWindow.prototype.addSequence = function(sequence, pos) {
        if (!(sequence in this._sequences))
            this._sequences[sequence] = []

        this._sequences[sequence].unshift(pos)
        this._sequenceList.push(sequence);
        this._adjustSequenceList();
    }

    SlidingWindow.prototype.matchesForSequence = function(sequence) {
        if (!(sequence in this._sequences))
            return [];

        return this._sequences[sequence];
    }

    SlidingWindow.prototype._adjustSequenceList = function() {
        if (this._sequenceList.length <= this._windowSize)
            return;

        var removedSequence = this._sequenceList.shift();
        this._sequences[removedSequence].pop();
        if (!this._sequences[removedSequence].length)
            delete this._sequences[removedSequence];
    }

})();
