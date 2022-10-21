import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, combineLatest, Subject, Observable } from 'rxjs';
import * as fromRoot from '../../core/app-state';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '@app/services/event.service';
import { ToastService } from '@app/services/toast-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Util } from '@app/utils/util';
import { takeUntil } from 'rxjs/operators';
import { ApiserviceService } from 'app/apiservice.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
declare var $;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable', { static: false }) table;
  dataTable: any;

  combineLatest: Subscription
  _routeSub: Subscription
  userSelectionData: any
  queryParams: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  mergeObj: any
  requestdata: any;
  rewardresponse: any;
  fulldescription: any;
  color: any;
  data1: any;
  data2:any
  modeldata: any;
  // requestdata: any[] = [];
  // requestdata: Observable<any>;
  term: any;
  searchText: string;
  passDataToHeaderSub: Subscription

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  filterCoreGame: any=[];
  coreGame: any;

  constructor(private readonly store: Store, private modalService: NgbModal,
    public Util: Util, private eventService: EventService, private _router: Router,
    private _route: ActivatedRoute, public toastService: ToastService, public http: ApiserviceService, public element: ElementRef, public dialog: MatDialog) { }

  openMobileMenu: boolean;
  headerInfo: any
  popupresponse: any
  data: any


  ngOnInit(): void {

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }


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
      this.http.rewards(body).subscribe((res) => {
        console.log(res)
        // console.log( res.data.points_list[0].label);

        // const response = res.data.points_list[0].label

        // this.requestdata=responce

        this.rewardresponse = res;
        this.filterCoreGame=res;
        // this.filterCoreGame=res;

       

         console.log(this.filterCoreGame);
        console.log(this.rewardresponse);
        console.log(this.filterCoreGame);
        this.rewardresponse = Array.of(this.rewardresponse);
        console.log(this.rewardresponse);
        console.log(this.rewardresponse[0].data.points_list[0].description_);
      })
    })
    this.dynamicColor()
  }
  
  key = 'date_time';  
  reverse = false;
  sortList(key) {
    this.key = key;
    this.reverse = !this.reverse;
  
  }

  // filteredCoreGames(category:unknown){
  //   this.filterCoreGame=this.rewardresponse[0].data.points_list[1]._data.filter(element => {
  //     if(element.description_===category || category==''){
  //        return element;
  //        }
  //    })
  //    console.log(this.filterCoreGame);
   


  // }


  dynamicColor() {
    // $('#example').DataTable();
    this.openMobileMenu = false;

    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }

    })
    this.passDataToHeaderSub?.unsubscribe()
    this.passDataToHeaderSub = this.eventService.subscribe('passDataToHeader', (data) => {
      this.headerInfo = data
      console.log(this.headerInfo);

    })
    if (this.userSelectionData?.otherInfo) {
      this.headerInfo = this.userSelectionData?.otherInfo
      console.log(this.headerInfo);
      this.color = this.headerInfo.color; //yellowcolor
      console.log(this.color);
      this.element.nativeElement.style.setProperty('--myvar', `${this.color}`)

      // this.element.nativeElement.style.setProperty('--mycolor',`${this.color}`)
      // console.log( this.element.nativeElement.style.setProperty('--myvar',`${this.color}`));


    }
    this._routeSub = this._route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams
      console.log(queryParams)
    })
  }

  value = '2';

  onChange(event) {
    this.value = event.target.value;
    console.log(this.value);

  }

  navigateToLogicalBaniya() {
    this.ngOnInit();
    console.log(this.rewardresponse);

    const url = this.rewardresponse[0].data.rewardTypes[0].apiurl
    console.log(url);


    window.location.href = url;

    // this._router.navigate('')
  }



  showhidetext(index: any) {
    console.log(index);

    var dots = document.getElementById('dots'+index);
    var moreText = document.getElementById('more'+index);
    var btnText = document.getElementById('more_text'+index);

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "More";
      (<HTMLInputElement>document.getElementById('more'+index)).style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Less";
      (<HTMLInputElement>document.getElementById('more'+index)).style.display = "inline";
    }
  }


  


  popupRedemed(rewardresponse: any) {

    this.data = rewardresponse
    console.log(this.data);
    console.log(this.data.log_id);

    let body = {
      _userid: this.mergeObj.USERID,
      _game: this.mergeObj.id_coroebus_game,
      log_id: this.data.log_id
    }

    console.log(body);

    this.http.popup_passbook_redemption(body).subscribe((res) => {
      console.log(res)



      this.popupresponse = res;

      this.popupresponse = Array.of(this.popupresponse);
      console.log(this.popupresponse);

      console.log(this.popupresponse[0].data.couponid);


    })



  }

  redemeedOrg(rewardlist: any) {
    console.log(rewardlist);

    this.modeldata = rewardlist

    console.log(this.modeldata);
    this.modeldata = Array.of(this.modeldata);
    console.log(this.modeldata);



  }

  organisationrewardredeem(modeldata: any) {
    this.data1 = modeldata
    console.log(this.data1);

    this.data2 = this.rewardresponse
    console.log(this.data2);
    

    let body = {

       _userid: this.mergeObj.USERID,
       id_reward: this.Util.encryptData(this.data1[0].id_coroebus_redeem_rewards),
       redeem_points: this.Util.encryptData(this.data1[0].redeem_point),
       rewardPoints: this.Util.encryptData(this.data2[0].data.points_list[0]._data.rewardPoints.toString())


      // _userid: this.mergeObj.USERID,
      // id_reward:this.data1[0].id_coroebus_redeem_rewards,
      // redeem_points: this.data1[0].redeem_point,
      // rewardPoints: this.data2[0].data.points_list[0]._data.rewardPoints.toString()
    }
    console.log(body);


    this.http.redeemed(body).subscribe((res) => {
      console.log(res)

      Swal.fire({
        title: 'Success',
        text: 'Thank You, You have successfully redemeed reward',
        icon: 'success',
        // confirmButtonText: 'Close'
      })
      window.setTimeout(function(){ 
        location.reload();
    } ,3000);

    })

    



  }


  

  ngAfterViewInit(): void {
    // $('#example').DataTable();
    // this.dataTable=$(this.table.nativeElement);
    // this.dataTable.DataTable();
  }

}
