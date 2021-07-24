import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from "rxjs";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
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
  ngOnDestroy(){
    this.intervalSubscription.unsubscribe();
  }
}
