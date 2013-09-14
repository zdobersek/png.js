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

var ZLIB = {};

(function() {

function parseCMF(data) {
    return {
        CM: data & 0xf,
        CINFO: data >> 4,
    };
}

function parseFLG(data) {
    return {
        FCHECK: data & 0x1f,
        FDICT: data >> 5 & 0x1,
        FLEVEL: data >> 6,
    };
}

ZLIB.Compressor = function(inputBuffer, outputBuffer) {
    this._inputBuffer = inputBuffer;
    this._outputBuffer = outputBuffer;

    this._adler32Checksum = new Adler32(); // FIXME: Use it.
}

ZLIB.Compressor.prototype.process = function() {
    var CMF = { CM: 0x8, CINFO: 0x7 };
    var FLG = { FCHECK: 0x0, FDICT: 0x00, FLEVEL: 0x2 };

    var fcheckBase = CMF.CINFO << 12 | CMF.CM << 8 | FLG.FLEVEL << 6 | FLG.FDICT << 5;
    FLG.FCHECK = Math.ceil(fcheckBase / 31) * 31 - fcheckBase;

    this._outputBuffer.writeByte(CMF.CINFO << 4 | CMF.CM);
    this._outputBuffer.writeByte(FLG.FLEVEL << 6 | FLG.FDICT << 5 | FLG.FCHECK);

    for (var i = 0; i < this._inputBuffer.length(); i++)
        this._adler32Checksum.updateForByte(this._inputBuffer.peekByte(i, true));

    (new DEFLATE.Compressor(this._inputBuffer, this._outputBuffer)).process(this._inputBuffer.length());

    for (var i = 3; i >= 0; i--)
        this._outputBuffer.writeByte((this._adler32Checksum.checksum() >> i * 8) & 0xff);
}

ZLIB.Decompressor = function(inputBuffer, outputBuffer) {
    this._inputBuffer = inputBuffer;
    this._outputBuffer = outputBuffer;
}

ZLIB.Decompressor.prototype.process = function() {
    var CMF = parseCMF(this._inputBuffer.readByte());
    var FLG = parseFLG(this._inputBuffer.readByte());

    var checkValue = (CMF.CINFO << 4 | CMF.CM) << 8 | (FLG.FLEVEL << 6 | FLG.FDICT << 5 | FLG.FCHECK); // FIXME: Use it.
    var adler32Checksum = new Adler32(); // FIXME: Use it.

    (new DEFLATE.Decompressor(this._inputBuffer, this._outputBuffer)).process();

    var expectedAdler32Checksum = Utils.readUint32(this._inputBuffer.readBits(32)); // FIXME: Use it.
}

})();
