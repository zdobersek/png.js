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

var DEFLATE = {};

(function() {

var _lengthCodeLetters;
function lengthCodeLetters() {
    if (!_lengthCodeLetters) {
        var lettersPerLengthCode = [
            { lengthCode: 257, extraBits: 0, lengthOffset: 3 }, { lengthCode: 258, extraBits: 0, lengthOffset: 4 },
            { lengthCode: 259, extraBits: 0, lengthOffset: 5 }, { lengthCode: 260, extraBits: 0, lengthOffset: 6 },
            { lengthCode: 261, extraBits: 0, lengthOffset: 7 }, { lengthCode: 262, extraBits: 0, lengthOffset: 8 },
            { lengthCode: 263, extraBits: 0, lengthOffset: 9 }, { lengthCode: 264, extraBits: 0, lengthOffset: 10 },
            { lengthCode: 265, extraBits: 1, lengthOffset: 11 }, { lenghtCode: 266, extraBits: 1, lengthOffset: 13 },
            { lengthCode: 267, extraBits: 1, lengthOffset: 15 }, { lengthCode: 268, extraBits: 1, lengthOffset: 17 },
            { lengthCode: 269, extraBits: 2, lengthOffset: 19 }, { lengthCode: 270, extraBits: 2, lengthOffset: 23 },
            { lengthCode: 271, extraBits: 2, lengthOffset: 27 }, { lengthCode: 272, extraBits: 2, lengthOffset: 31 },
            { lengthCode: 273, extraBits: 3, lengthOffset: 35 }, { lengthCode: 274, extraBits: 3, lengthOffset: 43 },
            { lengthCode: 275, extraBits: 3, lengthOffset: 51 }, { lengthCode: 276, extraBits: 3, lengthOffset: 59 },
            { lengthCode: 277, extraBits: 4, lengthOffset: 67 }, { lengthCode: 278, extraBits: 4, lengthOffset: 83 },
            { lengthCode: 279, extraBits: 4, lengthOffset: 99 }, { lengthCode: 280, extraBits: 4, lengthOffset: 115 },
            { lengthCode: 281, extraBits: 5, lengthOffset: 131 }, { lengthCode: 282, extraBits: 5, lengthOffset: 163 },
            { lengthCode: 283, extraBits: 5, lengthOffset: 195 }, { lengthCode: 284, extraBits: 5, lengthOffset: 227 },
            { lengthCode: 285, extraBits: 0, lengthOffset: 258 }
        ];

        var lettersPerLength = [];
        for (var i = 0; i < lettersPerLengthCode.length; i++) {
            for (var j = 0; j < Math.pow(2, lettersPerLengthCode[i].extraBits); j++)
                lettersPerLength[lettersPerLengthCode[i].lengthOffset + j] = lettersPerLengthCode[i];
        }

        _lengthCodeLetters = {
            letterForLengthCode: function(lengthCode) {
                return lettersPerLengthCode[lengthCode - 257];
            },
            letterForLength: function(length) {
                return lettersPerLength[length];
            }
        };
    }

    return _lengthCodeLetters;
}

var _distanceCodeLetters;
function distanceCodeLetters() {
    if (!_distanceCodeLetters) {
        var lettersPerDistanceCode = [
            { distanceCode: 0, extraBits: 0, distanceOffset: 1 }, { distanceCode: 1, extraBits: 0, distanceOffset: 2 },
            { distanceCode: 2, extraBits: 0, distanceOffset: 3 }, { distanceCode: 3, extraBits: 0, distanceOffset: 4 },
            { distanceCode: 4, extraBits: 1, distanceOffset: 5 }, { distanceCode: 5, extraBits: 1, distanceOffset: 7 },
            { distanceCode: 6, extraBits: 2, distanceOffset: 9 }, { distanceCode: 7, extraBits: 2, distanceOffset: 13 },
            { distanceCode: 8, extraBits: 3, distanceOffset: 17 }, { distanceCode: 9, extraBits: 3, distanceOffset: 25 },
            { distanceCode: 10, extraBits: 4, distanceOffset: 33 }, { distanceCode: 11, extraBits: 4, distanceOffset: 49 },
            { distanceCode: 12, extraBits: 5, distanceOffset: 65 }, { distanceCode: 13, extraBits: 5, distanceOffset: 97 },
            { distanceCode: 14, extraBits: 6, distanceOffset: 129 }, { distanceCode: 15, extraBits: 6, distanceOffset: 193 },
            { distanceCode: 16, extraBits: 7, distanceOffset: 257 }, { distanceCode: 17, extraBits: 7, distanceOffset: 385 },
            { distanceCode: 18, extraBits: 8, distanceOffset: 513 }, { distanceCode: 19, extraBits: 8, distanceOffset: 769 },
            { distanceCode: 20, extraBits: 9, distanceOffset: 1025 }, { distanceCode: 21, extraBits: 9, distanceOffset: 1537 },
            { distanceCode: 22, extraBits: 10, distanceOffset: 2049 }, { distanceCode: 23, extraBits: 10, distanceOffset: 3073 },
            { distanceCode: 24, extraBits: 11, distanceOffset: 4097 }, { distanceCode: 25, extraBits: 11, distanceOffset: 6145 },
            { distanceCode: 26, extraBits: 12, distanceOffset: 8193 }, { distanceCode: 27, extraBits: 12, distanceOffset: 12289 },
            { distanceCode: 28, extraBits: 13, distanceOffset: 16385 }, { distanceCode: 29, extraBits: 13, distanceOffset: 24577 }
        ];

        var lettersPerDistance = [];
        for (var i = 0; i < lettersPerDistanceCode.length; i++) {
            for (var j = 0; j < Math.pow(2, lettersPerDistanceCode[i].extraBits); j++)
                lettersPerDistance[lettersPerDistanceCode[i].distanceOffset + j] = lettersPerDistanceCode[i];
        }

        _distanceCodeLetters = {
            letterForDistanceCode: function(distanceCode) {
                return lettersPerDistanceCode[distanceCode];
            },
            letterForDistance: function(distance) {
                return lettersPerDistance[distance];
            }
        };
    }

    return _distanceCodeLetters;
}

var _fixedHuffmanCodes;
function fixedHuffmanCodes() {
    if (!_fixedHuffmanCodes) {
        var i = 0;

        var literalLengthCodeLengths = [];
        for (; i < 144; i++)
            literalLengthCodeLengths[i] = 8;
        for (; i < 256; i++)
            literalLengthCodeLengths[i] = 9;
        for (; i < 280; i++)
            literalLengthCodeLengths[i] = 7;
        for (; i < 288; i++)
            literalLengthCodeLengths[i] = 8;

        var distanceCodeLengths = [];
        for (i = 0; i < 32; i++)
            distanceCodeLengths[i] = 5;

        _fixedHuffmanCodes = {
            LiteralLength: new HuffmanCode(literalLengthCodeLengths, true),
            Distance: new HuffmanCode(distanceCodeLengths, true),
        };
    }

    return _fixedHuffmanCodes;
}

DEFLATE.Compressor = function(inputBuffer, outputBuffer) {
    this._inputBuffer = inputBuffer;
    this._outputBuffer = outputBuffer;
    this._slidingWindow = new SlidingWindow(32768, 258);
}

DEFLATE.Compressor.prototype.process = function(length) {
    this._outputBuffer.writeBits(1, 1); // Final block
    this._outputBuffer.writeBits(1, 2); // Fixed Huffman codes

    for (var i = 0; i < length;) {
        var advancement;
        var matchPositions = [];
        var sequence;
        if (length - i >= 3) {
            sequence = String.fromCharCode(this._inputBuffer.peekByte(i), this._inputBuffer.peekByte(i + 1), this._inputBuffer.peekByte(i + 2));
            matchPositions = this._slidingWindow.matchesForSequence(sequence);
        }

        if (!matchPositions.length) {
            var code = fixedHuffmanCodes().LiteralLength.codeForAlphabetLetter(this._inputBuffer.peekByte(i));
            var codeLength = fixedHuffmanCodes().LiteralLength.lengthForCode(code);
            this._outputBuffer.writeBits(code, codeLength);
            advancement = 1;
        } else {
            var maximumMatchedLength = 0;
            var maximumMatchedLengthPos = -1;
            for (var j = 0; j < matchPositions.length; j++) {
                var matchedLength = 0;
                for (var k = matchPositions[j]; k < this._inputBuffer.length() && k - matchPositions[j] < 258 
                        && this._inputBuffer.peekByte(k, true) === this._inputBuffer.peekByte(i + matchedLength); k++)
                    matchedLength++;

                if (matchedLength > maximumMatchedLength) {
                    maximumMatchedLength = matchedLength;
                    maximumMatchedLengthPos = matchPositions[j];
                }
            }

            advancement = maximumMatchedLength;

            var lengthLetter = lengthCodeLetters().letterForLength(maximumMatchedLength);
            var lengthCode = fixedHuffmanCodes().LiteralLength.codeForAlphabetLetter(lengthLetter.lengthCode);
            var lengthCodeLength = fixedHuffmanCodes().LiteralLength.lengthForCode(lengthCode);

            this._outputBuffer.writeBits(lengthCode, lengthCodeLength);
            this._outputBuffer.writeBits(maximumMatchedLength - lengthLetter.lengthOffset, lengthLetter.extraBits);

            var distanceLetter = distanceCodeLetters().letterForDistance(i - maximumMatchedLengthPos);
            var distanceCode = fixedHuffmanCodes().Distance.codeForAlphabetLetter(distanceLetter.distanceCode);
            var distanceCodeLength = fixedHuffmanCodes().Distance.lengthForCode(distanceCode);

            this._outputBuffer.writeBits(distanceCode, distanceCodeLength);
            this._outputBuffer.writeBits(i - maximumMatchedLengthPos - distanceLetter.distanceOffset, distanceLetter.extraBits);
        }

        if (sequence)
            this._slidingWindow.addSequence(sequence, i);
        i += advancement;
        this._outputBuffer.readPos += 1;
    }

    this._outputBuffer.writeBits(0, 7); // End-of-block code
    this._outputBuffer.moveToNextByteBoundary();
}

var BlockCompression = {
    None: 0,
    FixedHuffmanCodes: 1,
    DynamicHuffmanCodes: 2,
    Reserved: 3,
};

DEFLATE.Decompressor = function(inputBuffer, outputBuffer) {
    this._inputBuffer = inputBuffer;
    this._outputBuffer = outputBuffer;

    this._finalBlock = false;
}

DEFLATE.Decompressor.prototype.process = function() {
    while (!this._finalBlock) {
        var blockHeader = this._readBlockHeader();
        this._finalBlock = blockHeader.FinalBlock == 1;

        var huffmanCodes;

        switch (blockHeader.BlockType) {
        case BlockCompression.None:
            this._inputBuffer.moveToNextByteBoundary();
            var LEN = this._inputBuffer.readByte();
            var NLEN = this._inputBuffer.readByte();
            if (LEN & NLEN != 0xff)
                throw "LEN and NLEN are not complementary";
            for (var i = 0; i < LEN; i++)
                this._outputBuffer.writeByte(this._inputBuffer.readByte());
            continue;
        case BlockCompression.FixedHuffmanCodes:
            huffmanCodes = this._generateFixedHuffmanCodes();
            break;
        case BlockCompression.DynamicHuffmanCodes:
            huffmanCodes = this._readDynamicHuffmanCodes();
            break;
        default:
            throw "Unsupported compression type";
        }

        var endOfBlock = false;
        while (!endOfBlock) {
            var value = this._readHuffmanCode(huffmanCodes.LiteralLength);
            var letter = huffmanCodes.LiteralLength.alphabetLetterForCode(value);
            if (letter >= 0 && letter < 256) {
                this._outputBuffer.writeByte(letter);
            } else if (letter == 256) {
                endOfBlock = true;
            } else if (letter < 286) {
                var literalLengthLetter = lengthCodeLetters().letterForLengthCode(letter);
                var length = literalLengthLetter.lengthOffset + this._inputBuffer.readBits(literalLengthLetter.extraBits);

                var distanceCode = this._readHuffmanCode(huffmanCodes.Distance);
                var distanceLetter = distanceCodeLetters().letterForDistanceCode(huffmanCodes.Distance.alphabetLetterForCode(distanceCode));
                var distance = distanceLetter.distanceOffset + this._inputBuffer.readBits(distanceLetter.extraBits);

                this._outputBuffer.copyFromSelf(distance, length);
            }
        }
    }
}

DEFLATE.Decompressor.prototype._readHuffmanCode = function(huffmanCode) {
    for (var codeLength = 1, maxCodeLength = huffmanCode.maxCodeLength(); codeLength <= maxCodeLength; codeLength++) {
        if (huffmanCode.codeExistsForLength(this._inputBuffer.peekBits(codeLength), codeLength))
            return this._inputBuffer.readBits(codeLength);
    }
}

DEFLATE.Decompressor.prototype._readBlockHeader = function() {
    var headerData = this._inputBuffer.readBits(3);
    return {
        FinalBlock: headerData & 1,
        BlockType: headerData >> 1,
    }
}

DEFLATE.Decompressor.prototype._generateFixedHuffmanCodes = function() {
    var literalLengthCodeLengths = [];
    var i = 0;
    for (; i < 144; i++)
        literalLengthCodeLengths[i] = 8;
    for (; i < 256; i++)
        literalLengthCodeLengths[i] = 9;
    for (; i < 280; i++)
        literalLengthCodeLengths[i] = 7;
    for (; i < 288; i++)
        literalLengthCodeLengths[i] = 8;

    var distanceCodeLengths = [];
    for (i = 0; i < 32; i++)
        distanceCodeLengths[i] = 5;

    return {
        LiteralLength: new HuffmanCode(literalLengthCodeLengths, true),
        Distance: new HuffmanCode(distanceCodeLengths, true),
    };
}

var _codeLengthAlphabetLetters = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

DEFLATE.Decompressor.prototype._readDynamicHuffmanCodes = function() {
    var HLIT = this._inputBuffer.readBits(5);
    var HDIST = this._inputBuffer.readBits(5);
    var HCLEN = this._inputBuffer.readBits(4);

    var codeLengths = [];
    for (var i = 0; i < _codeLengthAlphabetLetters.length; i++)
        codeLengths[i] = 0;
    for (var i = 0; i < HCLEN + 4; i++) {
        codeLengths[_codeLengthAlphabetLetters[i]] = this._inputBuffer.readBits(3);
    }
    var codeLengthHuffmanCode = new HuffmanCode(codeLengths, true);

    var completeCodeLengths = this._readCodeLengths(HLIT + HDIST + 258, codeLengthHuffmanCode);
    var literalLengthCodeLengths = completeCodeLengths.slice(0, HLIT + 257);
    var distanceCodeLengths = completeCodeLengths.slice(HLIT + 257, HLIT + HDIST + 258);

    return {
        LiteralLength: new HuffmanCode(literalLengthCodeLengths, true),
        Distance: new HuffmanCode(distanceCodeLengths, true),
    };
}

DEFLATE.Decompressor.prototype._readCodeLengths = function(size, codeLengthHuffmanCode) {
    var codeLengths = [];
    var repeatLetter = 0;

    for (var i = 0; i < size;) {
        var code = this._readHuffmanCode(codeLengthHuffmanCode);
        var letter = codeLengthHuffmanCode.alphabetLetterForCode(code);
        var repeatCount;

        switch (letter) {
        case 16:
            repeatCount = 3 + this._inputBuffer.readBits(2);
            break;
        case 17:
            repeatLetter = 0;
            repeatCount = 3 + this._inputBuffer.readBits(3);
            break;
        case 18:
            repeatLetter = 0;
            repeatCount = 11 + this._inputBuffer.readBits(7);
            break;
        default: // 0 =< letter <= 15
            repeatLetter = letter;
            repeatCount = 1;
            break;
        }

        for (; repeatCount > 0 && i < size; i++, repeatCount--)
            codeLengths[i] = repeatLetter;
    }

    return codeLengths;
}

})();
