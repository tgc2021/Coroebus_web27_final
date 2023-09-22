import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';
import { take, takeUntil } from 'rxjs/operators';
import { Subscription, combineLatest, Subject, Observable, interval } from 'rxjs';
import { Util } from '@app/utils/util';
import { ApiserviceService } from 'app/apiservice.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-learning-academy',
  templateUrl: './learning-academy.component.html',
  styleUrls: ['./learning-academy.component.scss']
})
export class LearningAcademyComponent implements OnInit {
  produce1data: any;
  kpidata: any;
  kpiName: any;

  constructor(private readonly store: Store,public Util: Util,public http:ApiserviceService,public modalService:NgbModal) { }
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
      

      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      
      this.combineLatest = combineLatest([
        this.store.select(fromRoot.userLogin),
        this.store.select(fromRoot.usertheme),
        this.store.select(fromRoot.usergame),
      ]
      ).subscribe(([login, theme, game]) => {
        
        this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
        
        let body1 = {
          _userid: this.mergeObj.USERID,
          _game: this.userSelectionData.id_coroebus_game,
          _section_view: "1", 
          page_number: "1", 
          device_type: "W"
        }

      
        this.http.produce1(body1).subscribe((res) => {
          
          this.produce1data = res;
          
          this.kpidata=this.produce1data.data._personal_data.external_kpi_data
          
          this.learningAcademy()
        })

      })
    })


   
    // window.open(
    //   // 'http://localhost:62267/#/LearningAcademy/badges/?_userid='+userId+"&_game="+game+"&_team="+teamid, '_self'
    //   'https://coroebus.in/Learning_academy/#/LearningAcademy/badges?_game='+game+"&_userid="+userId+"&_team="+teamid,'_self'

    // )
      
    
    }


    learningAcademy(){
      

      if (this.mergeObj.id_coroebus_game != null){
        const userId = this.mergeObj.USERID
        const game = this.userSelectionData.id_coroebus_game
        const teamid=this.mergeObj.id_coroebus_team;
        const gameName=this.mergeObj.game_name;
        const teamName=this.mergeObj.team_name;
        
        
    
    if(this.kpidata.length!=0){
    this.kpiName=this.kpidata[0].kpi_name;
    
    const isAttemted=this.kpidata[0].is_attempted;
    const isCorrect=this.kpidata[0].is_correct;

    
    // 
    
//  
//  "&_team_name="+teamName+"&_game_name="+gameName+
//   "&_team_name="+teamName+"&_kpi_name="+this.kpiName+"&_isAttemted="+isAttemted+"&_isCorrect="+isCorrect,'_self','_self'
// );
   
    window.open(
      
    // 'https://coroebus.in/Learning_academy/#/LearningAcademy/badges?_game='+game+"&_userid="+userId+"&_team="+teamid+"&_game_name="+gameName+
    // "&_team_name="+teamName+"&_kpi_name="+this.kpiName+"&_isAttemted="+isAttemted+"&_isCorrect="+isCorrect,'_self'

    this.http.mainUrl+'/Learning_academy/#/LearningAcademy/library?_game='+game+"&_userid="+userId+"&_team="+teamid+"&_game_name="+gameName+
    "&_team_name="+teamName+"&_kpi_name="+this.kpiName+"&_isAttemted="+isAttemted+"&_isCorrect="+isCorrect,'_self'

  
    )
    
   }
   else{
    this.kpiName='Game OF Phone';
    const isAttemted='8'
    const isCorrect='8'

    window.open(
      
      this.http.mainUrl+'/Learning_academy/#/LearningAcademy/library?_game='+game+"&_userid="+userId+"&_team="+teamid+"&_game_name="+gameName+
      "&_team_name="+teamName+"&_kpi_name="+this.kpiName+"&_isAttemted="+isAttemted+"&_isCorrect="+isCorrect,'_self'
  
        
      )
   }
   
  }
    }
  }



