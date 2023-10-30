import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiserviceService } from 'app/apiservice.service';

@Component({
  selector: 'app-governance-index',
  templateUrl: './governance-index.component.html',
  styleUrls: ['./governance-index.component.scss']
})
export class GovernanceIndexComponent implements OnInit {
  dark_color: string;
  fontcolor: string;
  medium_color: string;
  theme_id:any
  org_id:any
  governance_index_:any
  governance_index_response:any
  calibrationResponse: any;
  calibrationData: any;
  constructor(public element: ElementRef,public http: ApiserviceService) { }
  panelOpenState = false;

  ngOnInit(): void {
  
    this.theme_id=localStorage.getItem('tid')
    this.org_id=localStorage.getItem('orgid')

    let body={
      _thid:this.theme_id,
      _orgid:this.org_id

      // _orgid:215
    }

    this.http.governance_index(body).subscribe((res) => {
      
      this.governance_index_=res;
      console.log(this.governance_index_);
      this.governance_index_response=this.governance_index_?.data;
     
      
      this.calibrationResponse=this.governance_index_response.filter((res)=>{
        
        if(res._data.point_label ==='Calibration'){
          this.calibrationData=res?._data_kpi?.process_data;
        }
        

        
        
      })

      
      
    })

    this.dark_color=localStorage.getItem('topbar_color')
    this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)
    this.fontcolor='#FFFFFF'
   this.medium_color=localStorage.getItem('medium_color')
   this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)


  }
  governance_index(governance_index: any) {
    throw new Error('Method not implemented.');
  }

}
