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
import { MdePopoverTrigger } from '@material-extended/mde';	
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-achievement-shelf',
  templateUrl: './achievement-shelf.component.html',
  styleUrls: ['./achievement-shelf.component.scss'],
  providers: [DatePipe]

})

export class AchievementShelfComponent implements OnInit {
  myDate = new Date();
  pageInfo: any;

  constructor(private readonly store: Store, private modalService: NgbModal,
    public Util: Util, private eventService: EventService, private _router: Router,
    private _route: ActivatedRoute, config: NgbPopoverConfig, public toastService: ToastService, public http: ApiserviceService, public element: ElementRef,@Inject(DOCUMENT) document: Document,private datePipe: DatePipe) { 
      config.placement = 'bottom';	
      config.triggers = 'click';   

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
  bagde_details: any
  bagde_details_response:any
  badge_details_date:any
  seasonal_total_points:any
  seasonal_total_points_response:any
  combineLatest: Subscription
  userSelectionData:any
  game_ID:any
  showCombo: any= []
  ngOnInit(): void {

    // this.pageInfo = localStorage.getItem('page');
    // console.log(this.pageInfo);
    // if(this.pageInfo!="undefined"){
    //   setTimeout(()=>{
    //     if (!localStorage.getItem('foo')) { 
    //       localStorage.setItem('foo', 'no reload') 
    //       location.reload() 
    //     } else {
    //       localStorage.removeItem('foo') 
    //     }
    //   },2000)
      
    // }

 
     this.currentDate = new Date();
     this.game_ID= localStorage.getItem('body_game')


    this.currentdatetransform = this.datePipe?.transform(this.currentDate, 'dd MMM YYYY');
    

    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      

      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      

      this.combineLatest = combineLatest([
        this.store.select(fromRoot.userLogin),
        this.store.select(fromRoot.usertheme),
        this.store.select(fromRoot.usergame),
      ]
      ).subscribe(([login, theme, game]) => {
        
        this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
       
       
  
      })

      if(this.userObj.games.length >0){

        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.userObj.games[0]?.id_coroebus_game,
        }
  
        
        this.http.seasonal_theme(body).subscribe((res) => {
          
  
          this.seasonal_theme_response = res;
          this.seasonal_theme_response = Array.of(this.seasonal_theme_response);
          
          
  
  
  
  
  
          this.showCombo=this.seasonal_theme_response[0]?.data
          this.showCombo.map((x:any) => {
        
              
             x['islessThanToday']= new Date(x.end_date) < this.currentDate;
                  
                  
          });
             
          
         
         
            
  
  
  
          // this.calculate(this.seasonal_theme_response)
          // for(let k=0;k<=this.seasonal_theme_response[0].data.length;k++){
          //   this.lo = this.seasonal_theme_response[0].data[k].end_date
          //   
          //    this.date = new Date(this.lo);
          //   
          // }
            
  
        })
  
  
        this.http.seasonal_rewards_points(body).subscribe((res) => {
          
          this.seasonal_total_points=res
          this.seasonal_total_points_response= this.seasonal_total_points?.data[0]
          
          
          
        })

        let body_engagement={
          _userid:this.mergeObj?.USERID,
          _game:this.userObj.games[0]?.id_coroebus_game,
          _device:"W",
          _section:"Achievement Shelf",
          _description:"Achievement Shelf"
        }
    
        this.http.engagamentlog(body_engagement).subscribe(res=>{
          
          
        })
      }
  
      else if(this.userObj.games.length == 0){
        let body = {
          _userid: this.mergeObj?.USERID,
          _game: this.userSelectionData?.id_coroebus_game,

        }
  
        
        this.http.seasonal_theme(body).subscribe((res) => {
          
  
          this.seasonal_theme_response = res;
          this.seasonal_theme_response = Array.of(this.seasonal_theme_response);
          
          
  
  
  
  
  
          this.showCombo=this.seasonal_theme_response[0]?.data
          this.showCombo.map((x:any) => {
        
              
             x['islessThanToday']= new Date(x.end_date) < this.currentDate
                  
                  
          });
             
          
         
         
            
  
  
  
          // this.calculate(this.seasonal_theme_response)
          // for(let k=0;k<=this.seasonal_theme_response[0].data.length;k++){
          //   this.lo = this.seasonal_theme_response[0].data[k].end_date
          //   
          //    this.date = new Date(this.lo);
          //   
          // }
            
  
        })
  
  
        this.http.seasonal_rewards_points(body).subscribe((res) => {
          
          this.seasonal_total_points=res
          this.seasonal_total_points_response= this.seasonal_total_points?.data[0]
          
          
          
        })


        let body_engagement={
          _userid:this.mergeObj?.USERID,
          _game: this.userSelectionData?.id_coroebus_game,
          _device:"W",
          _section:"Achievement Shelf",
          _description:"Achievement Shelf"
        }
    
        this.http.engagamentlog(body_engagement).subscribe(res=>{
          
          
        })
      }

    })

  }

  scorll(details: any,index:any) {

    
    const elem=(<HTMLInputElement>document.getElementById('imgList'+index))

      
      elem.scrollBy(750, 0);
    
  }

  leftscroll(details: any,index:any) {
    const elem=(<HTMLInputElement>document.getElementById('imgList'+index))
   

    
    elem.scrollBy(-750, 0);


    


  }
  

  trackList = (index) => {

    return index;

  }

  calculate(seasonal_theme_response){
    
    
    let end =new Date().getTime
  }

  // clickinfo(index:any)
  // {
    
  // }

  popoverDetails(details:any,index:any){

    if(this.userObj?.games?.length >0){
      let body_engagement={
        _userid:this.mergeObj?.USERID,
        _game:this.userObj?.games[0]?.id_coroebus_game,
        _device:"W",
        _section:"Achievement Shelf",
        _description:"Season Details"
      }
  
      this.http.engagamentlog(body_engagement).subscribe(res=>{
        
        
      })
     }
     else if(this.userObj?.games?.length == 0){
      let body_engagement={
        _userid:this.mergeObj?.USERID,
        _game: this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Achievement Shelf",
        _description:"Season Details"
      }
  
      this.http.engagamentlog(body_engagement).subscribe(res=>{
        
        
      })
     }
      
    
    
    
    // const elem=(<HTMLInputElement>document.getElementById('popover_content'+index));
    // 
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

  getBadgesDetail(carauseldata:any,index:any){
    if(this.userObj.games.length >0){
      let body_engagement={
        _userid:this.mergeObj?.USERID,
        _game:this.userObj.games[0]?.id_coroebus_game,
        _device:"W",
        _section:"Achievement Shelf",
        _description:"Badge Details"
      }
  
      this.http.engagamentlog(body_engagement).subscribe(res=>{
        
        
      })
     }
     else if(this.userObj?.games?.length == 0){
      let body_engagement={
        _userid:this.mergeObj?.USERID,
        _game: this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Achievement Shelf",
        _description:"Badge Details"
      }
  
      this.http.engagamentlog(body_engagement).subscribe(res=>{
        
        
      })
     }

    
    let body = {
      _userid: this.mergeObj.USERID,
      _game: this.mergeObj?.id_coroebus_game,
      _seasonal_theme: carauseldata?.id_seasonal_theme,
      _badge_id:carauseldata?.id_seasonal_badge
    }

    
    this.http.popup_bagde_details(body).subscribe((res) => {
      
      this.bagde_details=res
      this.bagde_details = Array.of(this.bagde_details);
      this.bagde_details_response=this.bagde_details[0]?.data[0]
      
      
    
      this.badge_details_date=this.bagde_details[0]?.data[1]
      
      this.badge_details_date.badge_win_date=Array.of(this.badge_details_date?.badge_win_date)
      
      
      
    })
  }
  
}



