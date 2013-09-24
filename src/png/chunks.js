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

var PNG = PNG || {};

(function() {

function _chunkMatchesType(chunk, type) {
    for (var i = 0; i < type.length; i++) {
        if (chunk.type[i] != type[i])
            return false;
    }

    return chunk.type.length == type.length;
}

var IHDRChunkType = [73, 72, 68, 82];
function _processIHDRChunk(chunk) {
    Utils.assert(chunk.chunkType == PNG.Types.Chunks.IHDR, "IHDR chunk has proper type");
    Utils.assert(chunk.length == 13, "IHDR chunk has proper length");
    Utils.assert(chunk.data.length == 13, "IHDR chunk data field has proper length");

    this.width = Utils.readUint32(chunk.data.slice(0, 4));
    this.height = Utils.readUint32(chunk.data.slice(4, 8));
    this.bitDepth = chunk.data[8];
    this.colorType = chunk.data[9];
    this.compressionMethod = chunk.data[10];
    this.filterMethod = chunk.data[11];
    this.interlaceMethod = chunk.data[12];
}

PNG.supportedChunkTypes = {
    0: { type: PNG.Types.Chunks.IHDR, rawType: IHDRChunkType, processFunction: _processIHDRChunk },
};

var _chunkTypeForRawType = {};
Object.keys(PNG.supportedChunkTypes).forEach(function(supportedChunkType) {
    var chunkType = PNG.supportedChunkTypes[supportedChunkType];
    _chunkTypeForRawType[Utils.readUint32(chunkType.rawType)] = chunkType.type;
});

PNG.chunkTypeForRawType = function(rawType) {
    return _chunkTypeForRawType[Utils.readUint32(rawType)];
}

PNG.Chunk = function(chunk) {
    this.isCritical = !(chunk.type[0] & (1 << 5));
    this.isPublic = !(chunk.type[1] & (1 << 5));
    this.isSafeToCopy = !!(chunk.type[3] & (1 << 5));

    this.chunkType = PNG.chunkTypeForRawType(chunk.type);
    this.isSupported = !(chunk.type[2] & (1 << 5)) && (this.chunkType != undefined);

    this.length = chunk.length;
    this.data = chunk.data;

    this.isCorrupted = !this._checkCRC(chunk.type, chunk.crc);
}

PNG.Chunk.prototype._checkCRC = function(chunkType, expectedCRCChecksum) {
    var actualCRC = new CRC('CRC-32');
    for (var i = 0; i < chunkType.length; i++)
        actualCRC.updateForByte(chunkType[i]);

    for (var i = 0; i < this.data.length; i++)
        actualCRC.updateForByte(this.data[i]);

    return actualCRC.checksum() == expectedCRCChecksum;
}

})();
