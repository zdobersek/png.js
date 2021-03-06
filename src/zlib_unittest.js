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

function zlibTestCompressingEndToEnd() {
    var testCases = [
        {
            input: Resources.HelloWorld,
            expectedOutput: new Uint8Array([0x78, 0x9C, 0xF3, 0x48, 0xCD, 0xC9, 0xC9, 0x57, 0x08, 0xCF,
                                            0x2F, 0xCA, 0x49, 0xE1, 0x02, 0x00, 0x1C, 0x32, 0x04, 0x27]),
        },
        {
            input: Resources.QuickBrownFox,
            expectedOutput: new Uint8Array([0x78, 0x9C, 0x0B, 0xC9, 0x48, 0x55, 0x28, 0x2C, 0xCD, 0x4C,
                                            0xCE, 0x56, 0x48, 0x2A, 0xCA, 0x2F, 0xCF, 0x53, 0x48, 0xCB,
                                            0xAF, 0x50, 0xC8, 0x2A, 0xCD, 0x2D, 0x28, 0x56, 0xC8, 0x2F,
                                            0x4B, 0x2D, 0x52, 0x28, 0x01, 0x4A, 0xE7, 0x24, 0x56, 0x55,
                                            0x2A, 0xA4, 0xE4, 0xA7, 0x73, 0x01, 0x00, 0x6B, 0xC0, 0x0F, 0xE4]),
        },
    ];

    for (var i = 0; i < testCases.length; i++) {
        var outputBuffer = new WBuffer();
        (new ZLIB.Compressor(new RBuffer(stringToUint8Array(testCases[i].input)), outputBuffer)).process();
        outputBufferContentsEqual(outputBuffer.writtenArray(), testCases[i].expectedOutput);
    }
}

function zlibTestDecompressingEndToEnd() {
    var testCases = [
        {
            input: new Uint8Array([0x78, 0x9C, 0xF3, 0x54, 0xF0, 0x48, 0x2C, 0x4B, 0x55, 0x70, 0x54, 0x70, 0x29, 0x4A, 0x4D,
                                   0xCC, 0xE5, 0x02, 0x00, 0x22, 0xC3, 0x04, 0x62]),
            expectedOutput: "I Have A Dream\n",
        },
        {
            input: new Uint8Array([0x78, 0x9C, 0x7D, 0x53, 0x5B, 0x8E, 0xDB, 0x30, 0x0C, 0xFC, 0xEF, 0x29, 0x78, 0x00, 0xC3,
                                   0x07, 0xE8, 0x5F, 0x50, 0xF4, 0xA3, 0xC0, 0x16, 0xE9, 0x15, 0x18, 0x9A, 0x76, 0x89, 0xEA,
                                   0xE1, 0x4A, 0x54, 0xD0, 0xBD, 0x7D, 0x47, 0x8A, 0x93, 0xEC, 0x6E, 0x81, 0x02, 0x86, 0x1F,
                                   0x22, 0x39, 0x9C, 0x19, 0xD2, 0x2F, 0x46, 0x5F, 0x5B, 0xC9, 0x3B, 0x27, 0x0A, 0x96, 0xB6,
                                   0xA6, 0x95, 0x70, 0x45, 0x8D, 0x97, 0x82, 0xE7, 0xA2, 0x81, 0x2A, 0x47, 0x5A, 0x39, 0x5A,
                                   0x30, 0x9D, 0xE9, 0x25, 0x17, 0xAA, 0xBA, 0x73, 0x61, 0x27, 0xFD, 0x63, 0xD5, 0x35, 0xB9,
                                   0x69, 0x2F, 0x69, 0x89, 0xE2, 0xAB, 0xFF, 0x9C, 0xE9, 0x47, 0x4F, 0x11, 0x1B, 0x81, 0x89,
                                   0x62, 0xAB, 0x26, 0x3C, 0x51, 0xDD, 0x73, 0x41, 0x89, 0xCB, 0x84, 0x3E, 0x9E, 0xFD, 0xE8,
                                   0x4A, 0xAD, 0x32, 0x0E, 0x46, 0x93, 0x6B, 0x16, 0xBE, 0xB4, 0xC0, 0x05, 0x6D, 0xEC, 0xC1,
                                   0x66, 0xB1, 0x75, 0xD5, 0xA2, 0x54, 0x73, 0x88, 0x9A, 0xC8, 0x3A, 0x4F, 0xDA, 0x0A, 0xC7,
                                   0xC8, 0x3E, 0x90, 0xF1, 0xB9, 0x97, 0x9C, 0x5A, 0x12, 0xC3, 0x49, 0x4E, 0xA4, 0xE3, 0x28,
                                   0x34, 0x92, 0x1C, 0x23, 0x68, 0x1D, 0xB8, 0x5A, 0x67, 0x3A, 0xC7, 0x64, 0x92, 0x3B, 0x68,
                                   0x51, 0x71, 0x25, 0x0E, 0x90, 0x58, 0xAD, 0xF0, 0x05, 0xF2, 0xF0, 0xBD, 0x68, 0xD7, 0x91,
                                   0xF2, 0xF5, 0xD6, 0x9E, 0x69, 0x2D, 0x9C, 0x84, 0x3F, 0xD3, 0x39, 0x51, 0xD1, 0xB5, 0x93,
                                   0x95, 0x0C, 0x61, 0xA9, 0x71, 0xA1, 0x9D, 0x5F, 0x71, 0x97, 0x56, 0x3D, 0x57, 0x23, 0x2F,
                                   0xBC, 0x34, 0xF1, 0x0C, 0xDB, 0xE6, 0x4F, 0x27, 0xBF, 0xF3, 0xBD, 0x32, 0xCC, 0xA9, 0x5A,
                                   0x28, 0xA9, 0xE0, 0xC5, 0x60, 0x65, 0x41, 0x0F, 0x5B, 0x73, 0x89, 0xEF, 0x64, 0x7C, 0xD4,
                                   0xD0, 0x05, 0xD4, 0x9B, 0x00, 0xD8, 0x9D, 0x07, 0xFD, 0xEF, 0x4C, 0xBF, 0x1B, 0xA7, 0x45,
                                   0x1F, 0xEE, 0x48, 0x66, 0x44, 0x44, 0xA7, 0xF7, 0xAE, 0x8C, 0xC1, 0x81, 0x49, 0x0B, 0xCE,
                                   0xC9, 0x8F, 0xEC, 0x3E, 0xA5, 0x81, 0x6A, 0x71, 0x0F, 0x26, 0xE8, 0x51, 0x74, 0xEB, 0x7E,
                                   0x5B, 0x47, 0x8D, 0xE4, 0x36, 0xCA, 0xEE, 0x90, 0x8F, 0xBA, 0x3A, 0xE6, 0xF1, 0x8F, 0x29,
                                   0x4F, 0x69, 0xFF, 0x03, 0x05, 0xAD, 0xFB, 0x9E, 0x7C, 0x5C, 0xB4, 0x99, 0xBE, 0xF9, 0x13,
                                   0xC4, 0x91, 0x7C, 0x07, 0x19, 0x95, 0x67, 0x11, 0x5B, 0x50, 0x86, 0x19, 0x61, 0xE8, 0x2B,
                                   0x8B, 0x4F, 0x64, 0x6F, 0x0A, 0x9E, 0xF1, 0x99, 0x4E, 0x7D, 0x6C, 0xA7, 0xB4, 0x81, 0x78,
                                   0x3E, 0x92, 0x2A, 0x56, 0x38, 0x0C, 0xAF, 0x0F, 0xD8, 0x15, 0xBE, 0xF8, 0x91, 0x34, 0xDD,
                                   0x5A, 0xF4, 0xD8, 0x2F, 0xDD, 0xE1, 0x18, 0x7D, 0x61, 0x6C, 0xBC, 0x2D, 0x1B, 0x76, 0x22,
                                   0x62, 0x45, 0xB0, 0x21, 0x8E, 0xBF, 0x00, 0x69, 0xFA, 0x96, 0x48, 0x9F, 0xED, 0x5F, 0xBF,
                                   0x91, 0x28, 0xF6]),
            expectedOutput: "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth."
                          + " Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues"
                          + " differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos"
                          + " directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi"
                          + " traductores.\nAt solmen va esser necessi far uniform grammatica, pronunciation e plu"
                          + " sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu"
                          + " simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu"
                          + " simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam"
                          + " Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat"
                          + " Angles, quam un skeptic Cambridge amico dit me que Occidental es.\n",
        },
    ];

    for (var i = 0; i < testCases.length; i++) {
        var outputBuffer = new WBuffer();
        (new ZLIB.Decompressor(new RBuffer(testCases[i].input), outputBuffer)).process();
        outputBufferContentsEqual(outputBuffer.writtenArray(), stringToUint8Array(testCases[i].expectedOutput));
    }
}

function zlibTestRoundtrip() {
    var testCases = [{ input: Resources.QuickBrownFox }, { input: Resources.LoremIpsum }];

    for (var i = 0; i < testCases.length; i++) {
        var input = stringToUint8Array(testCases[i].input);

        var compressorOutputBuffer = new WBuffer();
        (new ZLIB.Compressor(new RBuffer(input), compressorOutputBuffer)).process();

        var decompressorOutputBuffer = new WBuffer();
        (new ZLIB.Decompressor(new RBuffer(compressorOutputBuffer.writtenArray()), decompressorOutputBuffer)).process();

        outputBufferContentsEqual(decompressorOutputBuffer.writtenArray(), input);
    }
}

function zlibTestFibonacciRoundtrip() {
    var fibonacciSequence = new Uint8ClampedArray(10000);
    var fib1 = 0, fib2 = 1;
    for (var i = 0; i < fibonacciSequence.length; i++) {
        fibonacciSequence[i] = fib1 + fib2;
        fib1 = fib2;
        fib2 = fibonacciSequence[i];
    }

    var compressorOutputBuffer = new WBuffer();
    (new ZLIB.Compressor(new RBuffer(fibonacciSequence), compressorOutputBuffer)).process();

    var decompressorOutputBuffer = new WBuffer();
    (new ZLIB.Decompressor(new RBuffer(compressorOutputBuffer.writtenArray()), decompressorOutputBuffer)).process();

    outputBufferContentsEqual(decompressorOutputBuffer.writtenArray(), fibonacciSequence);
}
