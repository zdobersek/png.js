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

(function () {

    module('Utils tests');
    test('adjustValue', utilsTestAdjustValue);
    test('readUint32', utilsTestReadUint32);

    module('Adler32 tests');
    test('computation', adler32TestComputation);

    module('CRC tests');
    test('unsupported polynomial', crcTestUnsupportedPolynomial);
    test('CRC-32 support', crcTestCRC32Support);
    test('CRC-32 computation', crcTestCRC32Computation);

    module('Huffman code tests');
    test('end-to-end code processing', huffmanCodeTestProcessingEndToEnd);

    module('Buffer tests');
    test('RBuffer readByte', rbufferTestReadByte);
    test('RBuffer readBits', rbufferTestReadBits);
    test('RBuffer peekBits', rbufferTestPeekBits);
    test('RBuffer reading', rbufferTestReading);
    test('WBuffer writeByte', wbufferTestWriteByte);
    test('WBuffer writeBits', wbufferTestWriteBits);
    test('WBuffer writing', wbufferTestWriting);
    test('WBuffer copyFromSelf', wbufferTestCopyFromSelf);

    module('Sliding window tests');
    test('sequence matching', slidingWindowTestSequenceMatching);
    test('window size', slidingWindowTestWindowSize);
    test('matches for sequence', slidingWindowTestMatchesForSequence);
    test('sequence updating', slidingWindowTestSequenceUpdating);

    module('DEFLATE tests');
    test('end-to-end compressing', deflateTestCompressingEndToEnd);
    test('end-to-end decompressing', deflateTestDecompressingEndToEnd);
    test('roundtrip', deflateTestRoundtrip);
    test('fibonacci roundtrip', deflateTestFibonacciRoundtrip);

    module('ZLIB tests');
    test('end-to-end decompressing', zlibTestDecompressingEndToEnd);
    test('end-to-end compressing', zlibTestCompressingEndToEnd);
    test('roundtrip', zlibTestRoundtrip);
    test('fibonacci roundtrip', zlibTestFibonacciRoundtrip);

})();
