import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
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

//to do
const persons = {
  name: 'alexa',
  cars: ['ferrari', 'lambo'],
  toString: () => {
      // console.log(`${this.name} has ${this.cars}`);
      //store the reference of this keyword
      const that = this;
      this.cars.forEach((car) => {
          console.log(`${that.name} has ${car}`);
      });
  }
}

person.toString();
//the above is ugly code but we are learning
//the easiest way to fix all of this is
const personal = {
  name4: 'alexa',
  cars: ['ferrari', 'lambo'],
  toString: function () {
      // console.log(`${this.name} has ${this.cars}`);
      //store the reference of this keyword
      this.cars.forEach((car) => {
          console.log(`${this.name4} has ${car}`);
      });
  }
}

personal.toString();

//enhanced object properties we have a new syntax for working with objects

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

//angular mock interviews and answers

//what is angular
/*
angular is an open source javascript framework
completely written in typescript
primarily aimed to build single page applications
and provide scalability and maintainabilty
maintained by google
 */

//what is typescript
/*
typescript is a superset of js that offers excellent consistency
installed as an npm package
it compiles down to js and can run efficiently in any environment
 */

//what is data binding and which type of data binding does angular deploy

/**
 databinding is a phenomenum that allows an internet user to manipulate web page elements 
 using a web browser
 It is used in web pages that contain interactive components such as forms, calculators. tutorials and games
 it makes incremental display of a webpage more convenient
 any changes made in the ui element ois reflected in the corresponding model state and vice versa
 Angular uses the two way data binding
 */

 //what are single page applications 

 /**
  * single page applications load once and new features are just mere additions to the user interface
  * it does not load new html pages to display the content, instead it is generated dynamically
  * they r faster, thus providing a seamless user experience
  */

 //what are decorators in angular

 /**
  * they are design patterns or functions that allow a service, directive or filter
  *  to be modified prior to its usage
  * Angular supports four types of decorators namely
  * class 
  * property
  * method
  * parameter
  
 what are directives in angular
 directives are attributes that allow the user to write new html syntax specific to their applications.
 they execute whenever the angukar compiler finds them in the DOM

 angular supports 3 types of directives
 *component directives
 *structural directives
 attribute directives

 what aot compilations and what are their advantages
 the ahead of time compiler converts the angular html and typescript code into javascript code
 during the build phase that is before the browser downloads and run the code

 advantages are
 faster rendering
 fewer asyncheronous request
 smaller angular frameworks download size
 quick detection of template errors
 better security

 what are components
 they are the most basic building blocks in an angular application
 they are subsets of directives
 only one component can be istantiated per element in a template

 an angular application consist basically of a root component and it branches out to other components
 component decorator provides additional metadata
 components must belong to the Ng module
 components implements a life cycle hook (ngOnInit)

 what are pipes in angular
 they are simple functions that are designed to accept an input value, process, and return as an output
 a transformed valuein a more technical understanding

 dome key features include
 pipes are defined using the pipe "|" symbol
 pipes can be chained with other pipes
 pipes can be provided with arguments using the colon (:) sign.

 what are pure pipes
 pure pipes use pure functions
 the pipes do not use any internal state and the output remains the same as long as the parameters passed 
 stay the same
 angular calls the pipe only when it detects a change in the parameters being passed
 a single instance of the pure pipe is used through out all components
 they have same input parameters

 what are impure pipes
 for every change detection cycle in angular, an impure pipe is called regardless of the change in the
 input fields. multiple pipe instances are created for those pipes. inputs passed to this pipes can be mutable
 By default all pipes are pure. However you can specify impure pipes using the pure property

 what is the pipe transform interface
 The interface receives an input value and transforms it into the desired format with a transform() method
 it is typically used to implement custom pipes

 What is NgModule
 they are containers that reserve a block of code to an application domain or a workflow
 they take a metadata object that describes how to compile a components template and how to create an
 injector at runtime
 it also identifies the modules, components, directives, services, pipes and also ensures that it makes 
 them public so that external components can use them

 what are filters in angular
 filters are used to format an expression and present it to the user, they can be used in view templates
 controllers or services. Some inbuilt filters are
 date: format a date to a specified format
 filter: select a subset of items from an array
 json: format an object to a json string
 
  */
 //an impure pipe
 @Pipe({
   name: "temitope",
   pure:true //false
 })
 export class typeDemo implements PipeTransform{
   transform(value: any, ...args: any[]) {
     throw new Error('Method not implemented.');
   }
}
