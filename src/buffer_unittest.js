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

function rbufferTestReadByte() {
    var buffer = new RBuffer(new Uint8Array([12, 54, 66, 12]));

    strictEqual(buffer.readByte(), 12);
    strictEqual(buffer.readByte(), 54);
    strictEqual(buffer.readByte(), 66);
    strictEqual(buffer.readByte(), 12);
}

function rbufferTestReadBits() {
    var buffer = new RBuffer(new Uint8Array([232, 67, 11]));

    strictEqual(buffer.readBits(3), 0);
    strictEqual(buffer.readBits(3), 5);
    strictEqual(buffer.readBits(5), 15);
    strictEqual(buffer.readBits(4), 8);
    strictEqual(buffer.readBits(2), 2);
    strictEqual(buffer.readBits(2), 1);
    strictEqual(buffer.readBits(3), 1);
}

function rbufferTestPeekBits() {
    var buffer = new RBuffer(new Uint8Array([121, 11, 61]));

    strictEqual(buffer.readBits(2), 1);
    strictEqual(buffer.peekBits(3), 6);
    strictEqual(buffer.readBits(3), 6);
    strictEqual(buffer.peekBits(4), 11);
    strictEqual(buffer.readBits(4), 11);
    strictEqual(buffer.readBits(6), 5);
    strictEqual(buffer.peekBits(4), 10);
    strictEqual(buffer.readBits(4), 10);
    strictEqual(buffer.peekBits(5), 7);
    strictEqual(buffer.readBits(5), 7);
}

function rbufferTestReading() {
    var buffer = new RBuffer(new Uint8Array([12, 55, 91, 244]));

    strictEqual(buffer.readByte(), 12);
    strictEqual(buffer.readBits(2), 3);
    strictEqual(buffer.readBits(3), 5);
    strictEqual(buffer.readByte(), 91);
    strictEqual(buffer.readByte(), 244);
}

function wbufferContentsEqual(wbuffer, expectedContents) {
    for (var i = 0; i < expectedContents.length; i++)
        strictEqual(wbuffer._data[i], expectedContents[i]);
}

function wbufferTestWriteByte() {
    var buffer = new WBuffer();
    buffer.writeByte(12);
    buffer.writeByte(142);
    buffer.writeByte(251);
    buffer.writeByte(61);

    wbufferContentsEqual(buffer, new Uint8Array([12, 142, 251, 61]));
}

function wbufferTestWriteBits() {
    var buffer = new WBuffer();
    buffer.writeBits(4, 6);
    buffer.writeBits(2, 2);
    buffer.writeBits(5, 7);
    buffer.writeBits(2, 10);
    buffer.writeBits(13, 5);
    buffer.writeBits(255, 8);
    buffer.writeBits(3, 2);

    wbufferContentsEqual(buffer, new Uint8Array([132, 5, 1, 218, 255]));
}

function wbufferTestWriting() {
    var buffer = new WBuffer();
    buffer.writeBits(5, 5);
    buffer.writeBits(0, 1);
    buffer.writeByte(120);
    buffer.writeBits(3, 5);
    buffer.writeBits(4, 5);
    buffer.writeBits(12, 8);
    buffer.writeByte(8);
    buffer.writeBits(9, 21);
    buffer.writeByte(42);

    wbufferContentsEqual(buffer, new Uint8Array([5, 120, 131, 48, 0, 8, 9, 0, 0, 42]));
}

function wbufferTestCopyFromSelf() {
    var buffer = new WBuffer();
    buffer.writeByte(21);
    buffer.writeByte(51);
    buffer.writeByte(162);
    buffer.writeByte(23);
    buffer.copyFromSelf(3, 2);
    buffer.writeBits(3, 5);
    buffer.writeBits(16, 5);
    buffer.writeByte(42);
    buffer.copyFromSelf(3, 1);
    buffer.copyFromSelf(3, 2);

    wbufferContentsEqual(buffer, new Uint8Array([21, 51, 162, 23, 51, 162, 3, 2, 42, 3, 2, 42]));
}
