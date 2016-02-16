var Kefir = require('kefir');
var debug = require('../kefir-debug');

debug.setup(Kefir.later(100, 'foo'), Kefir.later(4000, 'foo'));

debug.default('foo', Kefir.interval(1000, true));
debug.default('bar', Kefir.interval(1000, false));
