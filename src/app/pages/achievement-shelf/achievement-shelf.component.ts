import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '@app/services/event.service';
import { ToastService } from '@app/services/toast-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ApiserviceService } from 'app/apiservice.service';
import { Util } from '@app/utils/util';
import { takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../core/app-state';
import { Subscription, combineLatest, Subject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-achievement-shelf',
  templateUrl: './achievement-shelf.component.html',
  styleUrls: ['./achievement-shelf.component.scss'],
  providers: [DatePipe]

})

export class AchievementShelfComponent implements OnInit {
  myDate = new Date();

  constructor(private readonly store: Store, private modalService: NgbModal,
    public Util: Util, private eventService: EventService, private _router: Router,
    private _route: ActivatedRoute, public toastService: ToastService, public http: ApiserviceService, public element: ElementRef,@Inject(DOCUMENT) document: Document,private datePipe: DatePipe) { 
     

    }
 

  userObj: any
  mergeObj: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  seasonal_theme_response: any
  currentDate:any
  currentdatetransform:any
  lo:any
  date:any
  cardstatus: boolean=false
  cardstatus1: boolean=false
  popover: boolean=false


  ngOnInit(): void {

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
 
     this.currentDate = new Date();
    console.log(this.currentDate);

    this.currentdatetransform = this.datePipe.transform(this.currentDate, 'dd MMM YYYY');
    console.log(  this.currentdatetransform );

    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      console.log(this.userObj);

      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      console.log(this.mergeObj);

      let body = {
        _userid: this.mergeObj.USERID,
        _game: this.mergeObj.id_coroebus_game,
      }

      console.log(body);
      this.http.seasonal_theme(body).subscribe((res) => {
        console.log(res)

        this.seasonal_theme_response = res;
        this.seasonal_theme_response = Array.of(this.seasonal_theme_response);
        console.log(this.seasonal_theme_response);
        console.log(this.seasonal_theme_response[0].data.length);

        this.calculate(this.seasonal_theme_response)
        for(let k=0;k<=this.seasonal_theme_response[0].data.length;k++){
          this.lo = this.seasonal_theme_response[0].data[k].end_date
          console.log(this.lo);
           this.date = new Date(this.lo);
          console.log(this.date);
        }
          

      //   debugger
      // this.seasonal_theme_response[0].data.forEach((element: any) => {
      //     this.lo = element.end_date;
      //     this.date = new Date(this.lo);
      //     console.log(this.date);
      //     console.log(this.currentDate);
          
      //     if(this.date>this.currentDate){
      //       console.log("running");
      //       this.cardstatus= true
      //       this.cardstatus1= false
      //   }
      //  else if(this.date<this.currentDate){
      //     console.log("expiry");
      //     this.cardstatus1=true
      //     this.cardstatus= false

  
      //  }
         
      //   });

     
  



        // for(let k=0;k<=this.seasonal_theme_response[0].data.length;k++){
        //   this.lo = this.seasonal_theme_response[0].data[k].end_date
        //   console.log(this.lo);
        //    this.date = new Date(this.lo);
        //   console.log(this.date);
          
        //
  
        

       
        // lo=new Date();
        // if( lo != this.currentdatetransform){
          
        //   console.log(this.currentdatetransform);
          
        // }



      })


    })

  }

  scorll(details: any,index:any) {

    console.log(details,index+1);
    const elem=(<HTMLInputElement>document.getElementById('imgList'+index))

      console.log(elem)
      elem.scrollBy(750, 0);
    
  }

  leftscroll(details: any,index:any) {
    const elem=(<HTMLInputElement>document.getElementById('imgList'+index))
   

    console.log(elem)
    elem.scrollBy(-750, 0);


    


  }
  

  trackList = (index) => {

    return index;

  }

  calculate(seasonal_theme_response){
    console.log(this.seasonal_theme_response[0].data);
    
    let end =new Date().getTime
  }

  // clickinfo(index:any)
  // {
    
  // }

  popoverDetails(details:any,index:any){
    console.log(details);
    console.log(details,index+1);
    
    // const elem=(<HTMLInputElement>document.getElementById('popover_content'+index));
    // console.log(elem);
    (<HTMLInputElement>document.getElementById('popover_content'+index)).style.visibility = "visible";
    // let e = document.getElementById('popover_content'+index);
    // if(e){
    //   e.click();
      if(this.popover==false){
        (<HTMLInputElement>document.getElementById('popover_content'+index)).style.visibility = "visible";
        this.popover=true
      }
      else{
        (<HTMLInputElement>document.getElementById('popover_content'+index)).style.visibility = "hidden";
        this.popover=false
      }
    // }
    
   
    
  }

  
  
}



