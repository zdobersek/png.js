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

var Utils = {};

(function () {

    Utils.adjustValue = function(value) {
        return value < 0 ? value + 0xffffffff + 1 : value;
    }

    Utils.readUint32 = function(data) {
        return Utils.adjustValue(data[0] << 24 | data[1] << 16 | data[2] << 8 | data[3]);
    }

})();
