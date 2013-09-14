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

var RBuffer;
var WBuffer;

(function() {

RBuffer = function(data) {
    this._data = data;

    this._readPos = 0;

    this._bitsBuffer = 0;
    this._bitsBufferSize = 0;
}

RBuffer.prototype.length = function() {
    return this._data.length;
}

RBuffer.prototype.readByte = function() {
    if (this._bitsBufferSize > 0)
        this.moveToNextByteBoundary();

    return this._data[this._readPos++];
}

RBuffer.prototype.peekByte = function(peekOffset, fromStart) {
    var offset = peekOffset;
    if (fromStart !== true)
        offset += this._readPos;
    return this._data[offset];
}

RBuffer.prototype.readBits = function(length) {
    for (; this._bitsBufferSize < length; this._bitsBufferSize += 8)
        this._bitsBuffer = (this._data[this._readPos++] << this._bitsBufferSize) | this._bitsBuffer;

    var data = this._bitsBuffer & ((1 << length) - 1);
    this._bitsBuffer >>= length;
    this._bitsBufferSize -= length;
    return data;
}

RBuffer.prototype.peekBits = function(length) {
    var peekedBits = this._bitsBuffer;
    var peekedBitsSize = this._bitsBufferSize;
    for (var peekPos = this._readPos; peekedBitsSize < length; peekedBitsSize += 8, peekPos++)
        peekedBits = (this._data[peekPos] << peekedBitsSize) | peekedBits;

    return peekedBits & ((1 << length) - 1);
}

RBuffer.prototype.moveToNextByteBoundary = function() {
    this._bitsBuffer = 0;
    this._bitsBufferSize = 0;
}

WBuffer = function(data) {
    this._data = new Uint8ClampedArray(256);

    this._writePos = 0;

    this._bitsBuffer = 0;
    this._bitsBufferSize = 0;
}

WBuffer.prototype.length = function() {
    return this._writePos;
}

WBuffer.prototype.writtenArray = function() {
    return this._data.subarray(0, this._writePos);
}

WBuffer.prototype.writeByte = function(byteData) {
    if (this._bitsBufferSize > 0)
        this.moveToNextByteBoundary();

    this._write(byteData);
}

WBuffer.prototype.writeBits = function(bitsData, length) {
    this._bitsBuffer = (bitsData << this._bitsBufferSize) | this._bitsBuffer;
    this._bitsBufferSize += length;

    for (; this._bitsBufferSize >= 8; this._bitsBufferSize -= 8, this._bitsBuffer >>= 8)
        this._write(this._bitsBuffer & 0xFF);
}

WBuffer.prototype.copyFromSelf = function(distanceBack, length) {
    var startPos = this._writePos - distanceBack;
    for (var i = 0; i < length; i++)
        this.writeByte(this._data[startPos + i]);
}

WBuffer.prototype.moveToNextByteBoundary = function() {
    this.writeBits(0, 8 - (this._bitsBufferSize % 8));
}

WBuffer.prototype._write = function(byteData) {
    if (this._writePos == this._data.length) {
        var newBuffer = new Uint8ClampedArray(this._writePos << 1);
        for (var i = 0; i < this._data.length; i++)
            newBuffer[i] = this._data[i];
        this._data = newBuffer;
    }

    this._data[this._writePos++] = byteData;
}

})();
