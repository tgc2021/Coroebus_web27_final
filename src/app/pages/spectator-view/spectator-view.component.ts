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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationPopupComponent } from '@pages/notification-popup/notification-popup.component';



@Component({
  selector: 'app-spectator-view',
  templateUrl: './spectator-view.component.html',
  styleUrls: ['./spectator-view.component.scss']
})
export class SpectatorViewComponent implements OnInit {

  selectedValue: '0';
  spectSearchStr: any
  notification_response_data:any
  notification_response:any
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
  bulletins_list:any
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
addInsList: any
buletinsHide: boolean = false
notificationList_err: any


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
callNotificationAPIAfterReadSub: Subscription

@ViewChild("scrollTarget") scrollTarget: ElementRef;
viewmoreorder:any
  checked1: boolean =true;
  checked2: boolean =false;
  checked3: boolean =false;
  checked4: boolean =false;
  checked1Mobile: boolean =true;
  checked2Mobile: boolean =false;
  checked3Mobile: boolean =false;
  checked4Mobile: boolean =false;

  passDataToHeaderSub: Subscription
  headerInfo: any
  tileimages: any;
  back_images: any;
  back_image_level: any;
  tile_web_image: any;
  tile_web_image_final: any;
  tile_bg_img: any=[];
  bgImageWeb:any
  constructor(private readonly store: Store, public http: ApiserviceService, private eventService: EventService, private _router: Router,
    private _route: ActivatedRoute,public Util: Util,public snackBar: MatSnackBar, public element: ElementRef, private modalService: NgbModal) { }

 
  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      console.log(this.userObj);

      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      console.log(this.mergeObj);
     
      this.combineLatest = combineLatest([
        this.store.select(fromRoot.userLogin),
        this.store.select(fromRoot.usertheme),
        this.store.select(fromRoot.usergame),
      ]
      ).subscribe(([login, theme, game]) => {
        console.log(login, theme, game)
        this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
       console.log(this.userSelectionData);
       this.getDashboardGroup()

       
  
      })

      this.bgImageWeb=localStorage.getItem('bg_image')
   
      // this.bulletins()

    
    })


    this.dynamicColor()


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
        device_type:"W",
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              

              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              

              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              

              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              

              })
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
                this.spectator_user_list.map((res)=>{
                  console.log(res);
                  this.tileimages=res.id_ranking_image
                  console.log(this.tileimages);
                  this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                  console.log(this.back_images);
                  
                  this.back_images.map((res)=>{
                    console.log(res);
                    this.back_image_level=res.ranking_image_level
                    this.tile_web_image= res.ranking_image
                    console.log(this.back_image_level);
                    if(this.tileimages==this.back_image_level){
                      console.log(this.back_image_level);
                       this.tile_web_image_final=this.tile_web_image
                      console.log(this.tile_web_image_final);
                      this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                      console.log(this.tile_bg_img);
                      
                    }
                  })
                 
                  
    
                  })
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

      let bodyforNotification={
        _userid: this.mergeObj.USERID,
        _game: this.userObj.games[0].id_coroebus_game,
      }
      this.http.spectnotification(bodyforNotification).subscribe((res) => {
        this.notification_response=res
        console.log(this.notification_response);
        this.notification_response_data = this.notification_response.data[0].list
        console.log(this.notification_response_data);
        

      })
      let bodyforBulletins: any;
      bodyforBulletins = {
        "_userid": this.mergeObj.USERID,
        "_game": this.userObj.games[0].id_coroebus_game
      };
      this.http.bulletins(bodyforBulletins).subscribe((res) => {
        console.log(res);
        this.bulletins_list=res
        this.addInsList =  this.bulletins_list?.data
        console.log(this.addInsList);
        
      })
    }

    else{
      
      let body = {
        _userid: this.mergeObj.USERID,
        _game: this.userObj.games[0].id_coroebus_game,
        id_theme: this.userObj.themes[0].id_coroebus_theme,
        page_number: this.pageNumberForSectionView_3,
        device_type:"W",

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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
              
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
              
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
              
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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

        else if(this.spectator_dashoard_response[0].data._personal_data.id_role == '9'){
          if(this.order==1 || this.order == null){
            if(this.spectator_data[0].user_list != ''){
              this.spectator_user_list = this.spectator_data[0].user_list;
              this.checked1=true;
              this.checked2=false;
              this.checked3=false;
              this.checked4=false;
              console.log(this.spectator_user_list);
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
              
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
      let bodyforNotification={
        _userid: this.mergeObj.USERID,
        _game: this.userObj.games[0].id_coroebus_game,
      }
      this.http.spectnotification(bodyforNotification).subscribe((res) => {
        console.log(res);

        this.notification_response=res
        console.log(this.notification_response);
        this.notification_response_data = this.notification_response.data[0].list
        console.log(this.notification_response_data);
        
        
      })

      let bodyforBulletins: any;
      bodyforBulletins = {
        "_userid": this.mergeObj.USERID,
        "_game": this.userObj.games[0].id_coroebus_game
      };
      this.http.bulletins(bodyforBulletins).subscribe((res) => {
        console.log(res);
        this.bulletins_list=res
        this.addInsList =  this.bulletins_list?.data
        console.log(this.addInsList);

      })
      

      // this.bulletins()

    }
 this.dynamicColor()


    this.callNotificationAPIAfterReadSub?.unsubscribe()
    this.callNotificationAPIAfterReadSub = this.eventService.subscribe('callNotificationAPIAfterRead', (data) => {
      this.updateNotificationList(data?.id)
    })
  
    
    
    
  }

  async updateNotificationList(id: any) {
    let err: any, res: any;
    let body: any;
    body = { "_notificationid": id };
    [err, res] = await HttpProtocols.to(DashboardModel.notificationUpdate(body))
    if (!err && res?.statuscode === 200) {
      this.getSpectatorViewWebService('viemore')
    } else {
      // this.notificationList_err = 'Error'
    }
  }

// bulletins(queryParams?: any){
  
// }
  // async addIns(queryParams?: any) {
  //   let err: any, res: any;
  //   let body: any;
  //   body = {
  //     "_userid": queryParams?.userID ? queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
  //     "_game": queryParams?.gameID ? queryParams?.gameID : this.userSelectionData?.id_coroebus_game
  //   };
  //   [err, res] = await HttpProtocols.to(DashboardModel.addIns(body))
  //   if (!err && res?.statuscode === 200) {
  //     this.addInsList = res?.data
  //     // console.log(this.addInsList);

  //     if (this.addInsList.length === 0) {
  //       this.buletinsHide = true
  //     }

  //   } else {
  //     this.notificationList_err = 'Error'
  //   }
  // }
  getSpectatorViewMore2(viewmore:any){
    let body = {
      _userid: this.mergeObj.USERID,
      _game: this.userSelectionData.id_coroebus_game,
      id_theme: this.userObj.themes[0].id_coroebus_theme,
      page_number:  this.pageNumberForSectionView_3,
      device_type:"W",

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
          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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
          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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
          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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
          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
          
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
  
                })
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
    let bodyforNotification={
      _userid: this.mergeObj.USERID,
      _game: this.userSelectionData.id_coroebus_game,
    }
    this.http.spectnotification(bodyforNotification).subscribe((res) => {
      this.notification_response=res
      console.log(this.notification_response);
      this.notification_response_data = this.notification_response.data[0].list
      console.log(this.notification_response_data);
      
    })

    let bodyforBulletins: any;
    bodyforBulletins = {
      "_userid": this.mergeObj.USERID,
      "_game": this.userSelectionData.id_coroebus_game
    };
    this.http.bulletins(bodyforBulletins).subscribe((res) => {
      console.log(res);
      this.bulletins_list=res
      this.addInsList =  this.bulletins_list?.data
      console.log(this.addInsList);

    })
  }

  openNotification(data: any) {
    const modalRef = this.modalService.open(NotificationPopupComponent, { centered: true, windowClass: 'modal-cls' })
    modalRef.componentInstance.notoficationData = data;
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
          device_type:"W",

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
            console.log(this.order);
            
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
  
               console.log(this.tile_bg_img);
               
               
              }
              else if(this.order==3){
              console.log('order 3');
              
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
            this.tile_bg_img=[]
            console.log( this.tile_bg_img);
            
            console.log(this.spectator_user_list);
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                // console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
          
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
          device_type:"W",

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

              console.log( this.tile_bg_img);
            
              console.log(this.spectator_user_list);
            
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
            this.tile_bg_img=[]
            console.log( this.tile_bg_img);
            
            console.log(this.spectator_user_list);
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
         
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
        device_type:"W",

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
             
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
              
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

              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
              
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

              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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

              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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
            
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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

            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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

            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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

            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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

            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
        device_type:"W",

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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
              
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
              
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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
              this.spectator_user_list.map((res)=>{
                console.log(res);
                this.tileimages=res.id_ranking_image
                console.log(this.tileimages);
                this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
                console.log(this.back_images);
                
                this.back_images.map((res)=>{
                  console.log(res);
                  this.back_image_level=res.ranking_image_level
                  this.tile_web_image= res.ranking_image
                  console.log(this.back_image_level);
                  if(this.tileimages==this.back_image_level){
                    console.log(this.back_image_level);
                     this.tile_web_image_final=this.tile_web_image
                    console.log(this.tile_web_image_final);
                    this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                    console.log(this.tile_bg_img);
                    
                  }
                })
               
                
    
                })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
            
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
            
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
            
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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

            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
      device_type:"W",

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
            
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
          
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
          
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
          
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
            this.spectator_user_list.map((res)=>{
              console.log(res);
              this.tileimages=res.id_ranking_image
              console.log(this.tileimages);
              this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
              console.log(this.back_images);
              
              this.back_images.map((res)=>{
                console.log(res);
                this.back_image_level=res.ranking_image_level
                this.tile_web_image= res.ranking_image
                console.log(this.back_image_level);
                if(this.tileimages==this.back_image_level){
                  console.log(this.back_image_level);
                   this.tile_web_image_final=this.tile_web_image
                  console.log(this.tile_web_image_final);
                  this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                  console.log(this.tile_bg_img);
                  
                }
              })
             
              
  
              })
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

          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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

          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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

          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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

          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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

          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
          
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

          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
          
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
          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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
          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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
          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
          
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
          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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
          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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
          this.spectator_user_list.map((res)=>{
            console.log(res);
            this.tileimages=res.id_ranking_image
            console.log(this.tileimages);
            this.back_images=this.spectator_dashoard_response[0].data._back_images[1]._data
            console.log(this.back_images);
            
            this.back_images.map((res)=>{
              console.log(res);
              this.back_image_level=res.ranking_image_level
              this.tile_web_image= res.ranking_image
              console.log(this.back_image_level);
              if(this.tileimages==this.back_image_level){
                console.log(this.back_image_level);
                 this.tile_web_image_final=this.tile_web_image
                console.log(this.tile_web_image_final);
                this.tile_bg_img.push({'bgImg':this.tile_web_image_final})
                console.log(this.tile_bg_img);
                
              }
            })
           
            

            })
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
      this.color = this.headerInfo.color; //yellowcolor
      console.log(this.color);
      this.bgImage= this.userSelectionData?.themes[0].theme_background_web
      console.log(this.bgImage);
      
      this.element.nativeElement.style.setProperty('--myvar', `${this.color}`)
      this.element.nativeElement.style.setProperty('--bgImage', `${this.bgImage}`)
    })
    if (this.userSelectionData?.otherInfo) {
      this.headerInfo = this.userSelectionData?.otherInfo
      console.log(this.headerInfo);
      this.color = this.headerInfo.color; //yellowcolor
      console.log(this.color);
      this.bgImage= this.userSelectionData?.themes[0].theme_background_web
      console.log(this.bgImage);
      
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