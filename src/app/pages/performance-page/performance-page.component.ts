import { Component, OnInit } from '@angular/core';
import { HttpProtocols } from '@app/http/http.protocols';
import { ChartType } from '@app/models/chart.models';
import { PerformanceModel } from '@models/performance.model';
import { Store } from '@ngrx/store';
import { Util } from '@app/utils/util';

import { DefaultComponent } from '@pages/dashboards/default/default.component';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../core/app-state';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'app/apiservice.service';


@Component({
  providers:[DefaultComponent ],
  selector: 'app-performance-page',
  templateUrl: './performance-page.component.html',
  styleUrls: ['./performance-page.component.scss']
})


export class PerformancePageComponent implements OnInit {

  buttonFilterActive: string = 'Live'
  userObj: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  error: any
  pointsListData: any
  overallData: any
  childData: any
  combineLatest: Subscription
  userSelectionData: any
  splineAreaChart: any
  errorProduce: any
  graphData: any
  graphMasterData: any
  queryParams: any
  _routerSub: Subscription
  _routeSub: Subscription
  // Weekly,Monthly,Daily
  dropDownFilterMasterData: any = [{
    key: '2',
    value: 'Daily',
    mapTo: ['Live']
  }, {
    key: '3',
    value: 'Weekly',
    mapTo: ['Historical', 'Live']
  }, {
    key: '1',
    value: 'Monthly',
    mapTo: ['Live','Historical']
  }]
  dropDownFilterData: any
  dropDownValue: any
  id_role: any;
  pageInfo: string;
  constructor(private readonly store: Store ,private graph:DefaultComponent,public Util: Util, private _route: ActivatedRoute,public http:ApiserviceService) {
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      this.dropDownValueFilter()
      this.dropDownValue = this.dropDownFilterData?.[0]?.value
    })


    let body={
      _userid:this.userObj?._personal_data?.USERID,
      _game:this.userObj?._personal_data?.id_coroebus_game,
      _device:"W",
      _section:"Performance Page",
      _description:"Performance"
    }

    this.http.engagamentlog(body).subscribe(res=>{
      
      
    })

  }
  dropDownValueFilter() {
    this.dropDownFilterData = this.dropDownFilterMasterData?.filter(data => data?.mapTo.indexOf(this.buttonFilterActive) > -1)
    this.dropDownValue = this.buttonFilterActive === 'Live' ? this.dropDownFilterData?.[0]?.value : this.dropDownFilterData?.[0]?.value
  }
  onChange(value) {
    //alert(this.dropDownValue)
    this.filterGraphData()
  }

  ngOnInit(): void {
    // this.pageInfo = localStorage.getItem('page');
    // console.log(this.pageInfo);
    // if(this.pageInfo!="undefined"){
    //   setTimeout(()=>{
    //     if (!localStorage.getItem('foo')) { 
    //       localStorage.setItem('foo', 'no reload') 
    //       location.reload() 
    //     } else {
    //       localStorage.removeItem('foo') 
    //     }
    //   },2000)
      
    // }
    if (!localStorage.getItem('foo')) { 
            localStorage.setItem('foo', 'no reload') 
            location.reload() 
          } else {
            localStorage.removeItem('foo') 
          }

    this._routeSub = this._route.queryParams.subscribe(queryParams => {
      // do something with the query params
      if (queryParams?.userID) {
        queryParams = {userID: this.Util.decryptData(queryParams?.userID),gameID: this.Util.decryptData(queryParams?.gameID),roleID: this.Util.decryptData(queryParams?.roleID) }
        this.queryParams= queryParams
        console.log(this.queryParams);
        
        this.pointsList()
        this.myperformanceProduce()
    
      } else {
      
      
      }
    });
    this.callMe()
    this.combineLatest = combineLatest([
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([theme, game]) => {
      this.userSelectionData = { ...theme?.theme, ...game?.game }
      this.pointsList()
      this.myperformanceProduce()
    })

    const splineAreaChart: ChartType = {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      series: [],
      colors: ['#129EC7'],
      xaxis: [],
      grid: {
        borderColor: '#f1f1f1',
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      }
    };
    this.splineAreaChart = splineAreaChart;
  

    // this.queryParams = { userID: this.Util.decryptData(this.queryParams?.userID), gameID: this.Util.decryptData(this.queryParams?.gameID), roleID: this.Util.decryptData(queryParams?.roleID) }

    // 
  }
  buttonFilter(filterName: string) {
    this.buttonFilterActive = filterName
    this.dropDownValueFilter()
    this.filterGraphData()
  }
  async pointsList() {
    
    let err: any, res: any;
    let body: any;
    body = { 
          // "_userid": this.userObj?._personal_data?.USERID, 
            // "_game": this.userSelectionData?.id_coroebus_game 

            "_userid":this.queryParams?.userID ? this.queryParams?.userID : this.userObj?._personal_data?.USERID, 
            "_game":this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game 

  
            
            // "_userid":queryParams?.userID ? this.userObj?._personal_data?.USERID : queryParams?.userID,
            // "_game": queryParams?.gameID ?  this.userObj?._personal_data?.id_coroebus_game : queryParams?.gameID 
  
           };
    [err, res] = await HttpProtocols.to(PerformanceModel.pointsList(body))
    //
    if (!err && res?.statuscode === 200) {
      this.pointsListData = res?.data;

      
      this.overallData = res?.data?.filter(data => data?.label === 'Overall Score')
      this.childData = res?.data?.filter(data => {
        
        if (data?.label === 'Index') {
          return data
        }
      })
    } else {
      this.error = 'Error while getting data'
    }
  }

  async myperformanceProduce() {
    let err: any, res: any;
    let body: any;
    
    if(this.userObj?.otherInfo?.id_coroebus_team != null){
      body = {
        // "_userid": this.userObj?._personal_data?.USERID,
        // "_game": this.userSelectionData?.id_coroebus_game,
        // "_team": this.userObj?.otherInfo?.id_coroebus_team
  
        "_userid":this.queryParams?.userID ? this.queryParams?.userID : this.userObj?._personal_data?.USERID, 
        // "_game":this.queryParams?.gameID ?this.queryParams?.gameID : this.userObj?._personal_data?.id_coroebus_game,
        "_game":this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game ,
        // "_team":this.userObj?._personal_data?.id_coroebus_team
  
        "_team": this.userObj?.otherInfo?.id_coroebus_team 
  
        // "_userid":queryParams?.userID, 
        // "_game": queryParams?.gameID,
        // "_team":this.userObj?.otherInfo?.id_coroebus_team
  
      };
    
      [err, res] = await HttpProtocols.to(PerformanceModel.myperformanceProduce(body))
      
      if (!err && res?.statuscode === 200) {
        this.graphMasterData = res?.data;
        
        this.id_role=this.graphMasterData._personal_data[0].id_role;
        
        
        //this.graphData = this.graphMasterData
        this.filterGraphData()
      } else {
        this.errorProduce = 'Error while getting data'
      }
    }
    else {
      body = {
        // "_userid": this.userObj?._personal_data?.USERID,
        // "_game": this.userSelectionData?.id_coroebus_game,
        // "_team": this.userObj?.otherInfo?.id_coroebus_team
  
        "_userid":this.queryParams?.userID ? this.queryParams?.userID : this.userObj?._personal_data?.USERID, 
        // "_game":this.queryParams?.gameID ?this.queryParams?.gameID : this.userObj?._personal_data?.id_coroebus_game,
        "_game":this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game ,
        "_team":this.userObj?._personal_data?.id_coroebus_team
  
        // "_team": this.userObj?.otherInfo?.id_coroebus_team 
  
        // "_userid":queryParams?.userID, 
        // "_game": queryParams?.gameID,
        // "_team":this.userObj?.otherInfo?.id_coroebus_team
  
      };
    
      [err, res] = await HttpProtocols.to(PerformanceModel.myperformanceProduce(body))
      
      if (!err && res?.statuscode === 200) {
        this.graphMasterData = res?.data

        this.id_role=this.graphMasterData._personal_data[0].id_role;
       
        
        //this.graphData = this.graphMasterData
        this.filterGraphData()
      } else {
        this.errorProduce = 'Error while getting data'
      }
    }
  
  }
  filterGraphData() {
    switch (this.dropDownValue) {
      case 'Daily':
        this.graphData = [...this.graphMasterData?.dailygraph]
        
        
        this.dataTransformation()
        break;
      case 'Monthly':
        if (this.buttonFilterActive === 'Historical') {
          this.graphData = [...this.graphMasterData?.HistoricalmonthGraph]
        } else {
          this.graphData = [...this.graphMasterData?.monthgraph]
        }
        this.dataTransformation()
        break;
      default:
        if (this.buttonFilterActive === 'Historical') {
          this.graphData = [...this.graphMasterData?.HistoricalweekGraph]
        } else {
          this.graphData = [...this.graphMasterData?.linegraph]
        }
        this.dataTransformation()
        break;
    }
  }
  dataTransformation() {
    let arrayData: any = []
    this.splineAreaChart.series = []
    this.splineAreaChart.xaxis = []
    var merge: any = {}
    for (let index = 0; index < this.graphData.length; index++) {
      const element = this.graphData[index];
      merge = { ...element, ...this.splineAreaChart }
      merge.series.push({ name: element?.graph_label, data: [] })
      merge.xaxis.push({ type: 'category', categories: [] })
      element._data?.map(val => {
        merge.series[index].data.push(val?.score)
        //merge.xaxis.categories?.push([])
        merge.xaxis[index].categories?.push(val?.days)
        merge.xaxis[index].categories = merge.xaxis[index].categories.filter((element): element is number => {
          return element !== null;
        });
      })
      arrayData?.push(merge)
  
      
    }
    this.graphData = [...arrayData]
    

  }

  public callMe(): void {
  }

}
