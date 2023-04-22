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
