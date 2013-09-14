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

var Adler32;

(function() {

Adler32 = function() {
    this._s1 = 1;
    this._s2 = 0;
}

Adler32.prototype.updateForByte = function(byteValue) {
    this._s1 = (this._s1 + byteValue) % 65521;
    this._s2 = (this._s1 + this._s2) % 65521;
}

Adler32.prototype.checksum = function() {
    return this._s2 * 65536 + this._s1;
}

})();
