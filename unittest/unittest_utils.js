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

function stringToUint8Array(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0; i < string.length; i++)
        array[i] = string.charCodeAt(i);
    return array;
}

function outputBufferContentsEqual(outputBuffer, expectedOutput) {
    strictEqual(outputBuffer.length, expectedOutput.length);
    for (var i = 0; i < expectedOutput.length; i++)
        strictEqual(outputBuffer[i], expectedOutput[i]);
}
