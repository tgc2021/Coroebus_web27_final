import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ApiserviceService } from 'app/apiservice.service';
import { DOCUMENT, Location } from '@angular/common';
import { Util } from '@app/utils/util';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';


@Component({
  selector: 'app-top-dashboard',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './top-dashboard.component.html',
  styleUrls: ['./top-dashboard.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class TopDashboardComponent implements OnInit, AfterViewInit {
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;

  @ViewChild('content') content;

  userid_bh: any
  id_coroebus_org: any
  buisness_head_response: any
  buisness_head_response_: any
  topbar_color: any
  hos_user_id: any
  hos_game_id: any
  hos_role_id: any
  dark_color: any
  spectator: any
  background_color: any
  medium_color: any
  fontcolor: any
  videourl: string
  safeUrl: SafeResourceUrl
  isVideoModalopen: boolean = false
  GrowthIndexData: any = [];
  openIntroVideo: boolean = false;
  previousUrl: void;
  combineLatest: Subscription
  userSelectionData: any
  isVideoHide: any;
  dataMap: any = ''
  dataMapMobile: any = ''
  map: any
  bi: any
  mapUrl: any
  map_bh: any
  about_game_pdf: any;

  //Static maps link added As per Dnyaneshwari and ops Team Requirements for IPRU Game Only

  ipru_game_map_Growth_index=[{
    
   map_url:'https://public.tableau.com/views/76_Productivity_Map_Dashbord_17006309154870/76_Productivity_Map_Dashbord?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link'
  },
  {
    map_url:'https://public.tableau.com/views/76_Efficiency_Map_Dashbord_17006315603530/76_Efficiency_Map_Dashbord?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link'
  },
 
  {
  
  map_url:'https://public.tableau.com/views/76_Capability_Map_Dashbord_17006317558950/76_Capability_Map_Dashbord?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link'
  },
  {
    
    map_url:'https://public.tableau.com/views/76_Happiness_Map_Dashbord_17006319229430/76_Happiness_Map_Dashbord?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link'
  },

]
  ipru_game_map_Governance_index = [{
    map_url: ''
  },
  {
    map_url: ''
  },
  {
    map_url: ''
  },
  {
    map_url: ''
  },
  {
    map_url: ''
  },
  ]




  ipru_game_map_buiseness_index = [{
    map_url: ''
  },
  {
    map_url: ''
  },
  {
    map_url: ''
  },
  {
    map_url: ''
  },
  {
    map_url: ''
  },
  ]






  constructor(private readonly store: Store, public route: ActivatedRoute, config: NgbModalConfig, public sanitizer: DomSanitizer, public router: Router, public http: ApiserviceService, public Util: Util, public element: ElementRef, public modalService: NgbModal, public location: Location, @Inject(DOCUMENT) private _document: Document) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;



  }


  ngOnInit(): void {


    const isVideoHidden = localStorage.getItem('VideoHide');
    this.isVideoHide = JSON.parse(isVideoHidden);

    window.scrollTo(0, 1)

    this.isVideoModalopen = true;

    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {

      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }

    })

    this.userid_bh = localStorage.getItem('userid')
    this.id_coroebus_org = localStorage.getItem('id_coroebus_org_bh')

    let body = {


      '_userid': this.userid_bh != null ? this.userid_bh : this.userSelectionData?._personal_data?.USERID,
      '_org': this.id_coroebus_org != null ? this.id_coroebus_org : this.userSelectionData?._personal_data?.id_coroebus_organization
    }

    this.http.buisnessHead(body).subscribe(res => {

      this.buisness_head_response = res
      this.buisness_head_response_ = this.buisness_head_response?.data;


      if (this.buisness_head_response_?.is_about_game == 1) {
        this.about_game_pdf = this.buisness_head_response_?.about_game[0]?.file_name

        localStorage.setItem('about_game_pdf', this.about_game_pdf)
      }


      this.map_bh = this.buisness_head_response_?._personal_data?.map_url;
      console.log(this.map_bh);
      localStorage.setItem('res', this.map_bh)
      this.GrowthIndexData = this.buisness_head_response?.data?._points
      this.dark_color = localStorage.getItem('topbar_color')
      this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)
      this.fontcolor = '#FFFFFF'
      this.medium_color = localStorage.getItem('medium_color')
      this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)

      this.videourl = `https://www.youtube.com/0c31548b-b457-4b9b-9159-ba7a08ee2d74`
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videourl)
    })

    var href = window.location.href;

    var url = new URL(href)


    var checkUserID = this.route.queryParams
      .subscribe(params => {

        this.map = params.map;

        localStorage.setItem('map', this.map)
      }
      );
    this.bi = localStorage.getItem('map')
    if (this.bi != 'undefined') {
      this.dataMap = this.bi
      this.dataMapMobile = this.bi;
    }
    else {
      this.dataMap = localStorage.getItem('res');
      this.dataMapMobile = localStorage.getItem('res');

    }


  }

  ngAfterViewInit() {

    if (this.isVideoHide) {
      this.close('content')
      // this.openModal();

    }
  }

  OverallGrowth() {
    this.location.replaceState("");
    location.reload()
  }

  OverallGrowthMobile() {
    this.router.navigateByUrl('/mobile_maps')
  }
  navigateToBIMap(data: any,event:any) {

    if(this.userSelectionData?._personal_data?.id_coroebus_organization=='76'){
      this.mapUrl=this.ipru_game_map_buiseness_index[event]?.map_url;
    }
    
    else{
      this.mapUrl = data.map_url;
    }
   

    console.log(this.mapUrl);

    this.location.replaceState("?map=" + this.mapUrl);
    location.reload();




  }
  navigateToGrowthIndexMap(data: any,event:any){
    if(this.userSelectionData?._personal_data?.id_coroebus_organization=='76'){
      this.mapUrl=this.ipru_game_map_Growth_index[event]?.map_url;
    }
    
    else{
      this.mapUrl = data.map_url;
    }
   

    console.log(this.mapUrl);

    this.location.replaceState("?map=" + this.mapUrl);
    location.reload();

  }
  
  navigateToGovernanceIndexMap(data: any,event:any){
    if(this.userSelectionData?._personal_data?.id_coroebus_organization=='76'){
      this.mapUrl=this.ipru_game_map_Governance_index[event]?.map_url;
    }
    
    else{
      this.mapUrl = data.map_url;
    }
   

    console.log(this.mapUrl);

    this.location.replaceState("?map=" + this.mapUrl);
    location.reload();

  }
  navigateToGrowthIndexMapMobile(data){
    this.mapUrl = data?.map_url;

    this.router.navigateByUrl('/mobile_maps?map=' + this.mapUrl)
    
  }
  navigateToGovernanceIndexMobile(data){
    this.mapUrl = data?.map_url;

    this.router.navigateByUrl('/mobile_maps?map=' + this.mapUrl)

  }
  navigateToBIMapMobile(data: any) {
    this.mapUrl = data?.map_url

    this.router.navigateByUrl('/mobile_maps?map=' + this.mapUrl)
  }
  navigateToIndexwiseDashboard() {
    this.router.navigateByUrl('/buisness_index')
  }

  navigateToHOSDashboard(index: any) {
    this.spectator = "spectator"

    this.hos_user_id = this.Util.encryptData(this.buisness_head_response_?._ranking_data[0]?._data[index]?.userid)
    this.hos_game_id = this.Util.encryptData(this.buisness_head_response_?._ranking_data[0]?._data[index]?.id_coroebus_game)
    localStorage.setItem('gameId', this.buisness_head_response_?._ranking_data[0]?._data[index]?.id_coroebus_game)
    this.hos_role_id = this.Util.encryptData(this.buisness_head_response_?._ranking_data[0]?._data[index]?.id_role)


    this.router.navigateByUrl('/top_dashboard?userID=' + this.hos_user_id + "&gameID=" + this.hos_game_id + "&roleID=" + this.hos_role_id)

  }
  // openModal() {
  //   this.modalService.open(this.content, { size: 'lg', centered: true });
  // }
  close(content) {
    localStorage.setItem('VideoHide', 'false');
    this.modalService.dismissAll();
    location.reload()

  }

}