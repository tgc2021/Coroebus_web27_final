import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-governance-report',
  templateUrl: './governance-report.component.html',
  styleUrls: ['./governance-report.component.scss']
})
export class GovernanceReportComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router) { }

  map:any
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
