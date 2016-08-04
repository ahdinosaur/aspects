# aspects

before, after, and around hooks for sync and async functions

also known as [aspect-oriented programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming)

**work in progress**

```shell
npm install --save ahdinosaur/aspects
```

## example

```js
const { before, after, around } = require('aspects')
const { all: catNames, random: catName } = require('cat-names')

function hello (name) {
  return `Hello, ${name}!`
}

console.log(hello(catName()))
// Hello, Misty!

const onlyCats = before.sync(hello, ([name]) => {
  return (catNames.indexOf(name) !== -1)
    ? [name]
    : new Error(`${name} is not a cat name.`)
})

console.log(onlyCats(catName()))
// Hello, Oliver!

console.log(onlyCats(reverse(catName())))
// Error: ylliL is not a cat name.
//    at before.sync (example.js:13:7)
//    at before.js:8:17
//    at Object.<anonymous> (example.js:17:13)

const loud = after.sync(onlyCats, (value) => {
  return value.toUpperCase()
})

console.log(loud(catName()))
// HELLO, SNICKERS!

console.log(loud(reverse(catName())))
// Error: aloL is not a cat name.
//    at before.sync (example.js:13:7)
//    at before.js:8:17
//    at Object.<anonymous> (example.js:17:13)

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
