import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { DashboardModel } from '@models/dashboard.model';
import { HttpProtocols } from '@app/http/http.protocols';
import { combineLatest, interval, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';
import { map, startWith, switchMap, takeWhile } from 'rxjs/operators';
import { EventService } from '@app/services/event.service';
import { ApiserviceService } from 'app/apiservice.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit, OnDestroy {

  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  passDataToHeaderSub: Subscription
  userid_bh: string;
  id_coroebus_org: string;
  buisness_head_response: any;
  buisness_head_response_: any;
  constructor(public http: ApiserviceService, @Inject(DOCUMENT) private document: any, private router: Router,
    public languageService: LanguageService,
    public translate: TranslateService,
    private readonly store: Store,
    private eventService: EventService,
    private _route: ActivatedRoute,
    ) {
  }



  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
  @Output() closemenu = new EventEmitter();

  notificationStatusList: any
  userSelectionData: any
  combineLatest: Subscription
  notificationList_err: any
  pollingNotificationSubscription: Subscription
  headerInfo: any
  _routeSub: Subscription
  queryParams: any
  id_role:any
  top_toolbar_logo:any
  topbar_color:any
  Org_logo:any
  ngOnInit() {
  
    this.topbar_color= localStorage.getItem('topbar_color')
    // console.log(this.topbar_color);
    
    this.top_toolbar_logo= localStorage.getItem('theme_logo')
    this.openMobileMenu = false;
    this.element = document.documentElement;
    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
      this.notificationStatus()
      this.handlePolling()
    })
    // console.log(this.userSelectionData);
    
    this.id_role=this.userSelectionData._personal_data.id_role
    // console.log(this.id_role);
    if(this.id_role== 13){
      let bodyforBH={
    
        '_userid': this.userSelectionData?._personal_data?.USERID,
        '_org': this.userSelectionData?._personal_data?.id_coroebus_organization
  
        }
        // console.log(bodyforBH);
        
        this.http.buisnessHead(bodyforBH).subscribe(res=>{
          // console.log(res);
          this.buisness_head_response=res
        this.buisness_head_response_=this.buisness_head_response.data
        // console.log(this.buisness_head_response_);
        localStorage.setItem('bhresponse',this.buisness_head_response_._personal_data.organization_logo)
          this.Org_logo=localStorage.getItem('bhresponse')
        })
    }
    

    this.passDataToHeaderSub?.unsubscribe()
    this.passDataToHeaderSub = this.eventService.subscribe('passDataToHeader', (data) => {
      
      this.headerInfo = data
    })
    if (this.userSelectionData?.otherInfo) {
      this.headerInfo = this.userSelectionData?.otherInfo
    }
    this._routeSub = this._route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams
      // console.log(queryParams)
    })

   
  }

 
    
  RedirectionToHome(){
    // console.log(this.id_role);
    
    if(this.id_role==13){
      this.router.navigateByUrl('topdashboard')
    }
    else if(this.id_role == 8 || this.id_role == 9 ){
      // console.log('back');
      
      this.router.navigateByUrl('top_dashboard')
      

    }
    else if(this.id_role == 6 || this.id_role == 4 || this.id_role == 3 || this.id_role == 10){
      this.router.navigateByUrl('account/interactive-dashboard')

    }


  }
  
  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
    this.eventService.broadcast('requestForProduce1Data')

  }
  /**
   * Logout the user
   */
  logout() {
    this.router.navigate(['/account/login']);
  }
  async notificationStatus() {
    let err: any, res: any;
    let body: any;
    body = { "_userid": this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID, "_game": this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game };
    [err, res] = await HttpProtocols.to(DashboardModel.notificationStatus(body))
    if (!err && res?.statuscode === 200) {
      this.notificationStatusList = res
      //console.log(this.notificationStatusList)
    } else {
      this.notificationList_err = 'Error'
    }
  }
  ngOnDestroy(): void {
    this.combineLatest?.unsubscribe()
    this.passDataToHeaderSub?.unsubscribe()
  }
  handlePolling() {
    this.pollingNotificationSubscription?.unsubscribe()
    this.pollingNotificationSubscription = interval(30000).pipe(
      switchMap(() => this.notificationStatus()),
      map(res => {})
    ).subscribe(res => { }, err => { })
  }

  closeMenuTop(){
    this.closemenu.emit();
// console.log("hello");

    
  }
}
