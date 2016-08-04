const { before, after, around } = require('./')
const { all: catNames, random: catName } = require('cat-names')

function hello (name) {
  return `Hello, ${name}!`
}

console.log(hello(catName()))

const onlyCats = before.sync(hello, ([name]) => {
  return (catNames.indexOf(name) !== -1)
    ? [name]
    : new Error(`${name} is not a cat name.`)
})

console.log(onlyCats(catName()))
console.log(onlyCats(reverse(catName())))

const loud = after.sync(onlyCats, (value) => {
  return value.toUpperCase()
})

console.log(loud(catName()))
console.log(loud(reverse(catName())))

function reverse (str) {
  return str.split('').reverse().join('')
}
