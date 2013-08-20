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

function adler32TestComputation() {
    function computeChecksumForData(data) {
        var adler32 = new Adler32();
        for (var i = 0; i < data.length; i++)
            adler32.updateForByte(data.charCodeAt(i));
        return adler32.checksum();
    }

    equal(computeChecksumForData("Adler32"), 0x09c4024e);
    equal(computeChecksumForData("          "), 0x06ea0141);
    equal(computeChecksumForData("\x00\x00\x00\x00\x00"), 0x00050001);

    var loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut"
                   + " labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
                   + " laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in"
                   + " voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat"
                   + " non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    equal(computeChecksumForData(loremIpsum), 0x55d5a572);
}
