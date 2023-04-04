import { AfterViewInit, Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { ApiserviceService } from 'app/apiservice.service';
import { Location } from '@angular/common';
import { Util } from '@app/utils/util';
import { NgbModal,NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { log } from 'console';

@Component({
  selector: 'app-top-dashboard',
  templateUrl: './top-dashboard.component.html',
  styleUrls: ['./top-dashboard.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class TopDashboardComponent implements OnInit,AfterViewInit {
  panelOpenState = false;

  @ViewChild('content') content;

  userid_bh:any
  id_coroebus_org:any
  buisness_head_response:any
  buisness_head_response_:any
  topbar_color:any
  hos_user_id:any
  hos_game_id:any
  hos_role_id:any
  dark_color:any
  spectator:any
  background_color:any
  medium_color:any
  fontcolor:any
  videourl:string
  safeUrl: SafeResourceUrl
  isVideoModalopen:boolean =false
  GrowthIndexData: any;
  openIntroVideo: boolean=false;
  previousUrl: void;
  isVideoHide: any;
  constructor(config: NgbModalConfig, public sanitizer:DomSanitizer, public router:Router,public http:ApiserviceService,public Util: Util,public element: ElementRef,public modalService:NgbModal,public location:Location) {
    config.backdrop = 'static';
		config.keyboard = false;
    config.centered=true;
   
   }

  ngOnInit(): void {
    const isVideoHidden=localStorage.getItem('VideoHide'); 
  this.isVideoHide=JSON.parse(isVideoHidden);
  console.log(isVideoHidden);
    window.scrollTo(0,1)

    this.isVideoModalopen = true;

    this.userid_bh=localStorage.getItem('userid')
    this.id_coroebus_org=localStorage.getItem('id_coroebus_org_bh')
   
    let body={
    
    '_userid': this.userid_bh,
    '_org': this.id_coroebus_org
    }
    
    this.http.buisnessHead(body).subscribe(res=>{
      console.log(res);
      this.buisness_head_response=res
      this.buisness_head_response_=this.buisness_head_response.data
      console.log(this.buisness_head_response_);
      this.GrowthIndexData=this.buisness_head_response.data._points
      this.dark_color=localStorage.getItem('topbar_color')
      this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)
      this.fontcolor='#FFFFFF'
     this.medium_color=localStorage.getItem('medium_color')
     this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)

     this.videourl=`https://www.youtube.com/0c31548b-b457-4b9b-9159-ba7a08ee2d74`
      this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.videourl)
    })
    
   
  }

  ngAfterViewInit() {

    
    if(this.isVideoHide){
      this.openModal();
      
    }
  }
  navigateToIndexwiseDashboard(){
    this.router.navigateByUrl('/buisness_index')
  }

  navigateToHOSDashboard(index:any){
    this.spectator="spectator"
    console.log(index);
    this.hos_user_id=this.Util.encryptData(this.buisness_head_response_._ranking_data[0]._data[index].userid)
    this.hos_game_id=this.Util.encryptData(this.buisness_head_response_._ranking_data[0]._data[index].id_coroebus_game)
    localStorage.setItem('gameId',this.buisness_head_response_._ranking_data[0]._data[index].id_coroebus_game)
    this.hos_role_id=this.Util.encryptData(this.buisness_head_response_._ranking_data[0]._data[index].id_role)

    
    this.router.navigateByUrl('/top_dashboard?userID='+this.hos_user_id +"&gameID="+  this.hos_game_id +"&roleID="+  this.hos_role_id)

  }
  openModal(){
    this.modalService.open(this.content, {size: 'lg', centered: true });
  }
  close(content){
    localStorage.setItem('VideoHide','false');
    this.modalService.dismissAll();
  }

}
