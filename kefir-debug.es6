const streams = {};

export default (name, stream) => {
    streams[name] = stream;
};

const difference = (first, second) => {
    var out = [];
    var idx = 0;
    var firstLen = first.length;
    while (idx < firstLen) {
        if (second.indexOf(first[idx]) === -1 &&
            out.indexOf(first[idx]) === -1) {
            out[out.length] = first[idx];
        }
        idx += 1;
    }
    return out;
};

export const setup = (enable$, disable$) => {
    const debugs$ = enable$
        .map(name => names =>
            names.indexOf(name) !== -1 ?
            names :
            names.concat([name])
        )
        .merge(
            disable$.map(name => names => {
                const i = names.indexOf(name);
                return i === -1 ?
                    names :
                    names.filter(v => v !== name);
            })
        )
        .scan((v, fn) => fn(v), [])
        .toProperty();

    debugs$
        .diff(difference, [])
        .onValue(names => names.forEach(name => streams[name].offLog(name)));

    debugs$
        .diff((a, b) => difference(b, a), [])
        .onValue(names => names.forEach(name => streams[name].log(name)));

    return debugs$;
};
