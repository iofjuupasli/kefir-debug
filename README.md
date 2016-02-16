kefir-debug
===

Utility for dynamic enabling log of kefir observables

Example
---

```js
import Kefir from 'kefir';
import {setup}, debug from 'kefir-debug';

setup(Kefir.later(100, 'foo'), Kefir.later(4000, 'foo'));

debug('foo', Kefir.interval(1000, true));
debug('bar', Kefir.interval(1000, false));
```

Result:
```
foo <value> true
foo <value> true
foo <value> true
```

API
---

Exports:

```
.setup(
    enableLogForStreamWithNameStream : KefirObservable<string>,
    disableLogForStreamWithNameStream : KefirObservable<string>
) : KefirObservable<[string]>
```

Returns stream of array of names of enabled logs of streams.

You should pass kefir stream which emits *string* names of streams you have registered that you want to log.

Probably you want [kefir-bus](https://www.npmjs.com/package/kefir-bus)

```
.default(
    streamName : string,
    stream : KefirObservable<any>
) : void
```

You should *register* all streams that you want to log with that method
