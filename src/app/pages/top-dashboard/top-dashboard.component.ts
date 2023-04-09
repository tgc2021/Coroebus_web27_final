import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ApiserviceService } from 'app/apiservice.service';
import { Location } from '@angular/common';
import { Util } from '@app/utils/util';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { log } from 'console';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';

@Component({
  selector: 'app-top-dashboard',
  templateUrl: './top-dashboard.component.html',
  styleUrls: ['./top-dashboard.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class TopDashboardComponent implements OnInit, AfterViewInit {
  panelOpenState = false;

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
  GrowthIndexData: any;
  openIntroVideo: boolean = false;
  previousUrl: void;
  combineLatest: Subscription
  userSelectionData: any
  isVideoHide: any;
  dataMap: any
  map:any
  bi:any
  constructor(private readonly store: Store,public route:ActivatedRoute, config: NgbModalConfig, public sanitizer: DomSanitizer, public router: Router, public http: ApiserviceService, public Util: Util, public element: ElementRef, public modalService: NgbModal, public location: Location) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;

  }
  

  ngOnInit(): void {
  

    const isVideoHidden = localStorage.getItem('VideoHide');
    this.isVideoHide = JSON.parse(isVideoHidden);
    console.log(isVideoHidden);
    window.scrollTo(0, 1)
    
    this.isVideoModalopen = true;

    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      console.log(login, theme, game)
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
      console.log(this.userSelectionData);




    })

    var href = window.location.href;
    console.log(href)
    var url = new URL(href)
    console.log(url);
  
    var checkUserID= this.route.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.map = params.map;
      console.log(this.map); // price
      localStorage.setItem('map',this.map)
    }
  );
  this.bi=  localStorage.getItem('map')
  if( this.bi!= 'undefined'){
     this.dataMap=this.bi

     console.log(this.dataMap);
     
  }
  else{
    console.log('growth');
    
    this.dataMap='https://public.tableau.com/views/Growth_Index_Map/Growth_Index_Map?:language=en-US&:display_count=n&:origin=viz_share_link'

  }
    this.userid_bh = localStorage.getItem('userid')
    this.id_coroebus_org = localStorage.getItem('id_coroebus_org_bh')

    let body = {


      '_userid': this.userid_bh != null ? this.userid_bh : this.userSelectionData._personal_data?.USERID,
      '_org': this.id_coroebus_org != null ? this.id_coroebus_org : this.userSelectionData._personal_data?.id_coroebus_organization
    }

    this.http.buisnessHead(body).subscribe(res => {
      console.log(res);
      this.buisness_head_response = res
      this.buisness_head_response_ = this.buisness_head_response.data
      console.log(this.buisness_head_response_);
      this.GrowthIndexData = this.buisness_head_response.data._points
      this.dark_color = localStorage.getItem('topbar_color')
      this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)
      this.fontcolor = '#FFFFFF'
      this.medium_color = localStorage.getItem('medium_color')
      this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)

      this.videourl = `https://www.youtube.com/0c31548b-b457-4b9b-9159-ba7a08ee2d74`
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videourl)
    })


  }

  ngAfterViewInit() {

    if (this.isVideoHide) {
      this.openModal();

    }
  }

  navigateToBIMap(data: any) {

    console.log(data);

    // this.dataMap = 'https://public.tableau.com/views/Cost_Report/Cost_Report?:language=en-US&:display_count=n&:origin=viz_share_link'
   
    window.open('https://coroebusbeta.in/b2b-beta-web/#/topdashboard?map=https:%2F%2Fpublic.tableau.com%2Fviews%2FCost_Report%2FCost_Report%3F:language%3Den-US%26:display_count%3Dn%26:origin%3Dviz_share_link',
    '_self'
    )

   
    // this.router.navigateByUrl("/topdashboard?map="+this.dataMap)
    console.log(this.dataMap);
    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }
    
    //  location.reload()
     
  }
  navigateToIndexwiseDashboard() {
    this.router.navigateByUrl('/buisness_index')
  }

  navigateToHOSDashboard(index: any) {
    this.spectator = "spectator"
    console.log(index);
    this.hos_user_id = this.Util.encryptData(this.buisness_head_response_._ranking_data[0]._data[index].userid)
    this.hos_game_id = this.Util.encryptData(this.buisness_head_response_._ranking_data[0]._data[index].id_coroebus_game)
    localStorage.setItem('gameId', this.buisness_head_response_._ranking_data[0]._data[index].id_coroebus_game)
    this.hos_role_id = this.Util.encryptData(this.buisness_head_response_._ranking_data[0]._data[index].id_role)


    this.router.navigateByUrl('/top_dashboard?userID=' + this.hos_user_id + "&gameID=" + this.hos_game_id + "&roleID=" + this.hos_role_id)

  }
  openModal() {
    this.modalService.open(this.content, { size: 'lg', centered: true });
  }
  close(content) {
    localStorage.setItem('VideoHide', 'false');
    this.modalService.dismissAll();
  }

}
