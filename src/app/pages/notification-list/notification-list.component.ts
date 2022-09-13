import { Component, OnInit } from '@angular/core';
import { HttpProtocols } from '@app/http/http.protocols';
import { EventService } from '@app/services/event.service';
import { DashboardModel } from '@models/dashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NotificationPopupComponent } from '@pages/notification-popup/notification-popup.component';
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
  constructor(private readonly store: Store, private modalService: NgbModal,
    private eventService: EventService) { }

  ngOnInit(): void {
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
      this.notificationLists = res?.data?.[0]?.list

    } else {
      this.notificationList_err = 'Error'
    }
  }
  openNotification(data: any) {
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
