import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription, combineLatest, Subject, Observable } from 'rxjs';
import * as fromRoot from '../../core/app-state';
import { Store } from '@ngrx/store';
import { EventService } from '@app/services/event.service';
import { takeUntil } from 'rxjs/operators';
import { ApiserviceService } from 'app/apiservice.service';
import * as userActions from '../../core/app-state/actions';

@Component({
  selector: 'app-spectator-view',
  templateUrl: './spectator-view.component.html',
  styleUrls: ['./spectator-view.component.scss']
})
export class SpectatorViewComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  mergeObj: any
  ranking_details:any
  spectator_dashoard_response: any

  radioSel:any;
  radioSelected:string;
  radioSelectedString:string;



  constructor(private readonly store: Store, public http: ApiserviceService, private eventService: EventService) { }

  ngOnInit(): void {
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      console.log(this.userObj);

      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      console.log(this.mergeObj);

      if (this.mergeObj.id_role == 7) {
        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.userObj.games[0].id_coroebus_game,
          id_theme: this.userObj.themes[0].id_coroebus_theme,
          page_number: "1"
        }
        this.http.spectator_dashboard(body).subscribe((res) => {
          console.log(res)
          this.spectator_dashoard_response = res;

          this.spectator_dashoard_response = Array.of(this.spectator_dashoard_response);

          console.log(this.spectator_dashoard_response);

          this.ranking_details = this.spectator_dashoard_response[0].data.ranking

          this.eventService.broadcast('passDataToHeader', {
            color: this.spectator_dashoard_response[0].data.theme_details[0].dark_color,
            game_logo: this.spectator_dashoard_response[0].data._personal_data.game_logo,
            bg_image: this.spectator_dashoard_response[0].data.theme_details,
            
            
          })
          
          this.store.dispatch(userActions.updateUserObj({
            data: {
              color: this.spectator_dashoard_response[0].data.theme_details[0].dark_color,
              game_logo: this.spectator_dashoard_response[0].data._personal_data.game_logo,
              bg_image: this.spectator_dashoard_response[0].data.theme_details[0].theme_background_web
  
            }
            
          }));
        })
        
            console.log(data);
        this.getSelecteditem()
      }
      else {
        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.mergeObj.id_coroebus_game,
          id_theme: this.mergeObj.id_role,
          page_number: "1"
        }

        console.log(body);

        this.http.spectator_dashboard(body).subscribe((res) => {
          console.log(res)
          this.spectator_dashoard_response = res;

          this.spectator_dashoard_response = Array.of(this.spectator_dashoard_response);

          console.log(this.spectator_dashoard_response);
          
        })
       
      }


    })
  }

  getButtonValue(event: Event) {

    let elementId: string = (event.target as Element).id;
    console.log(elementId);

    if (elementId == 'tab-1') {
      console.log('cm_button');

    }
    else if (elementId == 'tab-2') {
      console.log('am_button');

    }
    else if (elementId == 'tab-3') {
      console.log('rm_button');

    }
    else if (elementId == 'tab-4') {
      console.log('nsm_button');

    }

  }


  getSelecteditem(){
    this.radioSel = this.spectator_dashoard_response.find(Item => this.spectator_dashoard_response.value === this.radioSelected);
    console.log(this.radioSel);
    
    this.radioSelectedString = JSON.stringify(this.radioSel);
    console.log(this.radioSelectedString);

  }

  onItemChange(item){
    this.getSelecteditem();
  }

}
