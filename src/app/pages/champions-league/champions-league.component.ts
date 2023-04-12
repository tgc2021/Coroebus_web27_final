import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';
import { take, takeUntil } from 'rxjs/operators';
import { Subscription, combineLatest, Subject, Observable, interval } from 'rxjs';
import { Util } from '@app/utils/util';


@Component({
  selector: 'app-champions-league',
  templateUrl: './champions-league.component.html',
  styleUrls: ['./champions-league.component.scss']
})
export class ChampionsLeagueComponent implements OnInit {

  constructor(private readonly store: Store,public Util: Util) { }
  userObj: any
  mergeObj: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  combineLatest: Subscription
  userSelectionData: any

  ngOnInit(): void {
    
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


      })
    })
    if (this.mergeObj.id_coroebus_game != null){
      if(this.mergeObj.id_role!=8 && this.mergeObj.id_role!=9){
        const userId = this.Util.encryptData(this.mergeObj.USERID)
        const game = this.Util.encryptData(this.userSelectionData.id_coroebus_game)
        const roleid = this.Util.encryptData(this.mergeObj.id_role)
        // const id_coroebus_user = this.Util.encryptData(this.mergeObj.id_coroebus_user)
        console.log(this.Util.decryptData(userId),this.Util.decryptData(game),this.Util.decryptData(roleid),this.Util.decryptData(this.mergeObj.id_coroebus_user));
  
  
        window.open(
          // 'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+this.mergeObj.id_coroebus_user,
        
          'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+this.mergeObj.id_coroebus_user,

          '_self' // <- This is what makes it open in a new window.
    
        )
      }
    
    }

    else{
      if( this.mergeObj.id_role!=8 && this.mergeObj.id_role!=9){
        const userId = this.Util.encryptData(this.mergeObj.USERID)
        const game = this.Util.encryptData(this.mergeObj.id_coroebus_game)
        const roleid = this.Util.encryptData(this.mergeObj.id_role)
        // const id_coroebus_user = this.Util.encryptData(this.mergeObj.id_coroebus_user)
        console.log(this.Util.decryptData(userId),this.Util.decryptData(game));
  
        window.open(
           'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+this.mergeObj.id_coroebus_user,

          // 'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+this.mergeObj.id_coroebus_user,
          '_self' // <- This is what makes it open in a new window.
    
        )
      }
    
    }
  }

}
