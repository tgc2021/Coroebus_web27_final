import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';
import { take, takeUntil } from 'rxjs/operators';
import { Subscription, combineLatest, Subject, Observable, interval } from 'rxjs';
import { Util } from '@app/utils/util';

@Component({
  selector: 'app-learning-academy',
  templateUrl: './learning-academy.component.html',
  styleUrls: ['./learning-academy.component.scss']
})
export class LearningAcademyComponent implements OnInit {

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
        const userId = this.mergeObj.USERID
        const game = this.userSelectionData.id_coroebus_game
        const teamid=this.mergeObj.id_coroebus_team;

    console.log(userId,game,teamid);
    window.open(
      // 'http://localhost:62267/#/LearningAcademy/badges/?_userid='+userId+"&_game="+game+"&_team="+teamid, '_self'
      'https://coroebusbeta.in/Learning_academy/#/LearningAcademy/badges?_game='+game+"&_userid="+userId+"&_team="+teamid,'_self'

    )
      
    
    }
  }

}

