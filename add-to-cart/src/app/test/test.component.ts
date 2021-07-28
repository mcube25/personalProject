import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Observable, of, Subscription } from "rxjs";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

const obj = {
  name: 'Muhammad',
  country: 'Nigeria'
};

let myArray = ['hello', 'i', 'do', 'code'];
let obs = of(23, myArray, obj, 'girlie', {});

obs.subscribe(data => console.log(data));

setTimeout(() => {
  obs.subscribe(data => console.log(data))
}, 2000);

let obser = new Observable((observer) => {
  observer.next("the first mail");
  setTimeout(() => {
    observer.next("the next email");
    //observer.complete()
    observer.error("something wrong");
  }, 3000)
})


const sequence = new Observable(this.multipleSubscriber());


//subscribe starts the clock and begins to emit every second
sequence.subscribe({
  next(num) {
    console.log('ist subscriber' + num);
    complete(){
      console.log('sequence finished');
    }
  }
});

setTimeout(() => {
  sequence.subscribe({
    next(num) {
      console.log('2nd subscriber' + num);
      complete(){ console.log('sequence finished'); }
    }
  })
}, 3000);



export class TestComponent implements OnInit, OnDestroy {
  intervalSubscription: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data);
    });
    this.intervalSubscription =
      interval(2000).subscribe(c => {
        console.log(c);
      })
  }
  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }

  multipleSubscriber() {
    const arr = [2, 3, 4, 5, 6, 7, 8, 9, 0];
    return (observer) => {
      this.run(observer, arr, 0);
      return {
        unsubscribe() {

        }
      }
    }
  }
  run(observer, arr, index) {
    return setTimeout(() => {
      observer.next(arr[index]);
      if (index === arr.length - 2) {
        observer.complete();
      } else {
        this.run(observer, arr, ++index);
      }
    }, 2000)
  }
}
const getRandomUsers = co(function* (n) {
  const fetchRandomUser = yield fetch(`https://randomuser.me/api/?results=${n}`);
  const data = yield fetchRandomUser.json();
  return data;
});

getRandomUser(9).then(randomUsers => {
  randomUsers.result.forEach(user => {
    const { gender, email } = user;
    console.log(`${gender} ${email}`);
  });
}).catch(err => console.log(err));

/**
 what is event delegation
 Event delegation basically means javascript event listeners fire not only
 on a single DOM elements but on all its descendants
 for instance if you have a navigation with list items, unordered list e.t.c, if an event listaener
 is added to the ui, it essentially affects the children too
 This happens through a process called event bubbling
 Event bubbling is also known as propagation . this is where events on an element will bubble up
 and also fire on all parents.
 e.g
 function hand(leChange(event) {
   console.log(event.target);
 }
 var el = document.getElementById('form');
 el.addEventListener("change", handleChange);
  What is the difference between target and currentTarget
  target is the element with the listener attached while currentTarget
  is the actual element that triggerd it

  2. Explain why the following doesnt work as an IIFE
  function foo(){
    //i pity this code
  }();
  First of all what is an IIFE
  it stands for immediately invoked function expression, meaning running a function immediately
  its written. Above we are trying to run a function that doesn't have a name. how do we make it work
  we can wrap paranthesis around the function
  (function foo(){
    //i pity this code
  })();
  now the above function can work as an IIFE
  why should we use an IIFE
  we do it in order to control variable scope
  reduce collision
  maintain independence
  Easier to write your own code

3. What is the difference on the usage of
function foo() {
  //i am known as a definition or statement
}

var foo = function() {
  //i am an expression
  //i resolve to a value even if just undefined
}
an expression is any valid unit of code that resolves to a value

4. Explain Hoisting
it means all variables using var are declared at the top of any given function scope
whether its liked or not

example
function hoist(flag) {
  if (flag === "Nigeria"){
    var action = "Great";
  }else{
    var action = "skip";
  }
  return action
}

what the js engine does to the above code is
function hoist(flag) {
  var action;
  if (flag === "Nigeria"){
     action = "Great";
  }else{
    var action = "skip";
  }
  return action
}

it creates the var action at the top of the function block, thereby it is declared at the top
if the variable is assigned another value or redeclaring it as in the else statement,
it is going to throw an error in a linter but it works in a browser.
it has been addressed in es6 with the let and const variable declaration
they are not hoisted
they are scoped within the block they are in
they give more control

5. whats is the difference between a variable that is null, undefined, or undeclared

null: cont tried = null;
null has a value and the value is null
null is a nothing value
not zero, not an empty string/object/array
falsy
its a way of creating a placeholder assignmwent for something that might have other values
typeof null actually returns an object

 undefined: Means it has been declared but it doesn't have a value or not assigned a value
 its not neccessarily an error or something. examples are
 let foo;
 let bar = {};
 let baz = ['johnny', 'phil', 'teddy];
 const try = function() {
   don't return anything
 }
 console.log(foo, bar.name, baz[4], try());

   undeclared: const bar = foo + 2
   it is basically  trying to use a variable you have not written out.
   undeclared will usually find you except when assigning a value

6. == vs ===
== checks for equality
=== checks for equality and type

7. what is the use of arrow functions
so i have the function below
const progress = {
  firstName: '',
  lastName: '',
  setName: function(name) {
    let splitName = function(n) {
      let nameArray = n.split(' ');
      this.firstName = nameArray[0];
      this.lastName = nameArray[2];
    }
    splitName(name);
  }
}
progress.setName('micheal pep');
console.log(firstName);
from the above code we use the this keyword on a function that is not a constructor
it thereby assigns our variable to the windows object. so if i run the above code as
console.log(progress.firstName); i will get nothing on the console exxcept if we do 

console.log(windows.firstName);
lets change the inner function to an arrow function

const progress = {
  firstName: '',
  lastName: '',
  setName: function(name) {
    let splitName = (n) => {
      let nameArray = n.split(' ');
      this.firstName = nameArray[0];
      this.lastName = nameArray[2];
    }
    splitName(name);
  }
}
progress.setName('micheal pep');
console.log(firstName);

it will now set the this keyword to the property of the progress variable.
we can now do this
console.log(progress.firstName);
we will get micheal
 */