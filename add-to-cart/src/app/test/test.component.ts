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
  country:'Nigeria'
};

let myArray = ['hello', 'i', 'do', 'code'];
 let obs = of(23, myArray, obj, 'girlie', {} );

 obs.subscribe(data => console.log(data));

 setTimeout(()=>{
   obs.subscribe(data=>console.log(data))
 },2000);

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
  next(num){console.log('ist subscriber' + num);
  complete(){console.log('sequence finished');
  }
  }
});

setTimeout(()=>{
  sequence.subscribe({
    next(num){console.log('2nd subscriber' + num);
    complete(){console.log('sequence finished');}
    }
  })
},3000);



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

  multipleSubscriber(){
    const arr = [2,3, 4,5,6,7,8,9,0];
    return (observer) =>{
      this.run(observer,arr,0);
      return {
        unsubscribe(){
          
        }
      }
    }
  }
run(observer,arr,index){
 return setTimeout(()=>{
   observer.next(arr[index]);
   if (index===arr.length-2) {
     observer.complete();
   }else{
     this.run(observer,arr, ++index);
   }
 },2000) 
}
}
