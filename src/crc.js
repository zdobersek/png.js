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

var CRC;

(function () {

    _supportedCRCPolynomials = {
        'CRC-32': {
            normal: 0x04C11DB7,
            reversed: 0xEDB88320,
        },
    };

    _CRCTable = {};

    function _computeCRCTableForPolynomial(polynomialName) {
        this._CRCTable[polynomialName] = [];

        for (var i = 0; i < 256; i++) {
            var c = i;
            for (var j = 0; j < 8; j++) {
                if (c & 1)
                    c = Utils.adjustValue(_supportedCRCPolynomials[polynomialName].reversed ^ (c >>> 1));
                else
                    c = c >>> 1;
            }

            _CRCTable[polynomialName][i] = c;
        }
    }

    CRC = function(polynomialName) {
        if (!(polynomialName in _supportedCRCPolynomials))
            return;

        if (!(polynomialName in _CRCTable))
            _computeCRCTableForPolynomial(polynomialName);

        this._crc = 0xffffffff;
        this._polynomialName = polynomialName;
    }

    CRC.prototype.updateForByte = function(byteValue) {
        if (!this._crc)
            return;

        var v = Utils.adjustValue(this._crc ^ byteValue);
        this._crc = _CRCTable[this._polynomialName][v & 0xff] ^ (this._crc >>> 8);
    }

    CRC.prototype.checksum = function(byteValue) {
        if (!this._crc)
            return null;

        return Utils.adjustValue(this._crc ^ 0xffffffff);
    }

})();
