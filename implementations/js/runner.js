var ndarray = require('ndarray');
var twister = require('ostrich-twister-prng');
var gemm = require('ndarray-gemm');
var ops = require('ndarray-ops');
var show = require('ndarray-show');

function runner(size) {
    if (typeof performance === "undefined") {
        performance = Date;
    }

    var m = size;
    var k = size/2;
    var n = size;

    // Set the ndarrays in column-major format using a custom stride
    // (otherwise they are in row major format by default)
    var A = ndarray(twister.rand(m,k), [m,k], [1,m]);
    var B = ndarray(twister.rand(k,n), [k,n], [1,k]);

    // Run kernel and measure time for core computation
    var startTime = performance.now();
    var C = ndarray(new Float64Array(m*n), [m,n]);
    gemm(C,A,B);
    var elapsedTime = (performance.now() - startTime) / 1000;

    var ADJUST = 521/size;
    ops.mulseq(C,ADJUST);
    ops.flooreq(C);
    var checksum = fletcher_sum_ndarray(C);

    console.log('{' +
    '    "time": ' + elapsedTime +
    ',   "output": ' + checksum +
    '}');
}
