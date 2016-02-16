(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.kefirDebug = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var streams = {};

    exports.default = function (name, stream) {
        streams[name] = stream;
    };

    var difference = function difference(first, second) {
        var out = [];
        var idx = 0;
        var firstLen = first.length;
        while (idx < firstLen) {
            if (second.indexOf(first[idx]) === -1 && out.indexOf(first[idx]) === -1) {
                out[out.length] = first[idx];
            }
            idx += 1;
        }
        return out;
    };

    var setup = exports.setup = function setup(enable$, disable$) {
        var debugs$ = enable$.map(function (name) {
            return function (names) {
                return names.indexOf(name) !== -1 ? names : names.concat([name]);
            };
        }).merge(disable$.map(function (name) {
            return function (names) {
                var i = names.indexOf(name);
                return i === -1 ? names : names.filter(function (v) {
                    return v !== name;
                });
            };
        })).scan(function (v, fn) {
            return fn(v);
        }, []).toProperty();

        debugs$.diff(difference, []).onValue(function (names) {
            return names.forEach(function (name) {
                return streams[name].offLog(name);
            });
        });

        debugs$.diff(function (a, b) {
            return difference(b, a);
        }, []).onValue(function (names) {
            return names.forEach(function (name) {
                return streams[name].log(name);
            });
        });

        return debugs$;
    };
});
