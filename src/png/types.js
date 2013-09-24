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

PNG.formatSignature = [137, 80, 78, 71, 13, 10, 16, 10];

PNG.Types = {
    BitDepth: {
        BIT_1: 1,
        BIT_2: 2,
        BIT_4: 4,
        BIT_8: 8,
        BIT_16: 16,
    },

    ColorType: {
        GREYSCALE: 0,
        TRUECOLOR: 2,
        INDEXED_COLOR: 3,
        GREYSCALE_WITH_ALPHA: 4,
        TRUECOLOR_WITH_ALPHA: 6,
    },

    CompressionMethod: {
        DEFLATE: 0,
    },

    FilterMethod: {
        ZERO: 0,
    },

    InterlaceMethod: {
        NULL: 0,
        ADAM7: 1,
    },

    Chunks: {
        IHDR: 0,
    }
};

})();
