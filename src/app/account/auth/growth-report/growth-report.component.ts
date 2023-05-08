import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-growth-report',
  templateUrl: './growth-report.component.html',
  styleUrls: ['./growth-report.component.scss']
})
export class GrowthReportComponent implements OnInit {

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
