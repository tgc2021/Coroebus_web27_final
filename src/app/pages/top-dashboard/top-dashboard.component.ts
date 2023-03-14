import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'app/apiservice.service';

@Component({
  selector: 'app-top-dashboard',
  templateUrl: './top-dashboard.component.html',
  styleUrls: ['./top-dashboard.component.scss']
})
export class TopDashboardComponent implements OnInit {

  userid_bh:any
  id_coroebus_org:any
  buisness_head_response:any
  buisness_head_response_:any
  constructor(public router:Router,public http:ApiserviceService) { }

  ngOnInit(): void {
  
    this.userid_bh=localStorage.getItem('userid')
    this.id_coroebus_org=localStorage.getItem('id_coroebus_org_bh')
    let body={
    
    '_userid': this.userid_bh,
    '_org': this.id_coroebus_org
    }
    
    this.http.buisnessHead(body).subscribe(res=>{
      console.log(res);
      this.buisness_head_response=res
      this.buisness_head_response_=this.buisness_head_response.data
      console.log(this.buisness_head_response_);

    })
    
   
  }
  navigateToIndexwiseDashboard(){
    this.router.navigateByUrl('/buisness_index')
  }

  navigateToHOSDashboard(){
    this.router.navigateByUrl('/top_dashboard')

  }
}
