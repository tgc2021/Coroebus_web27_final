import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../core/app-state';
import { Util } from '@app/utils/util';
import { takeUntil } from 'rxjs/operators';
import { DOCUMENT, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '@app/services/event.service';
import { ToastService } from '@app/services/toast-service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from 'app/apiservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-interactive-dashboard',
  templateUrl: './interactive-dashboard.component.html',
  styleUrls: ['./interactive-dashboard.component.scss']
})
export class InteractiveDashboardComponent implements OnInit {
  auto_parts = [
    {
      "shape": "rect",
      "type": "Lerning Academy",
      "coords": "15,362,139,409"
    }, {

      "shape": "rect",
      "type": "Play Zone",
      "coords": "232,369,354,395"
    }, {
      "shape": "rect",
      "type": "Jackets",
      "coords": "270,448,356,475"
    }, {
      "shape": "rect",
      "type": "Gloves",
      "coords": "269,485,359,575"
    }, {
      "shape": "rect",
      "type": "Winter wear",
      "coords": "269,521,357,555"
    }, {
      "shape": "rect",
      "type": "3rd umpire",
      "coords": "28,682,96,778"
    }, {
      "shape": "rect",
      "type": "Booster",
      "coords": "295,699,333,783"
    },
    {
      "shape": "rect",
      "type": "PersonalMileStone",
      "coords": "24,324,60,350"
    },
    {
      "shape": "rect",
      "type": "angryB",
      "coords": "149,376,222,407"
    },
    {
      "shape": "rect",
      "type": "spectr",
      "coords": "7,419,249,495"
    }
  ];
  constructor(private readonly store: Store,
    public Util: Util, private eventService: EventService, private _router: Router,
    private _route: ActivatedRoute, config: NgbPopoverConfig, public toastService: ToastService, public http: ApiserviceService, public element: ElementRef,@Inject(DOCUMENT) document: Document) { }

  ngOnInit(): void {
   
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      

      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      

      let body = {
        _game: this.mergeObj.id_coroebus_game,
      }

      
   
    

      })
    
    }
  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  mergeObj: any

  async interactiveDashboard() {
    
    
    


  
  }

  partClicked(arg) {
    // 
    
    // 
    if (arg.type == 'Lerning Academy') {
      
      
    }
    

  }
}
