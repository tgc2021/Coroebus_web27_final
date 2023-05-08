import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.scss']
})
export class BusinessReportComponent implements OnInit {
  location:any
  map:any
  constructor(private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    var href = window.location.href;
    
    var url = new URL(href)
    

  
    var checkUserID= this.route.queryParams
    .subscribe(params => {
      
      this.map = params.map_report;
      
      
    }
  );

  
  
    
  }

}
