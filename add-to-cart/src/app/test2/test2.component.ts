import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  
onstructor(private route: ActivatedRoute) { }

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



