import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
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

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-achievement-shelf',
  templateUrl: './achievement-shelf.component.html',
  styleUrls: ['./achievement-shelf.component.scss']
})
export class AchievementShelfComponent implements OnInit {

  constructor(private readonly store: Store, private modalService: NgbModal,
    public Util: Util, private eventService: EventService, private _router: Router,
    private _route: ActivatedRoute, public toastService: ToastService, public http: ApiserviceService,public element:ElementRef) { }

    userObj: any
    mergeObj: any
    destroy$: Subject<boolean> = new Subject<boolean>();
    seasonal_theme_response:any

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
      this.http.seasonal_theme(body).subscribe((res) => {
        console.log(res)

        this.seasonal_theme_response = res;
        this.seasonal_theme_response = Array.of(this.seasonal_theme_response);
        console.log(this.seasonal_theme_response);

       
          const lo=this.seasonal_theme_response[0].data[0]._badges._data[0].id_coroebus_game
          console.log(lo);
        
   
        
        
      })


    })

  }

  }



