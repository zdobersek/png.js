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

function pngChunksTestProperties() {
    var testCases = [
        {
            chunk: { length: 0, type: stringToUint8Array('IHDR'), data: [], crc: [] },
            expectedProperties: { isCritical: true, isPublic: true, isSafeToCopy: false },
        },
        {
            chunk: { length: 0, type: stringToUint8Array('tIME'), data: [], crc: [] },
            expectedProperties: { isCritical: false, isPublic: true, isSafeToCopy: false },
        },
        {
            chunk: { length: 0, type: stringToUint8Array('tEXt'), data: [], crc: [] },
            expectedProperties: { isCritical: false, isPublic: true, isSafeToCopy: true },
        },
        {
            chunk: { length: 0, type: stringToUint8Array('pRvT'), data: [], crc: [] },
            expectedProperties: { isCritical: false, isPublic: true, isSafeToCopy: false },
        },
        {
            chunk: { length: 0, type: stringToUint8Array('rsRv'), data: [], crc: [] },
            expectedProperties: { isCritical: false, isPublic: false, isSafeToCopy: true },
        },
    ];

    for (var i = 0; i < testCases.length; i++) {
        var chunk = new PNG.Chunk(testCases[i].chunk);
        strictEqual(chunk.isCritical, testCases[i].expectedProperties.isCritical);
        strictEqual(chunk.isPublic, testCases[i].expectedProperties.isPublic);
        strictEqual(chunk.isSafeToCopy, testCases[i].expectedProperties.isSafeToCopy);
    }
}

function pngChunksTestIHDRChunk() {
    var expectedProperties = {
        isCritical: true, isPublic: true, isSafeToCopy: false,
        isSupported: true, chunkType: PNG.Types.Chunks.IHDR,
        length: 13, isCorrupted: false,
    };
    var testCases = [
        {
            chunk: {
                length: Utils.readUint32([0x00, 0x00, 0x00, 0x0D]),
                type: [0x49, 0x48, 0x44, 0x52],
                data: [0x00, 0x00, 0x05, 0x56, 0x00, 0x00, 0x03, 0x00, 0x08, 0x02, 0x00, 0x00, 0x00],
                crc: Utils.readUint32([0x40, 0x5C, 0xAB, 0x95]),
            },
            expectedProperties: expectedProperties,
            expectedProcessedProperties: {
                width: 1366, height: 768, bitDepth: PNG.Types.BitDepth.BIT_8, colorType: PNG.Types.ColorType.TRUECOLOR,
                compressionMethod: PNG.Types.CompressionMethod.DEFLATE, filterMethod: PNG.Types.FilterMethod.ZERO,
                interlaceMethod: PNG.Types.InterlaceMethod.NULL,
            },
        },
        {
            chunk: {
                length: Utils.readUint32([0x00, 0x00, 0x00, 0x0D]),
                type: [0x49, 0x48, 0x44, 0x52],
                data: [0x00, 0x00, 0x00, 0xD7, 0x00, 0x00, 0x00, 0xAE, 0x08, 0x06, 0x00, 0x00, 0x00],
                crc: Utils.readUint32([0xA5, 0x50, 0x98, 0xBC]),
            },
            expectedProperties: expectedProperties,
            expectedProcessedProperties: {
                width: 215, height: 174, bitDepth: PNG.Types.BitDepth.BIT_8, colorType: PNG.Types.ColorType.TRUECOLOR_WITH_ALPHA,
                compressionMethod: PNG.Types.CompressionMethod.DEFLATE, filterMethod: PNG.Types.FilterMethod.ZERO,
                interlaceMethod: PNG.Types.InterlaceMethod.NULL,
            },
        },
    ];

    for (var i = 0; i < testCases.length; i++) {
        var chunk = new PNG.Chunk(testCases[i].chunk);
        Object.keys(testCases[i].expectedProperties).forEach(function(property) {
            strictEqual(chunk[property], testCases[i].expectedProperties[property]);
        });

        var processedObject = {};
        PNG.supportedChunkTypes[PNG.Types.Chunks.IHDR].processFunction.apply(processedObject, [chunk]);
        Object.keys(testCases[i].expectedProcessedProperties).forEach(function(property) {
            strictEqual(processedObject[property], testCases[i].expectedProcessedProperties[property]);
        });
    }
}
