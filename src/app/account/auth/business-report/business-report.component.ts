import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.scss']
})
export class BusinessReportComponent implements OnInit {
  map:any
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    var href = window.location.href;
    console.log(href)
    var url = new URL(href)
    console.log(url);

  
    var checkUserID= this.route.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.map = params.map_report;
      console.log(this.map); // price
      
    }
  );
  }

}
