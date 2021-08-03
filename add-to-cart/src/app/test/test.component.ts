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
  name = "gabigab";
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
 lomitTo: limits an array/string into a specified number of elements/characters
 lowerCase: format a string to lowercase

 What is view encapsulation in Angular
 it defines whether the template and styles defined within the component can affect the whole application
 or vice versa. Angular provides 3 encapsulation strategies, which are
 Emulated: styles from main html propagated to the component
 Native: styles from main html do not propagate to the component
 None: styles from the component propagate back to the main html and thereforeare visible to all components
 on the page

 What are controllers
 They control the data of angular applications. They are regular javaScript objects. The ng-controller
 directive defines the application controller

 What is scope in angular
 The scope in angular binds the html for example the view, and the javascript(controller)
 it is an object with the available properties and methods
 when an controller is made in angular, the scope object is passed as an argument

 What are life cycle hooks in angular
 in angular, every component has a life cycle. Angular creates and renders this components and also
 destroys them before removing them from the DOM. This is achieved with the life cycle hooks
 examples ngOnchange(), ngOnInit(), ngOnDestroy e.t.c

 What is string interpolation in Angular
 it is a one way data binding technique that outputs the data from the typeScript code to the html view
 it is denoted using the double curly braces {{data}}
 it helps display the data from the component to the view

What are template statements
they are properties ormethods that is used in html to respond to user events
with template statements, the application can engage users through actions such as displaying dynamic 
contents or submitting forms 

what is the difference between ahead of time and just in time compilation

AOT: converts your code during the build time before the browser downloads and run the code
ensures faster rendering to the browser
JIT: it is a way of compiling computer code to machine code during execution or run time
known as dynamic compilation


Explain the @Component decorator
it is basically a typescript class that is used to create a component which is decorated with the 
@Component decorator. Its purpose is to accept a metadata object that provides properties like
selector
templateUrl: it points to a html file that defines what is seen in an application
styleUrl etc

What are services in angular
Angular services perform task that are usedby multiple components
A component can delegate tasks like fetching data from the server, validating user input, or logging directly
to the console to the service
it can be written once and injected into all into all the components that use that service thus
avoiding redundant code

What are promises and observables
Promises emit a single value at a time
they also execute immediately after they are created and they do not cancel
they push error to the child promises
Observables are on executed when subscribed to them using the subscribe() method
They help perform operations like forEach, filter and retry amongst others
When the unsubscribe method is called, the listener stops receiving further value

What is ngOnInit and how is it defined

export class TestComponent implements OnInit, OnDestroy {
  constructor() { }
//....
  ngOnInit(): void {

  }
}

it is a life cycle hook and a callback method that is run by angular to indicate that a component has been
created
it takes no parameters and returns a void type

What is ngFor Directive


<ul>
    <li *ngFor = "let item of itemList"></li>
</ul>

it is used to iterate over an array or an object and create a template for each element
* "let item" creates a local variable that will be available in the template
* "of items" indicates that we are iterating over items
* the * before ngFor creates a parent template

What is Eager and lazy loading 

eager loading is the default module loading strategy. They are loaded before the application starts
they are typically used for small size application

Lazy loading dynamically loads the feature modules when there is a demand. This makes the application faster
it is used for bigger applications where all the modules are not required at the start of the application

What type of DOmM does Angular use
Angular uses a regular DOM which updates the entire tree structure of the html tags until it reaches the data
to be updated. However to ensure that the speed and performance are not affected,Angular implements change
detection

How is Dependency injection  achieved in angular

dependencies are objects or services that a component needs to perform functions
Using Dependency Injection classes can request dependencies from external sources 
rather than creating them

we can create a service from the angular CLI using the command

```
ng g s serviceName
```

it creates the service

```
@Injectable({
  providedIn: 'root'
})
export class ApiService {

 What are form controls and form groups
form control is a class that enables validation
for each input field, an instance of this class is created
this instances help check the values of the field and see if they are touched, untouched and dirty
valid, invalid and so on

form group class represents a group of controls
A form can have multiple control groups
they also provide validation errors

What is package.json
package.json is installed by npm when a new workspace is created
the file includes a super set of packages some of which are require by angular
it is typically divided into two groups
* Dependencies: they are essential to run the application
*DevDependencies: Neccessary to develop applications


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
//unary plus operator
const x = 1;
const y = -1;

console.log(+x);
// expected output: 1

console.log(+y);
// expected output: -1

console.log(+'');
// expected output: 0

console.log(+true);
// expected output: 1

console.log(+false);
// expected output: 0

console.log(+'hello');
// expected output: NaN

//literal notation and constructor
let re = /ab+c/i; // literal notation
let re = new RegExp('ab+c', 'i') 
// constructor with string pattern as first argument
let re = new RegExp(/ab+c/, 'i') 
// constructor with regular expression literal as first argument 
let re = /(\w+)\s(\w+)/
let str = 'John Smith'
let newstr = str.replace(re, '$2, $1')
console.log(newstr)
//using regular expressions on different line
let text = 'Some text\nAnd some more\r\nAnd yet\rThis is the end'
let lines = text.split(/\r\n|\r|\n/)
console.log(lines);
//using regular expressions on multiple lines
let s = 'Please yes\nmake my day!'

s.match(/yes.*day/);
// Returns null

s.match(/yes[^]*day/);
// Returns ["yes\nmake my day"]

let str = '#foo#'
let regex = /foo/y

regex.lastIndex = 1
regex.test(str)      // true
regex.lastIndex = 5
regex.test(str)      // false (lastIndex is taken into account with sticky flag)
regex.lastIndex  

//compose in rambda.js
const classyGreeting = (firstName, lastName) => "The name's " 
+ lastName + ", " + firstName + " " + lastName
const yellGreeting = R.compose(R.toUpper, classyGreeting);
yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"

R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
//currying in rambda.js
const addFourNumbers = (a, b, c, d) => a + b + c + d;

const curriedAddFourNumbers = R.curry(addFourNumbers);
const f = curriedAddFourNumbers(1, 2);
const g = f(3);
g(4); //=> 10