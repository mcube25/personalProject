import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, of } from 'rxjs';
import { debounceTime, map, mapTo, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {

  /**
   We can also understand observables as wrappers on data source. Data source means a stream of values.
   Observables are typically used for asynchronous data though they are not limited to this which is extremely
   important. They can also be wrapped around a synchronous data source too. The observer is there to execute
   some code whenever a new value or error is received from the observable or when the observable completes.
   The observable therefore does all this and it needs to be connected to the observable. This is done 
   through the subscription. 
   The subscription is a single method that ties the observable to a stream of values that the observer
   is listening about for. The observer on the other hand implements three methods on the observable. These 
   methods are
   *next();
   *error();
   *complete();
   next(): the next() method will be executed whenever a new value is is received
   error(): the error() method is called whenever the observable encounters an error
   complete(): This method is called whenever the observable is done
   Some observables will never complete especially if they are wrapped on an onClick button. This is 
   because there is a tendency for a user to click the button again and again. 
   The contract between an observable and an observer is the subscription. The observable knows that the 
   observer could fire a next(), error(), complete() method, while the observer knows that the observable
   can fire only one of this three method.
         THE STREAM
    An observable is just a wrapper around a stream of values. We can have a single value or multiple values
    Whatever the case maybe we have an observer which can handle multiple values. 
    At the end we might have an endpoint when the observable is done or the end might never occur as in 
    the case of the onClick. If we do complete the observable though, we can call end and execute complete()
    if the observable provides this on the observer object. Let us take a look at an example in code in angular component.
    Let us create a button in our html file

<button>Click me</button>

then in our ts file, 
  
constructor(private route: ActivatedRoute) { }

ngOnInit(): void {
  this.route.data.subscribe((data)=>{console.log(data);
  })
}

The subscribe method above is the observer and the function value, is the next() function.
We can wrap the above function in a variable. In that case it will look like this

```
var observer = {
    next: function(data) {
      console.log(data)
    },
    error: function(error){
     console.log(error) 
    },
    complete: function() {
      console.log("done")
    }
  }
```
Then the variable can easily be passed to a subscribe method. Example

```
ngOnInit(): void {
  
   this.route.data.subscribe(observer);

  var observer = {
    next: function(data) {
      console.log(data)
    },
    error: function(error){
     console.log(error) 
    },
    complete: function() {
      console.log("done")
    }
  }
}
```
                              CREATING AN OBSERVABLE FROM SCRATCH
    To build an observable from scratch, an rxjs method called create() is used. This method creates a new observable that will execute
    the specified function when an observer subscribes to it. The create() method takes only one argument which is the observer. Let us
    create an observable using this 
    We will use reactivex.io to get our observable instance

    ```
Rx.Observable.create();
    ```

    NB: Check reactivex.io for documentation

    We will pass an anonymous function to the create() method

    ```
 Rx.Observable.create((obs) => {
      obs.next().subscribe(observer)
    });
    ```

    This anonymous function takes an argument obs and passes it as an observer to the anonymous function. This is how an observable is 
    created. The next() method can now be called in the anonymous function because observables know that the observer has the next(),
    error() and complete() methods. All this methods can be passed into the anonymous function.
    If an error occurs, the observable is finished. It won't call another next() or complete() method.
    Justlike with error() method. The complete() completes an observable thereby preventing the call of any other method when implemented.
   */


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    Rx.Observable.create((obs) => {
      obs.next().subscribe(observer)
    });
    this.route.data.subscribe((data) => {
      console.log(data);
    })

    var observer = {
      next: function (data) {
        console.log(data)
      },
      error: function (error) {
        console.log(error)
      },
      complete: function () {
        console.log("done")
      }
    }
    this.route.data.subscribe(observer)
  }

}
//diff between map and switchMap
this.route.data.subscribe((data) => {
  console.log(data);
}).pipe(
  debounceTime(2000),
  switchMap(() => interval(500))
).setTimeout(() => {

}, timeout);
function timeout(arg0: () => void, timeout: any) {
  throw new Error('Function not implemented.');
}

let a = [2, 3];
let b = a.map(v => v * 3);
console.log(b);
//of gives a stream of data it emits one at a time
of(3, 4, 4, 5).pipe(
  map(n => n / 3)
).subscribe(console.log);
// if we have an object with a lot of data and we want to stream just 2 or 3

@Injectable({
  providedIn: 'root',
})

export class HttpService {
  constructor(private http: HttpClient) { }
  getData(id: string) {
    return this.http.get<string>('http://id.me/data');
  }

  get(url: string) {
    return this.http.get(url);
  }
}

//use the service
this.HttpService.get('https://jsonplaceholder.com').pipe(
  map((res: any) => res.map(data => {
    return {
      id: data.id,
      completed: data.completed
    }
  })
  )
).subscribe(console.log()
)

//mapTo is similar to map just that it returns a single value
of(3, 4, 4, 5).pipe(
  mapTo('request')
).subscribe(console.log);

//functional programming
//functional programming often use pipe and compose functions
//they are higher order functions
//a higher order function is any function that takes a function as an argument, returns a function or both

//lets start with compose 

const dreamBig = (db) => { return console.log('hello' + db / 8) }
const dreamSmall = (ds) => { return console.log('hello' + ds + 6) };
const dreamLittle = (dl) => { return console.log('hello' + dl * 6); }

const result = dreamBig(dreamSmall(dreamLittle(4)));
console.log(result);
//nested functions execute from right to left
//Ramda.js and lodash libraries both have their own compose and pipe functions
//lodash calls its pipe flow
//the reduce function takes a list of values and applies a function
//to each of those values, accumulating a single result
//to get the compose order fron right to left as we see with nested functions calls in our example above
//we need reduceRight() method
const compose = (...ftn) => val => ftn.reduceRight((prev, fn) => fn(prev), val);
//the above method uses the currying method. if you don't know about currying i suggest you look here
//we call or invoke the function immediately
//we call our 3 functions created above
//its going to start from the right and terminate at the left
const composeResult = compose(dreamBig, dreamSmall, dreamLittle)(8)
console.log(composeResult);

//Pipe
//if you don't like reading from right to left as done in compose
//pipes essentially change the order of compose from left to right
//it is the same but instead of the reduceRight it uses the reduce method
const pipe = (...ftn) => val => ftn.reduce((prev, fn) => fn(prev), val);
const pipeResult = pipe(dreamLittle, dreamSmall, dreamBig)(8)
console.log(pipeResult);
//u will also often see the functions on a seperate line whether you are using a pipe or compose

const composeResult2 = compose(
  dreamBig,
  dreamSmall,
  dreamLittle
)(8);
//the examples we have looked at use a pointer free style and with unary functions we don't see 
//the parameter passed between each function, only the parameters passed at the end of the compose or
//pipe function if we are immediately invoking the function.

// Let us take a look at an example where if we have possibly more than one parameter
//or when not working with a unary function

const divideBy = (divisor, num) => num / divisor;
//this function requires two parameters, the divisor and the num and it implicitly returns the result
const pipeResult3 = pipe(
  dreamBig,
  dreamSmall,
  dreamLittle,
  x => divideBy(7, x)
)(8);
console.log(pipeResult3);
// look at how we provide divideBy using the pipe method
//all the results gotten from each of the functions is being passed to x
//then we use an anonymous function and we call divideBy, we provide a number and x goes into the 
//function.
// this is how to reduce a function with multiple parameters in a pipe or compose function
// could we curry the divideby function to get a unary function if we have already hard coded the a
// number in the compose or method pipe
const multiplyBy = (multiplier) => (num) => num * multiplier;
const multiplyBy2 = multiplyBy(2); //partially applied unary function
//we can now do this
const pipeResult4 = pipe(
  dreamBig,
  dreamSmall,
  dreamLittle,
  multiplyBy2
)(8);
console.log(pipeResult3);
console.log(pipeResult4);
//it will still work like the other unary function
//let us look at some other examples that are not math functions

const bahrain = "bahrain is a ccountry situated in the eastern part of arabia precisely the middle east"
//here we are just going to count the words in the paragraph
//lets define a couple of functions
const spaceSPlit = (str: string) => str.split(' ');
const number = (arr: string | any[]) => arr.length;
// the spaceSplit method is going to look for each space in the paragraph
//while the function number is going to count how many words we have after splitting the string

const howMany = pipe(
  spaceSPlit,
  number
);
// if we create a pipe function and apply it on the string it will invoke first the spaceSplit sunction 
// and then the number function. We don't have to call the function immediately but we can go ahead and log
//the function
console.log(howMany(bahrain));




















