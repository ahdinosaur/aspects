# aspects

before, after, and around hooks for sync and async functions

also known as [aspect-oriented programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming)

**work in progress**

```shell
#npm install --save ahdinosaur/aspects
```

## usage

### `aspects = require('aspects')`

### `fn = aspects.around.sync(fn, hook)`

`hook` is function of shape `(fn, args) => newFn`

### `fn = aspects.around.async(fn, hook)`

`hook` is function of shape `(fn, args, cb) => newFn`

### `fn = aspects.before.sync(fn, hook)`

`hook` is function of shape `(args) => Error | newArgs`

### `fn = aspects.before.async(fn, hook)`

`hook` is function of shape `(args, cb) => cb(Error, newArgs)`

### `fn = aspects.after.sync(fn, hook)`

`hook` is function of shape `(value) => Error | newValue`

### `fn = aspects.after.async(fn, hook)`

`hook` is function of shape `(value, cb) => cb(Error, newValue)`

## inspiration

- [`dominictarr/hoox`](https://github.com/dominictarr/hoox)

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
