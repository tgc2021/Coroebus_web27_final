import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-hierarchy-dashboards',
  templateUrl: './top-hierarchy-dashboards.component.html',
  styleUrls: ['./top-hierarchy-dashboards.component.scss']
})
export class TopHierarchyDashboardsComponent implements OnInit {
  counter:any=0
  isactive:boolean=true
  constructor() { }

  ngOnInit(): void {
    this.isactive=true
  }

}
