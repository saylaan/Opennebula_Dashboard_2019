################# ExpressNode ################

A global variable into a file don't need to be include into the arguments of a function. (we can)

const namefct = function(..) {
    return (value)
}

Extends of this we get the arroy function.

Arroy function: But make sure you don't use the 'this' or super (its not possible)
const namefct = (...) => {
    return (value)
}
materials.map(material => material.length) // this return instantly the value length of the string - very powerfull
That means we can use the arroy function such as a function with differents value (here example one) or in a instant return value for computing some stuff.

If there are just one arg we can make directly : const namefct = arg => ...
But if no arg add do : const namefct = () => ...
Therefor we can make a default arg like that : const namefct = (arg1 = val1, arg2...) => ...

We can both make it anonyme : (using inside a function as arg for example)
1. function (s) { return s.length}
2. s => s.length

We can use the this in the scope of the function where the arroy fct is use.
Be cautiou with this : var fct = () =>  {toto : 1} (doesn't work) use instead : var fct = () => ({toto: 1})

Tips
-fs :  let the read of folder and the sync for managing the tree of folder
-A index.js is often use for have a main for integrate other file inside (for example ./route/index.js + ./route/authen.js)

Example promise function :
    const wait1 = time => new Promise(res => setTimeout(() => res(), time));

    const wait = function (time) {
      return (new Promise( function(res) {
        return (setTimeout(function () {
          res()
        }, time))
      }))
    }
    // console.log('Before wait')
    // wait(2000).then(() => new Promise(res => res('foo')))
    // .then(a => console.log(a))
    // .then(b => console.log(b))
    // console.log('After wait')

    console.log('Before wait')
    wait(2000).then(() => new Promise(res => res('foo')))
    .then(a => {
      console.log(a)
      return a
    })
    .then(b => {
      console.log(b)
      throw "didn't work"
    })
    .catch(err => {
      console.log(err)
    })
    console.log('After wait')

var delay = (time) => new Promise((resolves, rejects) => {
  setInterval(() => {
    resolves('The delay has finished.....')
  }, time*1000)
})