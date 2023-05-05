import { Component, OnInit } from '@angular/core';
import { Observable,catchError,filter,from,fromEvent,interval,map,of, retry } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Observables';

  // FirstObservable=new Observable((observer)=>{
  //     setTimeout(()=>{observer.next(10)},1000)
  //     setTimeout(()=>{observer.next(20)},2000)
  //     setTimeout(()=>{observer.next(30)},3000)
  //     setTimeout(()=>{observer.error(new Error("Something Went Wrong"))},4000)
  //     setTimeout(()=>{observer.next(40)},5000)
  //     setTimeout(()=>{observer.next(50)},6000)
  //     setTimeout(()=>{observer.complete()},7000)
  // }
  //);
  name="pavan"
  array=[10,20,30]
  numbers=[1,2,3]


  FirstObsevable=of(this.name)
  observer={
    next:(value:string)=>{console.log(value)},
    error:(error:Error)=>{console.log(error)},
    // complete:()=>{alert("Completed")}
  }

  SecondObservable=of(this.array)
  observerTwo={
    next:(value:number[])=>{value.forEach(item=>console.log(item))},
    error:(error:Error)=>{console.log(error)}
  }

  ThirdObservable=from(this.numbers)
  observerThree={
    next:(value:number)=>{console.log(value)},
    error:(error:Error)=>{console.log(error)}
    
  }

  MyObservable=from(this.numbers)
  TransferObservable=this.MyObservable.pipe(map((value)=>{return value*2;}))
  ToFilter=this.TransferObservable.pipe(filter((value)=>{return value==4;}))

  FetchData=from(fetch("https://jsonplaceholder.typicode.com/users"))
  observerData={
    next:(response:any)=> {console.log(response);},
    error:(error:Error)=> {console.log(error)}
  }

  // fetchData = from(fetch("https://jsonplaceholder.typicode.com/users"));

  // observerableData = {
  //   next: (response:any) => {
  //     response.json().then(data => {
  //       const names = data.map(user => user.name);
  //       console.log(names);
  //     });
  //   },
  //   error: (error: Error) => {
  //     console.log(error);
  //   },
  //   complete: () => {
  //     console.log('Data fetching completed.');
  //   }
  // };

  CatchError=new Observable((observerToCatch)=>{
    observerToCatch.next('p'),
    observerToCatch.next('a'),
    observerToCatch.next('v'),
    observerToCatch.error("Error has occured")
  }
  )
 
  IntervalObserver=interval(1000)
  count:any

  subject = new Subject<number>();
 

  

  ngOnInit(): void {
  //   this.FirstObservable.subscribe((value)=>{console.log(value)},
  //   (error)=>{
  //     alert(error.message)
  //   },()=>{
  //     alert("Obsevable Completed")


      this.FirstObsevable.subscribe(this.observer);
      this.SecondObservable.subscribe(this.observerTwo);
      this.ThirdObservable.subscribe(this.observerThree)

      this.TransferObservable.subscribe((value)=>{console.log(value)})
      this.ToFilter.subscribe((value)=>{console.log(value)})

      this.FetchData.subscribe(this.observerData)

      // this.CatchError.subscribe({next:(data)=>{console.log(data)},complete:()=>{console.log("completed")}})

      // this.CatchError.pipe(catchError((error)=>{return of('a','n')})).subscribe({next:(data)=>{console.log(data)},complete:()=>{console.log("completed")}})
      this.CatchError.pipe(retry(2)).subscribe({next:(data)=>{console.log(data)},complete:()=>{console.log("completed")}})

      const tag=document.getElementById("name")!;
      const moveMouse=fromEvent<MouseEvent>(tag,'mousemove');
      moveMouse.subscribe((tag)=>{
        console.log("Trigger Event")
      }
      )

      this.count=this.IntervalObserver.subscribe((value)=>{console.log(value)})

      this.subject.subscribe({
        next: (valueOne) => console.log(valueOne),
      });
      this.subject.subscribe({
        next: (valueTwo) => console.log(valueTwo),
      });

      this.subject.next(1);
      this.subject.next(2);  
    
   }
   ToUnsubscribe(){
    this.count.unsubscribe();
   }
    
  }


