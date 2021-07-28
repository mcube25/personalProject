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
    if the observable provides this on the observer object. Let us take a look at an example in code.

    let button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
  .subscribe(value => console.log(value)
  );



   */

constructor(private route: ActivatedRoute) { }

ngOnInit(): void {
  this.route.data.subscribe((data)=>{console.log(data);
  })
}

}
