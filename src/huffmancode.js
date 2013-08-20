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

var HuffmanCode;

(function() {

   function reverseBits(code, length) {
        var revCode = 0;
        var temp = code;
        for (var i = 0; i < length; i++) {
            revCode = (revCode << 1) | (temp & 1);
            temp >>= 1;
        }

        return revCode;
    }

    HuffmanCode = function(codeLengths, reverseBits) {
        this._codeLengths = codeLengths;
        this._reverseBits = !!reverseBits;

        this._codes = [];
        this._codesPerLength = {};
        this._alphabet = {};

        this._maxCodeLength = 0;
        for (var i = 0; i < this._codeLengths.length; i++)
            this._maxCodeLength = Math.max(this._codeLengths[i], this._maxCodeLength);

        this._constructCode();
    }

    HuffmanCode.prototype.alphabetLetterForCode = function(code) {
        return this._alphabet[code];
    }

    HuffmanCode.prototype.codeForAlphabetLetter = function(letter) {
        return this._codes[letter];
    }

    HuffmanCode.prototype.lengthForCode = function(code) {
        for (var codeLength in this._codesPerLength) {
            if (this._codesPerLength[codeLength].indexOf(code) != -1)
                return parseInt(codeLength);
        }

        return 0;
    }

    HuffmanCode.prototype.codeExistsForLength = function(code, codeLength) {
        if (!(codeLength in this._codesPerLength))
            return false;

        return this._codesPerLength[codeLength].indexOf(code) != -1;
    }

    HuffmanCode.prototype.maxCodeLength = function() {
        return this._maxCodeLength;
    }

    HuffmanCode.prototype._constructCode = function() {
        var codeLengthCount = [];
        for (var i = 0; i <= this._maxCodeLength; i++)
            codeLengthCount[i] = 0;
        for (var i = 0; i < this._codeLengths.length; i++)
            codeLengthCount[this._codeLengths[i]]++;

        var code = 0;
        var nextCode = [];
        for (var i = 1; i <= this._maxCodeLength; i++) {
            code = (code + codeLengthCount[i - 1]) << 1;
            nextCode[i] = code;
        }

        for (var i = 0; i < this._codeLengths.length; i++) {
            var len = this._codeLengths[i];
            if (len != 0) {
                this._codes[i] = this._reverseBits ? reverseBits(nextCode[len], len) : nextCode[len];
                nextCode[len]++;
            }
        }

        for (var i = 0; i < this._codeLengths.length; i++) {
            var codeLength = this._codeLengths[i];
            if (!codeLength)
                continue;

            if (!(codeLength in this._codesPerLength))
                this._codesPerLength[codeLength] = [];
            this._codesPerLength[codeLength].push(this._codes[i]);

            this._alphabet[this._codes[i]] = i;
        }
    }

})();
