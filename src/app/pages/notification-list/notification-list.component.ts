import { Component, OnInit } from '@angular/core';
import { HttpProtocols } from '@app/http/http.protocols';
import { EventService } from '@app/services/event.service';
import { DashboardModel } from '@models/dashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NotificationPopupComponent } from '@pages/notification-popup/notification-popup.component';
import { ApiserviceService } from 'app/apiservice.service';
import { combineLatest, Subscription } from 'rxjs';
import * as fromRoot from '../../core/app-state';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  notificationLists: any
  notificationList_err: any
  userSelectionData: any
  combineLatest: Subscription
  callNotificationAPIAfterReadSub: Subscription
  pageInfo: any;
  constructor(private readonly store: Store, private modalService: NgbModal,
    private eventService: EventService,public http:ApiserviceService) { }

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
    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
      this.notificationList()
    })
    this.callNotificationAPIAfterReadSub?.unsubscribe()
    this.callNotificationAPIAfterReadSub = this.eventService.subscribe('callNotificationAPIAfterRead', (data) => {
      this.updateNotificationList(data?.id)
    })
  }
  async notificationList() {
    let err: any, res: any;
    let body: any;
    body = { "_userid": this.userSelectionData?._personal_data?.USERID, "_game": this.userSelectionData?.id_coroebus_game };
    [err, res] = await HttpProtocols.to(DashboardModel.notificationList(body))
    if (!err && res?.statuscode === 200) {
      let body={
        _userid:this.userSelectionData?._personal_data?.USERID,
        _game:this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Notification Page",
        _description:"Notification Page"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        
        
      })
      this.notificationLists = res?.data?.[0]?.list

    } else {
      this.notificationList_err = 'Error'
    }
  }
  openNotification(data: any) {
    
    
    if(data.video== "" && data.video_path=="" &&data.image==""){
      let body={
        _userid:this.userSelectionData?._personal_data?.USERID,
        _game:this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Notification Page",
        _description:"Text Notification"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        
        
      })
    }

    else if(data.video!= "" || data.video_path!="" &&data.image==""){
      let body={
        _userid:this.userSelectionData?._personal_data?.USERID,
        _game:this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Notification Page",
        _description:"Video Notification"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        
        
      })
    }

    else if(data.video== "" && data.video_path=="" &&data.image!=""){
      let body={
        _userid:this.userSelectionData?._personal_data?.USERID,
        _game:this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Notification Page",
        _description:"Image Notification"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        
        
      })
    }

    const modalRef = this.modalService.open(NotificationPopupComponent, { centered: true, windowClass: 'modal-cls' })
    modalRef.componentInstance.notoficationData = data;
  }
  async updateNotificationList(id: any) {
    let err: any, res: any;
    let body: any;
    body = { "_notificationid": id };
    [err, res] = await HttpProtocols.to(DashboardModel.notificationUpdate(body))
    if (!err && res?.statuscode === 200) {
      this.notificationList()
    } else {
      this.notificationList_err = 'Error'
    }
  }

}
