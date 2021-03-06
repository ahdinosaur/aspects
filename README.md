# aspects [![stability][stability-badge]][stability-url]
[![npm version][version-badge]][version-url] [![test status][test-badge]][test-url] [![test coverage][coverage-badge]][coverage-url]
[![downloads][downloads-badge]][downloads-url] [![standard style][standard-badge]][standard-url]

before, after, and around hooks for sync and async functions

also known as [aspect-oriented programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming)

```shell
npm install --save aspects
```

## example

```js
const { before, after, around } = require('aspects').sync
const { all: catNames, random: catName } = require('cat-names')

// suppose a function
function hello (name) {
  return `Hello, ${name}!`
}

console.log(hello(catName()))
// Hello, Misty!

// what if we could hook into _before_
// the function runs to check its arguments?
function onlyCats ([name]) {
  return (catNames.indexOf(name) !== -1)
    ? [name]
    : new Error(`${name} is not a cat name.`)
}

console.log(before(hello, onlyCats)(catName()))
// Hello, Bandit!
console.log(before(hello, onlyCats)(reverse(catName())))
// Error: aloL is not a cat name.
//    at before.sync (example.js:13:7)
//    at before.js:8:17
//    at Object.<anonymous> (example.js:17:13)

// or _after_ to change the return value?
function loud (value) {
  return value.toUpperCase()
}

console.log(after(hello, loud)(catName()))
// HELLO, SNICKERS!

// or _around_, to wrap the function?
function character (fn, args) {
  return fn.apply(null, args.map(a => a[0])) + '!!!'
}

console.log(around(hello, character)(catName()))
// Hello, M!!!!

// utility function
function reverse (str) {
  return str.split('').reverse().join('')
}
```

## usage

### `aspects = require('aspects')`
### `{ before, after, around } = aspects`

### `fn = before.sync(fn, hook)`

`fn` is sync function: uses `return`

`hook` is function of shape `(args) => Error | newArgs`

### `fn = before.async(fn, hook)`

`fn` is async function: the last argument is an error-first callback

`hook` is function of shape `(args, cb) => cb(Error, newArgs)`

### `fn = after.sync(fn, hook)`

`fn` is sync function: uses `return`

`hook` is function of shape `(value) => Error | newValue`

### `fn = after.async(fn, hook)`

`fn` is async function: the last argument is an error-first callback

`hook` is function of shape `(value, cb) => cb(Error, newValue)`

### `fn = around.sync(fn, hook)`

`fn` is sync function: uses `return`

`hook` is function of shape `(fn, args) => newFn`

### `fn = around.async(fn, hook)`

`fn` is async function: the last argument is an error-first callback

`hook` is function of shape `(fn, args, cb) => newFn`

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

[stability-badge]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index
[version-badge]: https://img.shields.io/npm/v/aspects.svg?style=flat-square
[version-url]: https://npmjs.org/package/aspects
[test-badge]: https://img.shields.io/travis/ahdinosaur/aspects/master.svg?style=flat-square
[test-url]: https://travis-ci.org/ahdinosaur/aspects
[coverage-badge]: https://img.shields.io/codecov/c/github/ahdinosaur/aspects/master.svg?style=flat-square
[coverage-url]: https://codecov.io/github/ahdinosaur/aspects
[downloads-badge]: http://img.shields.io/npm/dm/aspects.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/aspects
[standard-badge]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
