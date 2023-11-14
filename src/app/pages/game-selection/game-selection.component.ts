import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpProtocols } from '@app/http/http.protocols';
import { UserModel } from '@models/user.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as gameActions from '../../core/app-state/actions';
import { takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../core/app-state';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Util } from '@app/utils/util';
import { ApiserviceService } from 'app/apiservice.service';



@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss'],
 
})
export class GameSelectionComponent implements OnInit, OnDestroy {
  
 
  userObj: any
  id_role:any
  themeObj: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  gameList: any;
  selectedGame: any
  id_coroebus_theme:any
  game_audio:any
  showComponent: boolean = false
  isInteractiveDashboard:any
  game_reponse:any
  buisness_head_response:any
  bodyforbh:any
  buisness_head_response_:any=[]
  dark_color:any
  paramID:any
  selectedGame1: any;
  games: any;
  about_game_pdf: any;
  constructor(private readonly store: Store, private router: Router, public Util: Util,public http:ApiserviceService) {
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
     
      
    })
    this.store.select(fromRoot.usertheme).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.themeObj = data?.theme
      this.getGame()
    })

  }

  ngOnInit(): void {
    this.paramID =localStorage.getItem('page')
    console.log(this.paramID);
    
    this.id_role = this.userObj?._personal_data?.id_role

let body={
  _userid:this.userObj?._personal_data?.USERID,
  _game:"na",
  _device:"W",
  _section:"Game Page",
  _description:"Game Page"
}

this.http.engagamentlog(body).subscribe(res=>{
  
  
})


  }
  async getGame() {
    let err: any, res: any;
    let body: any;
    
    
    
    body = {
      "userid": this.userObj?._personal_data?.USERID,
      "id_theme": this.themeObj?.id_coroebus_theme
    };
    
if(this.userObj._personal_data.id_role!="13"){

[err, res] = await HttpProtocols.to(UserModel.getGame(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200) {
      this.games=res?.data?.games;
      const newArr = [];
   
      while (res?.data?.games.length) newArr.push(res?.data?.games.splice(0, 5));
      this.gameList = newArr;

      // newArr=[...this.gameList[0], ...this.gameList[1]]
      
      console.log(this.gameList)
      this.about_game_pdf = res?.data?.about_game[0]?.file_name;
      console.log(this.about_game_pdf)

      localStorage.setItem('about_game_pdf', this.about_game_pdf)
      
      this.game_audio=this.gameList[0]?.[0].game_audio
      localStorage.setItem('audio_game',this.gameList[0]?.[0].game_audio)
      this.selectedGame = this.gameList?.[0]?.[0]?.id_coroebus_game
    
      
      if (this.gameList?.[0]?.length === 1) {
        this.selectGame()
      }
      else {
        this.showComponent = true
      }
    } else {
      Swal.fire({
        title: '',
        text: res?.message || res?.data,
        imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: '#556ee6'
      });
    }
}
else{
  

   localStorage.setItem('theme_logo',this.userObj.themes[0].logo)
   localStorage.setItem('topbar_color',this.userObj.themes[0].dark_color)
   localStorage.setItem('medium_color',this.userObj.themes[0].medium_color)
   localStorage.setItem('light_color',this.userObj.themes[0].light_color)

  this.router.navigate(['/topdashboard']);
  
}
    
  }

  
  handleChange(data) {
  
    this.selectedGame = data?.id_coroebus_game;
    console.log(data)
    console.log( this.selectedGame);
    this.isInteractiveDashboard =data?.is_interactive_dashboard
   
    
    
    
    this.selectGame()
  }
  selectGame() {
    this.id_coroebus_theme =this.themeObj?.id_coroebus_theme
    
    
    // 

let body={
  _userid:this.userObj?._personal_data?.USERID,
  _game:"na",
  _device:"W",
  _section:"Game Page",
  _description:"Game selected"
}


this.http.engagamentlog(body).subscribe(res=>{
  
  
})

if (this.gameList?.[0]?.length === 1){
  localStorage.setItem('theme_logo',this.userObj.themes[0].logo)
  localStorage.setItem('topbar_color',this.userObj.themes[0].dark_color)
  localStorage.setItem('medium_color',this.userObj.themes[0].medium_color)
  localStorage.setItem('light_color',this.userObj.themes[0].light_color)


  if(this.id_role==7){
    
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
    this.router.navigate(['/spectator/spectatorView']);
  }
  else if(this.id_role==8){
    
   
 
    
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
    this.router.navigate(['/top_dashboard']);
  }

  else if(this.id_role==9){
    
    
    localStorage.setItem('theme_logo',this.userObj.themes[0].logo)
    localStorage.setItem('topbar_color',this.userObj.themes[0].dark_color)
    localStorage.setItem('medium_color',this.userObj.themes[0].medium_color)
    localStorage.setItem('id_role_hos','9')

   
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
    this.router.navigate(['/top_dashboard']);
  }

  // else if(this.id_role==8){
  //   
    
  //   this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
  //   this.router.navigate(['/top_dashboard']);
  // }

  // else if(this.id_role==12){
  //   
    
  //   this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
  //   this.router.navigate(['/top_dashboard']);
  // }
  else if(this.id_coroebus_theme>4  && this.gameList[0]?.[0]?.is_interactive_dashboard== '1'){
    
    
    
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
     
    localStorage.setItem('theme_logo',this.userObj.themes[0].logo)
    localStorage.setItem('topbar_color',this.userObj.themes[0].dark_color)
    localStorage.setItem('medium_color',this.userObj.themes[0].medium_color)
 
    if(this.paramID == 'undefined'){
      this.router.navigate(['/account/interactive-dashboard']);
     }else if(this.paramID== 'campaign'){
      this.router.navigate(['/account/campaigns']);
     }
     else if(this.paramID== 'reward'){
      this.router.navigate(['/account/interactive-dashboard']);
     }
     else{
      this.router.navigate(['/account/interactive-dashboard']);
     }
   
    localStorage.setItem("is_interactive_dashboard","1")
  }
  else if(this.id_coroebus_theme>4 && this.gameList[0]?.[0]?.is_interactive_dashboard== '0'){
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
    this.router.navigate(['/dashboard']);
    localStorage.setItem("is_interactive_dashboard","0")

  }

  
 else{
  this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
  this.router.navigate(['/dashboard']);
 }
}
else{
  localStorage.setItem('theme_logo',this.userObj.themes[0].logo)
  localStorage.setItem('topbar_color',this.userObj.themes[0].dark_color)
  localStorage.setItem('medium_color',this.userObj.themes[0].medium_color)
  localStorage.setItem('light_color',this.userObj.themes[0].light_color)

  
  if(this.id_role==7){
    console.log(this.selectedGame)
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
    this.router.navigate(['/spectator/spectatorView']);
  }

  else if(this.id_role==8){
    
    localStorage.setItem('theme_logo',this.userObj.themes[0].logo)
    localStorage.setItem('topbar_color',this.userObj.themes[0].dark_color)
    localStorage.setItem('medium_color',this.userObj.themes[0].medium_color)
 
    
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
    this.router.navigate(['/top_dashboard']);
  }
  
  else if(this.id_role==9){
    
    
    localStorage.setItem('theme_logo',this.userObj.themes[0].logo)
    localStorage.setItem('topbar_color',this.userObj.themes[0].dark_color)
    localStorage.setItem('medium_color',this.userObj.themes[0].medium_color)
 
   
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
    this.router.navigate(['/top_dashboard']);
  }
  // else if(this.id_role==8){
  //   
    
  //   this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
  //   this.router.navigate(['/top_dashboard']);
  // }

  // else if(this.id_role==12){
  //   
    
  //   this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
  //   this.router.navigate(['/topdashboard']);
  // }
  else if(this.id_coroebus_theme>4 && this.isInteractiveDashboard == '1'){
     
    localStorage.setItem('theme_logo',this.userObj.themes[0].logo)
    localStorage.setItem('topbar_color',this.userObj.themes[0].dark_color)
    localStorage.setItem('medium_color',this.userObj.themes[0].medium_color)
 
    
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
    
    if(this.paramID == 'undefined'){
      this.router.navigate(['/account/interactive-dashboard']);
     }else if(this.paramID== 'campaign'){
      this.router.navigate(['/account/campaigns']);
     }
     else if(this.paramID== 'reward'){
      this.router.navigate(['/account/interactive-dashboard']);
     }
     else{
      this.router.navigate(['/account/interactive-dashboard']);
     }
  }
  else if(this.id_coroebus_theme>4 && this.isInteractiveDashboard == '0'){
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
    this.router.navigate(['/dashboard']);
  }
 else{
  this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
  this.router.navigate(['/dashboard']);
 }
}

    
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngAfterViewInit() :void{
  
  }

}
