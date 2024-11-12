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
  pageInfo: any;
  kpiData: any;
  labelArray: any = [];
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
  id_role: any
  top_toolbar_logo: any
  topbar_color: any
  Org_logo: any
  seasonalData: any
  isinM2ostPlatform: boolean = true;
  ngOnInit() {
    this.pageInfo = localStorage.getItem('page');
    console.log(this.pageInfo);


    if (this.pageInfo === "undefined") {
      console.log(true);

      this.isinM2ostPlatform = true;
    } else {
      console.log(false);
      console.log('pageInfo is undefined. Not reloading the page.');
      this.isinM2ostPlatform = false;
    }


    this.topbar_color = localStorage.getItem('topbar_color')
    // console.log(this.topbar_color);

    this.top_toolbar_logo = localStorage.getItem('theme_logo')
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
      this.getPointDist()
      this.GetDataFromProduceInfo()

    })
    console.log(this.userSelectionData);

    this.id_role = this.userSelectionData._personal_data.id_role
    // console.log(this.id_role);
    if (this.id_role == 13) {
      let bodyforBH = {

        '_userid': this.userSelectionData?._personal_data?.USERID,
        '_org': this.userSelectionData?._personal_data?.id_coroebus_organization

      }
      // console.log(bodyforBH);

      this.http.buisnessHead(bodyforBH).subscribe(res => {
        // console.log(res);
        this.buisness_head_response = res
        this.buisness_head_response_ = this.buisness_head_response.data
        console.log(this.buisness_head_response_);
        localStorage.setItem('bhresponse', this.buisness_head_response_._personal_data.organization_logo)
        this.Org_logo = localStorage.getItem('bhresponse')
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



  RedirectionToHome() {
    // console.log(this.id_role);

    if (this.id_role == 13) {
      this.router.navigateByUrl('topdashboard')
    }
    else if (this.id_role == 8) {
      // console.log('back');

      this.router.navigateByUrl('top_dashboard')


    }
    else if (this.id_role == 7) {
      this.router.navigateByUrl('/spectator/spectatorView')
    }
    else if (this.id_role == 9 || this.id_role == '9') {
      this.router.navigateByUrl('/top_dashboard')
      setTimeout(() => {
        window.location.reload();
      }, 2000)


    }
    else if (this.id_role == 6 || this.id_role == 4 || this.id_role == 3 || this.id_role == 10) {
      if (this.isinM2ostPlatform) {
        this.router.navigateByUrl('account/interactive-dashboard');
      }
      else {
        window.open('https://www.m2ost.in/M2OST_Console_PriME/Dashboard/Index');
      }
    }
  }

  RedirectionChatBot() {
  
    if (this.id_role == 13) {
      // console.log(`http://13.232.97.76:8000/assistant?business_id_coroebus_measurement_First=${this.buisness_head_response_?._business_score[0]?.id_coroebus_measurement}&business_id_coroebus_measurement_Second=${this.buisness_head_response_?._business_score[1]?.id_coroebus_measurement}&business_id_coroebus_measurement_Third=${this.buisness_head_response_?._business_score[2]?.id_coroebus_measurement}&business_id_coroebus_measurement_Forth=${this.buisness_head_response_?._business_score[3]?.id_coroebus_measurement}&business_id_coroebus_measurement_Fifth=${this.buisness_head_response_?._business_score[4]?.id_coroebus_measurement}&governance_id_coroebus_measurement_First=${this.buisness_head_response_?._governance_score[1]?.id_coroebus_measurement}&governance_id_coroebus_measurement_Second=${this.buisness_head_response_?._governance_score[2]?.id_coroebus_measurement}&governance_id_coroebus_measurement_Third=${this.buisness_head_response_?._governance_score[3]?.id_coroebus_measurement}&governance_id_coroebus_measurement_Forth=${this.buisness_head_response_?._governance_score[4]?.id_coroebus_measurement}&rankingtable_name_First=${this.buisness_head_response_?._ranking_data[0]?._data[0]?.rankingtable_name}&rankingtable_name_Second=${this.buisness_head_response_?._ranking_data[0]?._data[1]?.rankingtable_name}&rankingtable_name_Third=${this.buisness_head_response_?._ranking_data[0]?._data[2]?.rankingtable_name}&rankingtable_name_Forth=${this.buisness_head_response_?._ranking_data[0]?._data[3]?.rankingtable_name}&rankingtable_name_Fifth=${this.buisness_head_response_?._ranking_data[0]?._data[4]?.rankingtable_name}&id_ref_measurement_First=${this.buisness_head_response_?._kpi_score[0]?.id_ref_measurement}&id_ref_measurement_Second=${this.buisness_head_response_?._kpi_score[1]?.id_ref_measurement}&id_ref_measurement_Third=${this.buisness_head_response_?._kpi_score[2]?.id_ref_measurement}&id_ref_measurement_Forth=${this.buisness_head_response_?._kpi_score[3]?.id_ref_measurement}`);
      window.open(`http://13.232.97.76:8000/assistant?id_coroebus_user=${this.userSelectionData?._personal_data?.id_coroebus_user}&userId=${this.userSelectionData?._personal_data?.USERID}&id_coroebus_game=${this.buisness_head_response_?.about_game[0]?.id_coroebus_game}&id_coroebus_organization=${this.userSelectionData?._personal_data?.id_coroebus_organization}&id_role=${this.userSelectionData?._personal_data?.id_role}&business_id_coroebus_measurement_First=${this.buisness_head_response_?._business_score[0]?.id_coroebus_measurement}&business_id_coroebus_measurement_Second=${this.buisness_head_response_?._business_score[1]?.id_coroebus_measurement}&business_id_coroebus_measurement_Third=${this.buisness_head_response_?._business_score[2]?.id_coroebus_measurement}&business_id_coroebus_measurement_Forth=${this.buisness_head_response_?._business_score[3]?.id_coroebus_measurement}&business_id_coroebus_measurement_Fifth=${this.buisness_head_response_?._business_score[4]?.id_coroebus_measurement}&governance_id_coroebus_measurement_First=${this.buisness_head_response_?._governance_score[1]?.id_coroebus_measurement}&governance_id_coroebus_measurement_Second=${this.buisness_head_response_?._governance_score[2]?.id_coroebus_measurement}&governance_id_coroebus_measurement_Third=${this.buisness_head_response_?._governance_score[3]?.id_coroebus_measurement}&governance_id_coroebus_measurement_Forth=${this.buisness_head_response_?._governance_score[4]?.id_coroebus_measurement}&rankingtable_name_First=${this.buisness_head_response_?._ranking_data[0]?._data[0]?.rankingtable_name}&rankingtable_name_Second=${this.buisness_head_response_?._ranking_data[0]?._data[1]?.rankingtable_name}&rankingtable_name_Third=${this.buisness_head_response_?._ranking_data[0]?._data[2]?.rankingtable_name}&rankingtable_name_Forth=${this.buisness_head_response_?._ranking_data[0]?._data[3]?.rankingtable_name}&rankingtable_name_Fifth=${this.buisness_head_response_?._ranking_data[0]?._data[4]?.rankingtable_name}&id_coroebus_user_First=${this.buisness_head_response_?._ranking_data[0]?._data[0]?.id_coroebus_user}&id_coroebus_user_Second=${this.buisness_head_response_?._ranking_data[0]?._data[1]?.id_coroebus_user}&id_coroebus_user_Third=${this.buisness_head_response_?._ranking_data[0]?._data[2]?.id_coroebus_user}&id_coroebus_user_Forth=${this.buisness_head_response_?._ranking_data[0]?._data[3]?.id_coroebus_user}&id_coroebus_user_Fifth=${this.buisness_head_response_?._ranking_data[0]?._data[4]?.id_coroebus_user}&id_ref_measurement_First=${this.buisness_head_response_?._kpi_score[0]?.id_ref_measurement}&id_ref_measurement_Second=${this.buisness_head_response_?._kpi_score[1]?.id_ref_measurement}&id_ref_measurement_Third=${this.buisness_head_response_?._kpi_score[2]?.id_ref_measurement}&id_ref_measurement_Forth=${this.buisness_head_response_?._kpi_score[3]?.id_ref_measurement}`, '_blank');
    } else {
      this.labelArray = Object.entries(this.kpiData?.data?._point_details).map(
        ([label, otherKpiData]) => {
          return { label, Kpidata: otherKpiData };
        }
      );
      window.open(`http://13.232.97.76:8000/assistant?id_coroebus_user=${this.userSelectionData?._personal_data?.id_coroebus_user}&userId=${this.userSelectionData?._personal_data?.USERID}&id_coroebus_game=${this.userSelectionData?._personal_data?.id_coroebus_game}&id_coroebus_theme=${this.userSelectionData?._personal_data?.id_coroebus_theme}&id_role=${this.userSelectionData?._personal_data?.id_role}&daily_id_seasonal_theme=${this.seasonalData?.data?.seasonal_theme_daily[0]?.id_seasonal_theme}&daily_valid_till_date=${this.seasonalData?.data?.seasonal_theme_daily[0]?.valid_till_date}&daily_seasonal_theme_title=${this.seasonalData?.data?.seasonal_theme_daily[0]?.seasonal_theme_title}&weekly_id_seasonal_theme=${this.seasonalData?.data?.seasonal_theme_weekly[0]?.id_seasonal_theme}&weekly_valid_till_date=${this.seasonalData?.data?.seasonal_theme_weekly[0]?.valid_till_date}&weekly_seasonal_theme_title=${this.seasonalData?.data?.seasonal_theme_weekly[0]?.seasonal_theme_title}&monthly_id_seasonal_theme=${this.seasonalData?.data?.seasonal_theme_monthly[0]?.id_seasonal_theme}&monthly_valid_till_date=${this.seasonalData?.data?.seasonal_theme_monthly[0]?.valid_till_date}&monthly_seasonal_theme_title=${this.seasonalData?.data?.seasonal_theme_monthly[0]?.seasonal_theme_title}&id_coroebus_kpiFirst=${this.labelArray[0]?.Kpidata?.data[0]?.id_coroebus_kpi}&id_coroebus_kpiSecond=${this.labelArray[1]?.Kpidata?.data[0]?.id_coroebus_kpi}&id_coroebus_kpiThird=${this.labelArray[2]?.Kpidata?.data[0]?.id_coroebus_kpi}&id_coroebus_kpiFourth=${this.labelArray[3]?.Kpidata?.data[0]?.id_coroebus_kpi}`, '_blank');

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
      map(res => { })
    ).subscribe(res => { }, err => { })
  }

  closeMenuTop() {
    this.closemenu.emit();
    // console.log("hello");


  }


  async GetDataFromProduceInfo(queryParams?: any) {
    try {
      const obj = {
        _userid: queryParams?.userID || this.userSelectionData?._personal_data?.USERID,
        _game: queryParams?.gameID || this.userSelectionData?.id_coroebus_game,

      };
      const res = await this.http.produceInfo(obj).toPromise();
      this.seasonalData = res;
      console.log(this.seasonalData);

    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error here
    }
  }

  async getPointDist() {
    let body = {
      _game: this.userSelectionData?.id_coroebus_game,
      id_role: this.userSelectionData?._personal_data?.id_role,
      id_coroebus_group: this.userSelectionData?.games[0]?.id_coroebus_group
    };
    console.log(body);

    try {
      const res = await this.http.pointDistributionPopup(body).toPromise();
      this.kpiData = res;
      console.log(this.kpiData);

    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error here
    }
  }

}
