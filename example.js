const { before, after, around } = require('./').sync
const { all: catNames, random: catName } = require('cat-names')

// suppose a function
function hello (name) {
  return `Hello, ${name}!`
}

console.log(hello(catName()))

// what if we could hook into _before_
// the function runs to check its arguments?
function onlyCats ([name]) {
  return (catNames.indexOf(name) !== -1)
    ? [name]
    : new Error(`${name} is not a cat name.`)
}

console.log(before(hello, onlyCats)(catName()))
console.log(before(hello, onlyCats)(reverse(catName())))

// or _after_ to change the return value?
function loud (value) {
  return value.toUpperCase()
}

console.log(after(hello, loud)(catName()))

// or _around_, to wrap the function?
function character (fn, args) {
  return fn.apply(null, args.map(a => a[0])) + '!!!'
}

console.log(around(hello, character)(catName()))

// utility function
function reverse (str) {
  return str.split('').reverse().join('')
}
