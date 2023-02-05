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
import { MatSnackBar } from "@angular/material/snack-bar";  



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
  medium_color:any
  spectator_user_id:any
  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  mergeObj: any
  ranking_details: any
  spectator_dashoard_response: any
  bgImage:any
  radioSel: any;
  radioSelected: string;
  radioSelectedString: string;
  spectator_ranking_leaderboard: any
  spectator_data: any
  spectator_data_1:any
  spectator_user_list: any
  first_tab_data: any
  spectator_group_list: any
  spectator_group_list_final:any
  spectator_group_list_final_without_0_index:any
  dropdown_id:any;
  spectator:any
  selected:any;
filtered :any;

stat:any
status:any
queryParams:any
order:any
searchresponse:any
pageNumberForSectionView_3: any = 1
getBackImagesFromSectionView3:any
spectator_user_list_view_more:any = []
spectator_previous_array:any
spectator_temporary_array:any=[]
spectator_game_id:any
spectator_role_id:any
color: any;

@ViewChild("scrollTarget") scrollTarget: ElementRef;
viewmoreorder:any
  checked1: boolean =true;
  checked2: boolean =false;
  checked3: boolean =false;
  checked4: boolean =false;
  passDataToHeaderSub: Subscription
  headerInfo: any

  constructor(private readonly store: Store, public http: ApiserviceService, private eventService: EventService, private _router: Router,
    private _route: ActivatedRoute,public Util: Util,public snackBar: MatSnackBar, public element: ElementRef) { }

 
  ngOnInit(): void {

    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      console.log(login, theme, game)
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
      console.log(this.userSelectionData);
      this.dynamicColor()
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
      _game: this.userSelectionData.id_coroebus_game,
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
        if(this.order==1 || this.order == null){
          if(this.spectator_data[0].user_list != ''){
            this.spectator_user_list = this.spectator_data[0].user_list;
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;

            console.log(this.spectator_user_list);
          }
          else{
            console.log("nodata");
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')

          }
          
        }
        else if(this.order==2){
          if(this.spectator_data[1].user_list != ''){
            this.spectator_user_list = this.spectator_data[1].user_list;
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
          }
          else{
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')

          }
         
        }
        else if(this.order==3){
          if(this.spectator_data[2].user_list != ''){
            this.spectator_user_list = this.spectator_data[2].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            console.log(this.spectator_user_list);
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')

          }
        }
        else if(this.order==4){

          if(this.spectator_data[3].user_list != ''){
            this.spectator_user_list = this.spectator_data[3].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            console.log(this.spectator_user_list);
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            this.openSnackBar('No More data Available','Ok')

          }

         
        }

        
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


        // this.spectator_user_list = this.spectator_data[0].user_list
        // console.log(this.spectator_user_list);

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
        console.log(this.order);

        ////////////////////////////////////////////////////To show Active Tab 1///////////////////////////////////////////////////////

        if(this.spectator_dashoard_response[0].data._personal_data.id_role == '6'){
          if(this.order==1 || this.order == null){

            if(this.spectator_data[0].user_list != ''){
              
              this.spectator_user_list = this.spectator_data[0].user_list;
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
            }
            else{
              console.log("nodata");
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
            }
            
          }
          else if(this.order==2){
            if(this.spectator_data[1].user_list != ''){
              this.spectator_user_list = this.spectator_data[1].user_list;
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              
            }
            else{
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
           
          }
          else if(this.order==3){
            if(this.spectator_data[2].user_list != ''){
              this.spectator_user_list = this.spectator_data[2].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              console.log(this.spectator_user_list);
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
          }
          else if(this.order==4){
  
            if(this.spectator_data[3].user_list != ''){
              this.spectator_user_list = this.spectator_data[3].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              console.log(this.spectator_user_list);
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              this.openSnackBar('No More data Available','Ok')
  
            }
  
           
          }
        }

        ////////////////////////////////////////////////////To show Active Tab 2///////////////////////////////////////////////////////

        else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '4'){
          if(this.order==1 ){
            if(this.spectator_data[0].user_list != ''){
              this.spectator_user_list = this.spectator_data[0].user_list;
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
            }
            else{
              console.log("nodata");
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
            }
            
          }
          else if(this.order==2 || this.order == null){
            if(this.spectator_data[1].user_list != ''){
              this.spectator_user_list = this.spectator_data[1].user_list;
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              
            }
            else{
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
           
          }
          else if(this.order==3){
            if(this.spectator_data[2].user_list != ''){
              this.spectator_user_list = this.spectator_data[2].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              console.log(this.spectator_user_list);
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
          }
          else if(this.order==4){
  
            if(this.spectator_data[3].user_list != ''){
              this.spectator_user_list = this.spectator_data[3].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              console.log(this.spectator_user_list);
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              this.openSnackBar('No More data Available','Ok')
  
            }
  
           
          }
        }

        ////////////////////////////////////////////////////To show Active Tab 3///////////////////////////////////////////////////////

        else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '3'){
          if(this.order==1 ){
            if(this.spectator_data[0].user_list != ''){
              this.spectator_user_list = this.spectator_data[0].user_list;
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
            }
            else{
              console.log("nodata");
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
            }
            
          }
          else if(this.order==2 ){
            if(this.spectator_data[1].user_list != ''){
              this.spectator_user_list = this.spectator_data[1].user_list;
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              
            }
            else{
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
           
          }
          else if(this.order==3 || this.order == null){
            if(this.spectator_data[2].user_list != ''){
              this.spectator_user_list = this.spectator_data[2].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              console.log(this.spectator_user_list);
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
          }
          else if(this.order==4){
  
            if(this.spectator_data[3].user_list != ''){
              this.spectator_user_list = this.spectator_data[3].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              console.log(this.spectator_user_list);
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              this.openSnackBar('No More data Available','Ok')
  
            }
  
           
          }
        }

        ////////////////////////////////////////////////////To show Active Tab 4///////////////////////////////////////////////////////

        else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '8'){
          if(this.order==1 || this.order == null){
            if(this.spectator_data[0].user_list != ''){
              this.spectator_user_list = this.spectator_data[0].user_list;
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              
            }
            else{
              console.log("nodata");
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
            }
            
          }
          else if(this.order==2 ){
            if(this.spectator_data[1].user_list != ''){
              this.spectator_user_list = this.spectator_data[1].user_list;
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              
            }
            else{
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
           
          }
          else if(this.order==3){
            if(this.spectator_data[2].user_list != ''){
              this.spectator_user_list = this.spectator_data[2].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              console.log(this.spectator_user_list);
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
          }
          else if(this.order==4 || this.order == null){
  
            if(this.spectator_data[3].user_list != ''){
              this.spectator_user_list = this.spectator_data[3].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              console.log(this.spectator_user_list);
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              this.openSnackBar('No More data Available','Ok')
  
            }
  
           
          }
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
      _game: this.userSelectionData.id_coroebus_game,
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
    
      if(this.order==1 || this.order == null){
        if(this.spectator_data[0].user_list != ''){
          this.spectator_user_list = this.spectator_data[0].user_list;
          this.checked1=true;
          this.checked2=false;
          this.checked3=false;
          this.checked4=false;
          console.log(this.spectator_user_list);
        }
        else{
          this.checked1=true;
          this.checked2=false;
          this.checked3=false;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')

          console.log("nodata");
          
        }
        
      }
      else if(this.order==2){
        if(this.spectator_data[1].user_list != ''){
          this.spectator_user_list = this.spectator_data[1].user_list;
          this.checked1=false;
          this.checked2=true;
          this.checked3=false;
          this.checked4=false;
          console.log(this.spectator_user_list);
        }
        else{
          this.checked1=false;
          this.checked2=true;
          this.checked3=false;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')

        }
       
      }
      else if(this.order==3){
        if(this.spectator_data[2].user_list != ''){
          this.spectator_user_list = this.spectator_data[2].user_list;
          this.checked1=false;
          this.checked2=false;
          this.checked3=true;
          this.checked4=false;
          console.log(this.spectator_user_list);
        }
        else{
          this.checked1=false;
          this.checked2=false;
          this.checked3=true;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')

        }
      }
      else if(this.order==4){

        if(this.spectator_data[3].user_list != ''){
          this.spectator_user_list = this.spectator_data[3].user_list;
          this.checked1=false;
          this.checked2=false;
          this.checked3=false;
          this.checked4=true;
          console.log(this.spectator_user_list);
          
        }
        else{
          this.checked1=false;
          this.checked2=false;
          this.checked3=false;
          this.checked4=true;
          this.openSnackBar('No More data Available','Ok')

        }

       
      }

 
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
    this.pageNumberForSectionView_3 = 1

   if(this.userObj.games.length >0){
    this.getSpectatorViewWebService('viewmore')
   }
   else if(this.userObj.games.length == 0){
   
  this.getSpectatorViewMore2('viewmore')

   
   }
  
 
  }

  checked: boolean = false;


  filterRankwiseLeaderboard(category: any) {
      //  debugger

    this.spectSearchStr=null
    this.spectSearList=null
    this.checked = !this.checked;
    this.pageNumberForSectionView_3 = 1
    
    if (this.checked) {
      console.log( this.pageNumberForSectionView_3 );
      if(this.userObj.games.length >0){
        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.userObj.games[0].id_coroebus_game,
          id_theme: this.userObj.themes[0].id_coroebus_theme,
          page_number: this.pageNumberForSectionView_3,
          id_coroebus_group: this.selected==undefined? this.spectator_group_list[0].data[0].id_coroebus_group: this.selected
        }
        this.http.spectator_dashboard(body).subscribe((res) => {
          console.log(res)
          this.spectator_dashoard_response = res;
    
          this.spectator_dashoard_response = Array.of(this.spectator_dashoard_response);
    
          console.log(this.spectator_dashoard_response);
    
          this.spectator_ranking_leaderboard = this.spectator_dashoard_response[0].data.ranking
          console.log(this.spectator_ranking_leaderboard);
          this.spectator_data = this.spectator_dashoard_response[0].data.ranking;
          console.log(this.spectator_data);
      
  
  
          this.spectator_data_1 = this.spectator_data.filter((a: any) => {
            console.log(a.label);
            console.log(category);
            
            if (a.label == category) {
              console.log(a);
              console.log(a.label);
  
              this.order=a.order
              console.log(this.order);
              console.log(this.checked);
              if(this.order==1 || this.order == null){
  
              
                  
                  this.checked1=true;
                  this.checked2=false;
                  this.checked3=false;
                  this.checked4=false;
                
                  this.checked=false
                
              }
              else if(this.order==2){
                  this.checked1=false;
                  this.checked2=true;
                  this.checked3=false;
                  this.checked4=false;
                  this.checked=false
  
               
               
              }
              else if(this.order==3){
              
                  this.checked1=false;
                  this.checked2=false;
                  this.checked3=true;
                  this.checked4=false;
                  this.checked=false
  
              
              }
              else if(this.order==4){
               
                  this.checked1=false;
                  this.checked2=false;
                  this.checked3=false;
                  this.checked4=true;
                 
                  this.checked=false
  
               
              }
          // this.checked = false
              
          if( a.user_list!=''){
            this.spectator_user_list = a.user_list
            console.log(this.spectator_user_list);
           
            return a;
          }
          
          else{
            if(this.userObj.games.length >0){
              this.getSpectatorViewWebService('viewmore')
    
            }
            else if(this.userObj.games.length ==0){
              console.log("userobj");
              
              this.getSpectatorViewMore2('viewmore')
          
             }
            // this.getSpectatorViewMore2('viewmore')
    
          }
         
            }
          
          })
        })
      }
      else if(this.userObj.games.length ==0){
        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.userSelectionData.id_coroebus_game,
          id_theme: this.userObj.themes[0].id_coroebus_theme,
          page_number:  this.pageNumberForSectionView_3,
          id_coroebus_group: this.selected==undefined? this.spectator_group_list[0].data[0].id_coroebus_group: this.selected
        }
        this.http.spectator_dashboard(body).subscribe((res) => {
          console.log(res)
          this.spectator_dashoard_response = res;
    
          this.spectator_dashoard_response = Array.of(this.spectator_dashoard_response);
    
          console.log(this.spectator_dashoard_response);
    
          this.spectator_ranking_leaderboard = this.spectator_dashoard_response[0].data.ranking
          console.log(this.spectator_ranking_leaderboard);
          this.spectator_data = this.spectator_dashoard_response[0].data.ranking;
          console.log(this.spectator_data);
      
  
  
          this.spectator_data_1 = this.spectator_data.filter((a: any) => {
            console.log(a.label);
            console.log(category);
            
            if (a.label == category) {
              console.log(a);
              console.log(a.label);
  
              this.order=a.order
              console.log(this.order);
              console.log(this.checked);
              if(this.order==1 || this.order == null){
  
              
                  
                  this.checked1=true;
                  this.checked2=false;
                  this.checked3=false;
                  this.checked4=false;
                
                  this.checked=false
                
              }
              else if(this.order==2){
                  this.checked1=false;
                  this.checked2=true;
                  this.checked3=false;
                  this.checked4=false;
                  this.checked=false
  
               
               
              }
              else if(this.order==3){
              
                  this.checked1=false;
                  this.checked2=false;
                  this.checked3=true;
                  this.checked4=false;
                  this.checked=false
  
              
              }
              else if(this.order==4){
               
                  this.checked1=false;
                  this.checked2=false;
                  this.checked3=false;
                  this.checked4=true;
                 
                  this.checked=false
  
               
              }
          // this.checked = false
              
          if( a.user_list!=''){
            this.spectator_user_list = a.user_list
            console.log(this.spectator_user_list);
           
            return a;
          }
          
          else{
            if(this.userObj.games.length >0){
              this.getSpectatorViewWebService('viewmore')
    
            }
            else if(this.userObj.games.length ==0){
              console.log("userobj");
              
              this.getSpectatorViewMore2('viewmore')
          
             }
            // this.getSpectatorViewMore2('viewmore')
    
          }
         
            }
          
          })
        })
      }
  
     
     
    }
    else {
      this.spectator_data = this.spectator_ranking_leaderboard.filter((a: any) => {
        return a;
      })
    }


  }

  openSnackBar(message: string, action: string) {  
    this.snackBar.open(message, action, {  
       duration: 2000,  
    });  
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
   if(this.spectSearchStr.length>2){
    this.http.spectatorSearch(body).subscribe((res) => {
      console.log(res);
      
      let body={
        _userid:this.userObj?._personal_data?.USERID,
        _game:this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Spectator View",
        _description:"Search"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })

      this.searchresponse= res
      this.searchresponse == Array.of(this.searchresponse)
      console.log(this.searchresponse);
      
      
      // if(this.searchresponse.data[0]!= null){
        
      //   this.openSnackBar('No data Available','Ok')
      //   this.spectSearList == null
      // }
      if(this.searchresponse.data[0]._data==''){
        this.openSnackBar('No data Available','Ok')
      }
      else{
        this.spectSearList = this.searchresponse.data
        console.log(this.spectSearList);
      }
     

    
    })
   }
 else if(this.spectSearchStr.length<=2){

  
  this.openSnackBar('Please enter more than 2 characters to see results','Ok')

 }

  }

  viewMore() {
    console.log(this.spectator_user_list);
    this.spectator_temporary_array=this.spectator_user_list
    
    console.log("view more");
    this.pageNumberForSectionView_3 = this.pageNumberForSectionView_3 + 1
    this.viewmoreorder=this.order
    console.log(this.viewmoreorder);
    
    // this.pageNumberForSectionView_3 = this.pageNumberForSectionView_3 + 1
   if(this.userObj.games.length >0){
   

    // this.getSpectatorViewWebService('viewmore')
    if (this.mergeObj.id_role == 7 && this.spectator_group_list[0].data[0].id_coroebus_group != null) {
      let body = {
        _userid: this.mergeObj.USERID,
        _game: this.userObj.games[0].id_coroebus_game,
        id_theme: this.userObj.themes[0].id_coroebus_theme,
        page_number: this.pageNumberForSectionView_3,
        id_coroebus_group: this.selected==undefined? this.spectator_group_list[0].data[0].id_coroebus_group: this.selected
      }
      this.http.spectator_dashboard(body).subscribe((res) => {
        console.log(res)
        this.spectator_dashoard_response = res;
  
        this.spectator_dashoard_response = Array.of(this.spectator_dashoard_response);
  
        console.log(this.spectator_dashoard_response);
  
        this.spectator_ranking_leaderboard = this.spectator_dashoard_response[0].data.ranking
        console.log(this.spectator_ranking_leaderboard);
        this.spectator_data = this.spectator_dashoard_response[0].data.ranking;
        console.log(this.spectator_data);
        console.log(this.order);
  
        ////////////////////////////////////////////////////To show Active Tab 1///////////////////////////////////////////////////////
  
        if(this.spectator_dashoard_response[0].data._personal_data.id_role == '6'){
          if(this.order==1 || this.order == null){
            
            if(this.spectator_data[0].user_list != ''){
              
              this.spectator_user_list = this.spectator_data[0].user_list;
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
              
              
            }
            else{
              console.log("nodata");
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
            }
            
          }
          else if(this.order==2){
            
            if(this.spectator_data[1].user_list != ''){
              this.spectator_user_list = this.spectator_data[1].user_list;
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              console.log(this.spectator_user_list);
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
              
            }
            else{
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
           
          }
          else if(this.order==3){
            if(this.spectator_data[2].user_list != ''){
              this.spectator_user_list = this.spectator_data[2].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              console.log(this.spectator_user_list);
              console.log(this.spectator_user_list);
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
          }
          else if(this.order==4){
            
  
            if(this.spectator_data[3].user_list != ''){
              this.spectator_user_list = this.spectator_data[3].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              console.log(this.spectator_user_list);
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              this.openSnackBar('No More data Available','Ok')
  
            }
  
           
          }
        }
  
              ////////////////////////////////////////////////////To show Active Tab 2///////////////////////////////////////////////////////
  
        else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '4'){
          if(this.order==1 ){
            if(this.spectator_data[0].user_list != ''){
              this.spectator_user_list = this.spectator_data[0].user_list;
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            
            }
            else{
              console.log("nodata");
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
            }
            
          }
          else if(this.order==2 || this.order == null){
            if(this.spectator_data[1].user_list != ''){
              this.spectator_user_list = this.spectator_data[1].user_list;
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            
              
            }
            else{
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
           
          }
          else if(this.order==3){
            if(this.spectator_data[2].user_list != ''){
              this.spectator_user_list = this.spectator_data[2].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
          }
          else if(this.order==4){
  
            if(this.spectator_data[3].user_list != ''){
              this.spectator_user_list = this.spectator_data[3].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              this.openSnackBar('No More data Available','Ok')
  
            }
  
           
          }
        }
  
       ////////////////////////////////////////////////////To show Active Tab 3///////////////////////////////////////////////////////
  
       else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '3'){
        if(this.order==1 ){
          if(this.spectator_data[0].user_list != ''){
            this.spectator_user_list = this.spectator_data[0].user_list;
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            console.log("nodata");
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
          }
          
        }
        else if(this.order==2 ){
          if(this.spectator_data[1].user_list != ''){
            this.spectator_user_list = this.spectator_data[1].user_list;
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
          }
         
        }
        else if(this.order==3 || this.order == null){
          if(this.spectator_data[2].user_list != ''){
            this.spectator_user_list = this.spectator_data[2].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
          }
        }
        else if(this.order==4){
  
          if(this.spectator_data[3].user_list != ''){
            this.spectator_user_list = this.spectator_data[3].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            this.openSnackBar('No More data Available','Ok')
  
          }
  
         
        }
      }
  
       ////////////////////////////////////////////////////To show Active Tab 4///////////////////////////////////////////////////////
  
       else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '8'){
        if(this.order==1 || this.order == null){
          if(this.spectator_data[0].user_list != ''){
            this.spectator_user_list = this.spectator_data[0].user_list;
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
            
          }
          else{
            console.log("nodata");
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
          }
          
        }
        else if(this.order==2 ){
          if(this.spectator_data[1].user_list != ''){
            this.spectator_user_list = this.spectator_data[1].user_list;
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
            
          }
          else{
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
            
          }
         
        }
        else if(this.order==3){
          if(this.spectator_data[2].user_list != ''){
            this.spectator_user_list = this.spectator_data[2].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
          }
        }
        else if(this.order==4 ){
  
          if(this.spectator_data[3].user_list != ''){
            this.spectator_user_list = this.spectator_data[3].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            this.openSnackBar('No More data Available','Ok')
  
          }
  
         
        }
      }
  
  
      else if(this.spectator_dashoard_response[0].data._personal_data.id_role != '6' ||this.spectator_dashoard_response[0].data._personal_data.id_role != '8'||
      this.spectator_dashoard_response[0].data._personal_data.id_role != '3' || this.spectator_dashoard_response[0].data._personal_data.id_role != '4'){
        if(this.order==1 || this.order == null){
            
          if(this.spectator_data[0].user_list != ''){
            
            this.spectator_user_list = this.spectator_data[0].user_list;
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
            
            
          }
          else{
            console.log("nodata");
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
          }
          
        }
        else if(this.order==2){
          
          if(this.spectator_data[1].user_list != ''){
            this.spectator_user_list = this.spectator_data[1].user_list;
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
            
          }
          else{
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
          }
         
        }
        else if(this.order==3){
          if(this.spectator_data[2].user_list != ''){
            this.spectator_user_list = this.spectator_data[2].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
          }
        }
        else if(this.order==4){
          
  
          if(this.spectator_data[3].user_list != ''){
            this.spectator_user_list = this.spectator_data[3].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            this.openSnackBar('No More data Available','Ok')
  
          }
  
         
        }
      }
  
      
          console.log("view");
       
        
               
      
   
  
   
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
  
      this.http.spectator_dashboard(body).subscribe((res) => {
        console.log(res)
        this.spectator_dashoard_response = res;
  
        this.spectator_dashoard_response = Array.of(this.spectator_dashoard_response);
  
        console.log(this.spectator_dashoard_response);
  
        this.spectator_ranking_leaderboard = this.spectator_dashoard_response[0].data.ranking
        console.log(this.spectator_ranking_leaderboard);
        this.spectator_data = this.spectator_dashoard_response[0].data.ranking;
        console.log(this.spectator_data);
        console.log(this.order);
  
        ////////////////////////////////////////////////////To show Active Tab 1///////////////////////////////////////////////////////
  
        if(this.spectator_dashoard_response[0].data._personal_data.id_role == '6'){
          if(this.order==1 || this.order == null){
            
            if(this.spectator_data[0].user_list != ''){
              
              this.spectator_user_list = this.spectator_data[0].user_list;
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
              
              this.scrollTarget?.nativeElement?.scrollIntoView({ behavior: "smooth", block: "end", inline: 'center' });

            }
            else{
              console.log("nodata");
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
            }
            
          }
          else if(this.order==2){
            
            if(this.spectator_data[1].user_list != ''){
              this.spectator_user_list = this.spectator_data[1].user_list;
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              console.log(this.spectator_user_list);
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
              
            }
            else{
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
           
          }
          else if(this.order==3){
            if(this.spectator_data[2].user_list != ''){
              this.spectator_user_list = this.spectator_data[2].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              console.log(this.spectator_user_list);
              console.log(this.spectator_user_list);
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
          }
          else if(this.order==4){
            
  
            if(this.spectator_data[3].user_list != ''){
              this.spectator_user_list = this.spectator_data[3].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              console.log(this.spectator_user_list);
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              this.openSnackBar('No More data Available','Ok')
  
            }
  
           
          }
        }
  
              ////////////////////////////////////////////////////To show Active Tab 2///////////////////////////////////////////////////////
  
        else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '4'){
          if(this.order==1 ){
            if(this.spectator_data[0].user_list != ''){
              this.spectator_user_list = this.spectator_data[0].user_list;
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            
            }
            else{
              console.log("nodata");
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
            }
            
          }
          else if(this.order==2 || this.order == null){
            if(this.spectator_data[1].user_list != ''){
              this.spectator_user_list = this.spectator_data[1].user_list;
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            
              
            }
            else{
              this.checked1=false;
              this.checked2=true;
              this.checked3=false;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
           
          }
          else if(this.order==3){
            if(this.spectator_data[2].user_list != ''){
              this.spectator_user_list = this.spectator_data[2].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=true;
              this.checked4=false;
              this.openSnackBar('No More data Available','Ok')
  
            }
          }
          else if(this.order==4){
  
            if(this.spectator_data[3].user_list != ''){
              this.spectator_user_list = this.spectator_data[3].user_list;
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              console.log(this.spectator_user_list);
              this.spectator_temporary_array.push(...this.spectator_user_list)
              console.log(this.spectator_temporary_array);
              this.spectator_user_list=this.spectator_temporary_array
            
            }
            else{
              this.checked1=false;
              this.checked2=false;
              this.checked3=false;
              this.checked4=true;
              this.openSnackBar('No More data Available','Ok')
  
            }
  
           
          }
        }
  
       ////////////////////////////////////////////////////To show Active Tab 3///////////////////////////////////////////////////////
  
       else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '3'){
        if(this.order==1 ){
          if(this.spectator_data[0].user_list != ''){
            this.spectator_user_list = this.spectator_data[0].user_list;
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            console.log("nodata");
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
          }
          
        }
        else if(this.order==2 ){
          if(this.spectator_data[1].user_list != ''){
            this.spectator_user_list = this.spectator_data[1].user_list;
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
          }
         
        }
        else if(this.order==3 || this.order == null){
          if(this.spectator_data[2].user_list != ''){
            this.spectator_user_list = this.spectator_data[2].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
          }
        }
        else if(this.order==4){
  
          if(this.spectator_data[3].user_list != ''){
            this.spectator_user_list = this.spectator_data[3].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            this.openSnackBar('No More data Available','Ok')
  
          }
  
         
        }
      }
  
       ////////////////////////////////////////////////////To show Active Tab 4///////////////////////////////////////////////////////
  
       else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '8'){
        if(this.order==1 || this.order == null){
          if(this.spectator_data[0].user_list != ''){
            this.spectator_user_list = this.spectator_data[0].user_list;
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
            
          }
          else{
            console.log("nodata");
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
          }
          
        }
        else if(this.order==2 ){
          if(this.spectator_data[1].user_list != ''){
            this.spectator_user_list = this.spectator_data[1].user_list;
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
            
          }
          else{
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
            
          }
         
        }
        else if(this.order==3){
          if(this.spectator_data[2].user_list != ''){
            this.spectator_user_list = this.spectator_data[2].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
          }
        }
        else if(this.order==4 ){
  
          if(this.spectator_data[3].user_list != ''){
            this.spectator_user_list = this.spectator_data[3].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            this.openSnackBar('No More data Available','Ok')
  
          }
  
         
        }
      }
  
  
      else if(this.spectator_dashoard_response[0].data._personal_data.id_role != '6' ||this.spectator_dashoard_response[0].data._personal_data.id_role != '8'||
      this.spectator_dashoard_response[0].data._personal_data.id_role != '3' || this.spectator_dashoard_response[0].data._personal_data.id_role != '4'){
        if(this.order==1 || this.order == null){
            
          if(this.spectator_data[0].user_list != ''){
            
            this.spectator_user_list = this.spectator_data[0].user_list;
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
            
            
          }
          else{
            console.log("nodata");
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
          }
          
        }
        else if(this.order==2){
          
          if(this.spectator_data[1].user_list != ''){
            this.spectator_user_list = this.spectator_data[1].user_list;
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
            
          }
          else{
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
          }
         
        }
        else if(this.order==3){
          if(this.spectator_data[2].user_list != ''){
            this.spectator_user_list = this.spectator_data[2].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
  
          }
        }
        else if(this.order==4){
          
  
          if(this.spectator_data[3].user_list != ''){
            this.spectator_user_list = this.spectator_data[3].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            this.openSnackBar('No More data Available','Ok')
  
          }
  
         
        }
      }
  
      
          console.log("view");
       
        
               
      
   
  
   
      })

    }
    
  

   }
   else if(this.userObj.games.length ==0){
    // this.getSpectatorViewMore2('viewmore')
    let body = {
      _userid: this.mergeObj.USERID,
      _game: this.userSelectionData.id_coroebus_game,
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
      console.log(this.order);

      ////////////////////////////////////////////////////To show Active Tab 1///////////////////////////////////////////////////////

      if(this.spectator_dashoard_response[0].data._personal_data.id_role == '6'){
        if(this.order==1 || this.order == null){
          
          if(this.spectator_data[0].user_list != ''){
            
            this.spectator_user_list = this.spectator_data[0].user_list;
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
            
            
          }
          else{
            console.log("nodata");
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
          }
          
        }
        else if(this.order==2){
          
          if(this.spectator_data[1].user_list != ''){
            this.spectator_user_list = this.spectator_data[1].user_list;
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
            
          }
          else{
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')

          }
         
        }
        else if(this.order==3){
          if(this.spectator_data[2].user_list != ''){
            this.spectator_user_list = this.spectator_data[2].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')

          }
        }
        else if(this.order==4){
          

          if(this.spectator_data[3].user_list != ''){
            this.spectator_user_list = this.spectator_data[3].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            console.log(this.spectator_user_list);
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            this.openSnackBar('No More data Available','Ok')

          }

         
        }
      }

            ////////////////////////////////////////////////////To show Active Tab 2///////////////////////////////////////////////////////

      else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '4'){
        if(this.order==1 ){
          if(this.spectator_data[0].user_list != ''){
            this.spectator_user_list = this.spectator_data[0].user_list;
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          
          }
          else{
            console.log("nodata");
            this.checked1=true;
            this.checked2=false;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')
          }
          
        }
        else if(this.order==2 || this.order == null){
          if(this.spectator_data[1].user_list != ''){
            this.spectator_user_list = this.spectator_data[1].user_list;
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          
            
          }
          else{
            this.checked1=false;
            this.checked2=true;
            this.checked3=false;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')

          }
         
        }
        else if(this.order==3){
          if(this.spectator_data[2].user_list != ''){
            this.spectator_user_list = this.spectator_data[2].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=true;
            this.checked4=false;
            this.openSnackBar('No More data Available','Ok')

          }
        }
        else if(this.order==4){

          if(this.spectator_data[3].user_list != ''){
            this.spectator_user_list = this.spectator_data[3].user_list;
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            console.log(this.spectator_user_list);
            this.spectator_temporary_array.push(...this.spectator_user_list)
            console.log(this.spectator_temporary_array);
            this.spectator_user_list=this.spectator_temporary_array
          
          }
          else{
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.checked4=true;
            this.openSnackBar('No More data Available','Ok')

          }

         
        }
      }

     ////////////////////////////////////////////////////To show Active Tab 3///////////////////////////////////////////////////////

     else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '3'){
      if(this.order==1 ){
        if(this.spectator_data[0].user_list != ''){
          this.spectator_user_list = this.spectator_data[0].user_list;
          this.checked1=true;
          this.checked2=false;
          this.checked3=false;
          this.checked4=false;
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
        }
        else{
          console.log("nodata");
          this.checked1=true;
          this.checked2=false;
          this.checked3=false;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')
        }
        
      }
      else if(this.order==2 ){
        if(this.spectator_data[1].user_list != ''){
          this.spectator_user_list = this.spectator_data[1].user_list;
          this.checked1=false;
          this.checked2=true;
          this.checked3=false;
          this.checked4=false;
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
        }
        else{
          this.checked1=false;
          this.checked2=true;
          this.checked3=false;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')

        }
       
      }
      else if(this.order==3 || this.order == null){
        if(this.spectator_data[2].user_list != ''){
          this.spectator_user_list = this.spectator_data[2].user_list;
          this.checked1=false;
          this.checked2=false;
          this.checked3=true;
          this.checked4=false;
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
        }
        else{
          this.checked1=false;
          this.checked2=false;
          this.checked3=true;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')

        }
      }
      else if(this.order==4){

        if(this.spectator_data[3].user_list != ''){
          this.spectator_user_list = this.spectator_data[3].user_list;
          this.checked1=false;
          this.checked2=false;
          this.checked3=false;
          this.checked4=true;
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
        }
        else{
          this.checked1=false;
          this.checked2=false;
          this.checked3=false;
          this.checked4=true;
          this.openSnackBar('No More data Available','Ok')

        }

       
      }
    }

     ////////////////////////////////////////////////////To show Active Tab 4///////////////////////////////////////////////////////

     else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '8'){
      if(this.order==1 || this.order == null){
        if(this.spectator_data[0].user_list != ''){
          this.spectator_user_list = this.spectator_data[0].user_list;
          this.checked1=true;
          this.checked2=false;
          this.checked3=false;
          this.checked4=false;
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
          
        }
        else{
          console.log("nodata");
          this.checked1=true;
          this.checked2=false;
          this.checked3=false;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')
        }
        
      }
      else if(this.order==2 ){
        if(this.spectator_data[1].user_list != ''){
          this.spectator_user_list = this.spectator_data[1].user_list;
          this.checked1=false;
          this.checked2=true;
          this.checked3=false;
          this.checked4=false;
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
          
        }
        else{
          this.checked1=false;
          this.checked2=true;
          this.checked3=false;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')

          
        }
       
      }
      else if(this.order==3){
        if(this.spectator_data[2].user_list != ''){
          this.spectator_user_list = this.spectator_data[2].user_list;
          this.checked1=false;
          this.checked2=false;
          this.checked3=true;
          this.checked4=false;
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
        }
        else{
          this.checked1=false;
          this.checked2=false;
          this.checked3=true;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')

        }
      }
      else if(this.order==4 ){

        if(this.spectator_data[3].user_list != ''){
          this.spectator_user_list = this.spectator_data[3].user_list;
          this.checked1=false;
          this.checked2=false;
          this.checked3=false;
          this.checked4=true;
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
        }
        else{
          this.checked1=false;
          this.checked2=false;
          this.checked3=false;
          this.checked4=true;
          this.openSnackBar('No More data Available','Ok')

        }

       
      }
    }


    else if(this.spectator_dashoard_response[0].data._personal_data.id_role != '6' ||this.spectator_dashoard_response[0].data._personal_data.id_role != '8'||
    this.spectator_dashoard_response[0].data._personal_data.id_role != '3' || this.spectator_dashoard_response[0].data._personal_data.id_role != '4'){
      if(this.order==1 || this.order == null){
          
        if(this.spectator_data[0].user_list != ''){
          
          this.spectator_user_list = this.spectator_data[0].user_list;
          this.checked1=true;
          this.checked2=false;
          this.checked3=false;
          this.checked4=false;
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
          
          
        }
        else{
          console.log("nodata");
          this.checked1=true;
          this.checked2=false;
          this.checked3=false;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')
        }
        
      }
      else if(this.order==2){
        
        if(this.spectator_data[1].user_list != ''){
          this.spectator_user_list = this.spectator_data[1].user_list;
          this.checked1=false;
          this.checked2=true;
          this.checked3=false;
          this.checked4=false;
          console.log(this.spectator_user_list);
          console.log(this.spectator_user_list);
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
          
        }
        else{
          this.checked1=false;
          this.checked2=true;
          this.checked3=false;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')

        }
       
      }
      else if(this.order==3){
        if(this.spectator_data[2].user_list != ''){
          this.spectator_user_list = this.spectator_data[2].user_list;
          this.checked1=false;
          this.checked2=false;
          this.checked3=true;
          this.checked4=false;
          console.log(this.spectator_user_list);
          console.log(this.spectator_user_list);
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
        }
        else{
          this.checked1=false;
          this.checked2=false;
          this.checked3=true;
          this.checked4=false;
          this.openSnackBar('No More data Available','Ok')

        }
      }
      else if(this.order==4){
        

        if(this.spectator_data[3].user_list != ''){
          this.spectator_user_list = this.spectator_data[3].user_list;
          this.checked1=false;
          this.checked2=false;
          this.checked3=false;
          this.checked4=true;
          console.log(this.spectator_user_list);
          console.log(this.spectator_user_list);
          this.spectator_temporary_array.push(...this.spectator_user_list)
          console.log(this.spectator_temporary_array);
          this.spectator_user_list=this.spectator_temporary_array
        }
        else{
          this.checked1=false;
          this.checked2=false;
          this.checked3=false;
          this.checked4=true;
          this.openSnackBar('No More data Available','Ok')

        }

       
      }
    }

    
        console.log("view");
     
      
             
    
 

 
    })
   }
    
  }

  navigatetoDashboard(index:any){
    console.log(index);
    this.spectator="spectator"

    console.log(this.spectator_user_list[index].USERID);
     this.spectator_user_id=this.Util.encryptData(this.spectator_user_list[index].USERID)
     this.spectator_game_id=this.Util.encryptData(this.spectator_user_list[index].id_coroebus_game)
     this.spectator_role_id=this.Util.encryptData(this.spectator_user_list[index].id_role)

    this._router.navigateByUrl('dashboard?userID='+this.spectator_user_id +"&gameID="+  this.spectator_game_id +"&roleID="+  this.spectator_role_id +"&view="+  this.spectator)
  }

  navigatetoSearchDashboard(index:any){
    console.log(index);
    this.spectator="spectator"
    console.log(this.spectSearList[index]._data.USERID);
     this.spectator_user_id=this.Util.encryptData(this.spectSearList[0]._data[index].USERID)
     this.spectator_game_id=this.Util.encryptData(this.spectSearList[0]._data[index].id_coroebus_game)
     this.spectator_role_id=this.Util.encryptData(this.spectSearList[0]._data[index].id_role)

    this._router.navigateByUrl('dashboard?userID='+this.spectator_user_id +"&gameID="+  this.spectator_game_id +"&roleID="+  this.spectator_role_id +"&view="+  this.spectator)
  }

  dynamicColor() {
    // $('#example').DataTable();
 

    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
console.log(this.userSelectionData);

    })
    this.passDataToHeaderSub?.unsubscribe()
    this.passDataToHeaderSub = this.eventService.subscribe('passDataToHeader', (data) => {
      this.headerInfo = data
      console.log(this.headerInfo);

    })
    if (this.userSelectionData?.otherInfo) {
      this.headerInfo = this.userSelectionData?.otherInfo
      console.log(this.headerInfo);
      this.color = this.headerInfo.color; //yellowcolor
      console.log(this.color);
      this.bgImage= this.userSelectionData?.themes[0].theme_background_web
      console.log(this.bgImage);
      // this.medium_color= this.headerInfo.bg_image[0].medium_color
      // console.log(this.medium_color);
      this.element.nativeElement.style.setProperty('--myvar', `${this.color}`)
      this.element.nativeElement.style.setProperty('--bgImage', `${this.bgImage}`)

      // this.element.nativeElement.style.setProperty('--mycolor',`${this.color}`)
      // console.log( this.element.nativeElement.style.setProperty('--myvar',`${this.color}`));


    }
    this._routeSub = this._route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams
      console.log(queryParams)
    })
  }
}