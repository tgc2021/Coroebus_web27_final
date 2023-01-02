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
  styleUrls: ['./game-selection.component.scss']
})
export class GameSelectionComponent implements OnInit, OnDestroy {
  userObj: any
  id_role:any
  themeObj: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  gameList: any;
  selectedGame: any
  id_coroebus_theme:any
  showComponent: boolean = false
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
    this.id_role = this.userObj?._personal_data?.id_role
console.log(this.id_role);
let body={
  _userid:this.userObj?._personal_data?.USERID,
  _game:"na",
  _device:"W",
  _section:"Game Page",
  _description:"Game Page"
}

this.http.engagamentlog(body).subscribe(res=>{
  console.log(res);
  
})


  }
  async getGame() {
    let err: any, res: any;
    let body: any;
    console.log(this.userObj);
    
    body = {
      "userid": this.userObj?._personal_data?.USERID,
      "id_theme": this.themeObj?.id_coroebus_theme
    };
    

    [err, res] = await HttpProtocols.to(UserModel.getGame(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200) {

      const newArr = [];
      while (res?.data?.games.length) newArr.push(res?.data?.games.splice(0, 3));
      this.gameList = newArr
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
  handleChange(event, data) {
    this.selectedGame = data?.id_coroebus_game
    this.selectGame()
  }
  selectGame() {
    this.id_coroebus_theme =this.themeObj?.id_coroebus_theme
    console.log(this.id_coroebus_theme);
    console.log(this.id_role);
let body={
  _userid:this.userObj?._personal_data?.USERID,
  _game:"na",
  _device:"W",
  _section:"Game Page",
  _description:"Game selected"
}

this.http.engagamentlog(body).subscribe(res=>{
  console.log(res);
  
})

    if(this.id_role==7){
      this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
      this.router.navigate(['/spectator/spectatorView']);
    }
    else if(this.id_coroebus_theme>4){
      this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
      this.router.navigate(['/account/interactive-dashboard']);
    }
   else{
    this.store.dispatch(gameActions.game({ game: { 'id_coroebus_game': this.selectedGame } }))
    this.router.navigate(['/dashboard']);
   }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
