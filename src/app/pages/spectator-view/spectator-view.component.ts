import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription, combineLatest, Subject, Observable } from 'rxjs';
import * as fromRoot from '../../core/app-state';
import { Store } from '@ngrx/store';
import { EventService } from '@app/services/event.service';
import { takeUntil } from 'rxjs/operators';
import { ApiserviceService } from 'app/apiservice.service';
import * as userActions from '../../core/app-state/actions';
import {FormControl} from '@angular/forms';
import { ActivatedRoute, Event as Events, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Util } from '@app/utils/util';
import { HttpProtocols } from '@app/http/http.protocols';

import { DashboardModel } from '@models/dashboard.model';


@Component({
  selector: 'app-spectator-view',
  templateUrl: './spectator-view.component.html',
  styleUrls: ['./spectator-view.component.scss']
})
export class SpectatorViewComponent implements OnInit {

  selectedValue: '0';
  spectSearchStr: any
  spectSearchStrTrigger: boolean = false
  spectSearList: any
  combineLatest: Subscription
  userSelectionData: any
  _routeSub: Subscription

  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  mergeObj: any
  ranking_details: any
  spectator_dashoard_response: any

  radioSel: any;
  radioSelected: string;
  radioSelectedString: string;
  spectator_ranking_leaderboard: any
  spectator_data: any
  spectator_user_list: any
  first_tab_data: any
  spectator_group_list: any
  spectator_group_list_final:any
  spectator_group_list_final_without_0_index:any
  dropdown_id:any;
 
  selected:any;
filtered :any;

stat:any
status:any
queryParams:any
order:any
searchresponse:any
pageNumberForSectionView_3: number = 1
getBackImagesFromSectionView3:any
spectator_user_list_view_more:any = []


@ViewChild("scrollTarget") scrollTarget: ElementRef;
viewmoreorder:any

  constructor(private readonly store: Store, public http: ApiserviceService, private eventService: EventService, private _router: Router,
    private _route: ActivatedRoute,public Util: Util) { }

 
  ngOnInit(): void {

    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      console.log(login, theme, game)
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
      this._routeSub?.unsubscribe()
      this._routeSub = this._route.queryParams.subscribe(queryParams => {
        // do something with the query params
        if (queryParams?.userID) {
          queryParams = { userID: this.Util.decryptData(queryParams?.userID), gameID: this.Util.decryptData(queryParams?.gameID), roleID: this.Util.decryptData(queryParams?.roleID) }
          this.queryParams = queryParams
          console.log(this.queryParams);

         
        } else {
        

        }
      });


    })

    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      console.log(this.userObj);

      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      console.log(this.mergeObj);

      this.getDashboardGroup()
 


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


  getSelecteditem() {
    this.radioSel = this.spectator_dashoard_response.find(Item => this.spectator_dashoard_response.value === this.radioSelected);
    console.log(this.radioSel);

    this.radioSelectedString = JSON.stringify(this.radioSel);
    console.log(this.radioSelectedString);

  }

 


  
 getDashboardGroup(){

  if(this.userObj.games.length >0){
    let body_gamerankingList = {
      _game: this.userObj.games[0].id_coroebus_game,
    }
    console.log(body_gamerankingList);

    this.http.gameRanking_Groups(body_gamerankingList).subscribe((res) => {
      console.log(res)

      this.spectator_group_list = res
      this.spectator_group_list = Array.of(this.spectator_group_list);

      console.log(this.spectator_group_list);
   
      console.log(this.spectator_group_list[0].data[0].id_coroebus_group != null && this.mergeObj.id_role == 7);


      this.selected= this.spectator_group_list[0].data[0].id_coroebus_group

      this.getSpectatorViewWebService('viewmore')

    
    })
   }


   else if(this.userObj.games.length == 0){
    let body_gamerankingList = {
      _game: this.mergeObj.id_coroebus_game,
    }
    console.log(body_gamerankingList);

    this.http.gameRanking_Groups(body_gamerankingList).subscribe((res) => {
      console.log(res)

      this.spectator_group_list = res
      this.spectator_group_list = Array.of(this.spectator_group_list);

      console.log(this.spectator_group_list);

      this.selected= this.spectator_group_list[0].data[0].id_coroebus_group

      this.getSpectatorViewMore2('viewmore')
  
    

    })
   }

 }

  getSpectatorViewWebService(viewmore:any){
    if (this.mergeObj.id_role == 7 && this.spectator_group_list[0].data[0].id_coroebus_group != null) {
      console.log(this.mergeObj.id_role);

      
      let body = {
        _userid: this.mergeObj.USERID,
        _game: this.userObj.games[0].id_coroebus_game,
        id_theme: this.userObj.themes[0].id_coroebus_theme,
        page_number: this.pageNumberForSectionView_3,
        id_coroebus_group: this.selected==undefined? this.spectator_group_list[0].data[0].id_coroebus_group: this.selected
      }

      console.log(body);
      this.http.spectator_dashboard(body).subscribe((res) => {
        console.log(res)
        
        this.spectator_dashoard_response = res;
        this.spectator_user_list_view_more=res

        this.spectator_dashoard_response = Array.of(this.spectator_dashoard_response);

        console.log(this.spectator_dashoard_response);

        this.spectator_ranking_leaderboard = this.spectator_dashoard_response[0].data.ranking
        console.log(this.spectator_ranking_leaderboard);
        this.spectator_data = this.spectator_dashoard_response[0].data.ranking;
        console.log(this.spectator_data);
        this.spectator_user_list = this.spectator_data[0].user_list
        console.log(this.spectator_user_list);

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


        
  if(viewmore){
    console.log(this.spectator_ranking_leaderboard);
    

    this.spectator_ranking_leaderboard?.forEach((element, index) => {
      console.log(element);
      console.log(element?.label);

      console.log(this.spectator_user_list_view_more?.data?.ranking[index]?.label);
      
      if (element?.label === this.spectator_user_list_view_more?.data?.ranking[index]?.label) {
        console.log(element?.label);
        
        if (element?.user_list?.length > 0) {
          this.spectator_user_list_view_more?.data?.ranking[index]?.user_list?.push(...element?.user_list)
          console.log(this.spectator_user_list_view_more?.data?.ranking[index]?.user_list?.push(...element?.user_list));
          
          this.scrollTarget?.nativeElement?.scrollIntoView({ behavior: "smooth", block: "end", inline: 'center' });
        }
      }

    });


    // this.spectator_ranking_leaderboard.forEach((element, index) => {
    //   console.log(element);
      
    //   if (element?.label === this.spectator_user_list_view_more[index]?.label) {
    //     console.log(element.label);
        
    //     if (element?._data?.length > 0) {
    //       this.spectator_user_list[index]?._data?.push(...element?._data)
    //       console.log(this.spectator_user_list[index]?._data?.push(...element?._data));
          
    //       this.scrollTarget?.nativeElement?.scrollIntoView({ behavior: "smooth", block: "end", inline: 'center' });
    //     }
    //   }

    // });
  }
         
  else {
    this.getBackImagesFromSectionView3=this.spectator_user_list.map((res:any)=>{
      console.log(res);
      
      // this.sectionView3Data=res._data;
      
    })
      
  

    

  }
      
  
        

        
      

        this.getSelecteditem()
      })

    }

    else{
      let body = {
        _userid: this.mergeObj.USERID,
        _game: this.userObj.games[0].id_coroebus_game,
        id_theme: this.userObj.themes[0].id_coroebus_theme,
        page_number: this.pageNumberForSectionView_3,
        id_coroebus_group: this.selected==undefined? this.spectator_group_list[0].data[0].id_coroebus_group: this.selected
      }

      console.log(body);
      this.http.spectator_dashboard(body).subscribe((res) => {
        console.log(res)
        this.spectator_dashoard_response = res;

        this.spectator_dashoard_response = Array.of(this.spectator_dashoard_response);

        console.log(this.spectator_dashoard_response);

        this.spectator_ranking_leaderboard = this.spectator_dashoard_response[0].data.ranking
        console.log(this.spectator_ranking_leaderboard);
        this.spectator_data = this.spectator_dashoard_response[0].data.ranking;
        console.log(this.spectator_data);
        this.spectator_user_list = this.spectator_data[0].user_list
        console.log(this.spectator_user_list);

        if(viewmore){
          console.log("view");
          this.spectator_user_list?.forEach((element, index) => {
            if (element?.label === this.spectator_user_list[index]?.label) {
              if (element?._data?.length > 0) {
                this.spectator_user_list[index]?._data?.push(...element?._data)
                console.log(this.spectator_user_list[index]?._data?.push(...element?._data));
                
                this.scrollTarget?.nativeElement?.scrollIntoView({ behavior: "smooth", block: "end", inline: 'center' });
              }
            }
  
          });
        }
               
        else {
          this.getBackImagesFromSectionView3=this.spectator_user_list.map((res:any)=>{
            console.log(res);
            
            // this.sectionView3Data=res._data;
            
          })
            
        
  
          
  
        }
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

        this.getSelecteditem()
      })
      
    }
 



  
    
    
    
  }

  getSpectatorViewMore2(viewmore:any){
    let body = {
      _userid: this.mergeObj.USERID,
      _game: this.mergeObj.id_coroebus_game,
      id_theme: this.userObj.themes[0].id_coroebus_theme,
      page_number:  this.pageNumberForSectionView_3,
      id_coroebus_group: this.selected==undefined? this.spectator_group_list[0].data[0].id_coroebus_group: this.selected
    }

    console.log(body);

    this.http.spectator_dashboard(body).subscribe((res) => {
      console.log(res)
      this.spectator_dashoard_response = res;

      this.spectator_dashoard_response = Array.of(this.spectator_dashoard_response);

      console.log(this.spectator_dashoard_response);

      this.spectator_ranking_leaderboard = this.spectator_dashoard_response[0].data.ranking
      console.log(this.spectator_ranking_leaderboard);
      this.spectator_data = this.spectator_dashoard_response[0].data.ranking;
      console.log(this.spectator_data);
      this.spectator_user_list = this.spectator_data[0].user_list
      console.log(this.spectator_user_list);

 
      if(viewmore){
        console.log("view");
        this.spectator_user_list?.forEach((element, index) => {
          if (element?.label === this.spectator_user_list[index]?.label) {
            if (element?._data?.length > 0) {
              this.spectator_user_list[index]?._data?.push(...element?._data)
              console.log(this.spectator_user_list[index]?._data?.push(...element?._data));
              
              this.scrollTarget?.nativeElement?.scrollIntoView({ behavior: "smooth", block: "end", inline: 'center' });
            }
          }

        });
      }
             
      else {
        this.getBackImagesFromSectionView3=this.spectator_user_list.map((res:any)=>{
          console.log(res);
          
          // this.sectionView3Data=res._data;
          
        })
          
      

        

      }




  
      this.getSelecteditem()
    })
  }

  
  onOptionsSelected() {
    console.log(this.selected); 
    this.spectSearList =null
    // this.getDashboardGroup()
   if(this.userObj.games.length >0){
    this.getSpectatorViewWebService('viewmore')
   }
   else if(this.userObj.games.length == 0){
   
  this.getSpectatorViewMore2('viewmore')

   
   }
  
 
  }

  checked: boolean = false;


  filterRankwiseLeaderboard(category: any) {
    
    
    this.spectSearList=null
    this.checked = !this.checked;
    this.pageNumberForSectionView_3 = 1
   
    if (this.checked) {
      this.spectator_data = this.spectator_ranking_leaderboard.filter((a: any) => {
        if (a.label === category || category == '') {
          console.log(a);
          this.order=a.order
          console.log(this.order);
         
          
      
          this.spectator_user_list = a.user_list
          console.log(this.spectator_user_list);

          return a;
        }
        console.log(this.checked);
        this.checked = false
      })
    }
    else {
      this.spectator_data = this.spectator_ranking_leaderboard.filter((a: any) => {
        return a;
      })
    }


  }

 
  async spectSearch() {
    let err: any, res: any;
    let body: any;
    // this.spectSearchStrTrigger = true

    if (this.spectSearchStr) {
      this.spectSearchStrTrigger = true
    } else {
      this.spectSearchStrTrigger = false
    }
    body = {
      "_userid": this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
      "_game": this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game,
      "page_number": 1,
      "_uname": this.spectSearchStr,
      "_order": this.order==undefined? "1": this.order
    };
   
    this.http.spectatorSearch(body).subscribe((res) => {
      console.log(res);
      this.searchresponse= res
      this.searchresponse == Array.of(this.searchresponse)
      console.log(this.searchresponse);
      
      this.spectSearList = this.searchresponse.data
      console.log(this.spectSearList);
    })

  }

  viewMore() {
    console.log("view more");
    this.pageNumberForSectionView_3 = this.pageNumberForSectionView_3 + 1
    this.viewmoreorder=this.order
    console.log(this.viewmoreorder);
    
    // this.pageNumberForSectionView_3 = this.pageNumberForSectionView_3 + 1
   if(this.userObj.games.length >0){
    this.getSpectatorViewWebService('viewmore')
   }
   else if(this.userObj.games.length ==0){
    this.getSpectatorViewMore2('viewmore')

   }
    
  }
}
