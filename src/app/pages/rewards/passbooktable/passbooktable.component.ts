import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '@app/services/event.service';
import { ToastService } from '@app/services/toast-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ApiserviceService } from 'app/apiservice.service';
import { Util } from '@app/utils/util';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../../core/app-state';


@Component({
  selector: 'app-passbooktable',
  templateUrl: './passbooktable.component.html',
  styleUrls: ['./passbooktable.component.scss']
})
export class PassbooktableComponent implements OnInit {
  dataTable:any;

 
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
  tableresponse:any;

  constructor(private readonly store: Store, private modalService: NgbModal,
    public Util: Util, private eventService: EventService, private _router: Router,
    private _route: ActivatedRoute, public toastService: ToastService, public http: ApiserviceService) { }

  ngOnInit(): void {
   
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
        const response = res
        // this.requestdata=responce

        this.rewardresponse = res;
        this.rewardresponse = Array.of(this.rewardresponse);
        console.log(this.rewardresponse);

      })


    })
 
  }

}
