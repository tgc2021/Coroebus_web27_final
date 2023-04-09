import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-head-map',
  templateUrl: './business-head-map.component.html',
  styleUrls: ['./business-head-map.component.scss']
})
export class BusinessHeadMapComponent implements OnInit {
  @Input() dataMapIndex: any
  data_Map:any
  constructor() { }

  ngOnInit(): void {
    console.log(this.dataMapIndex);
    console.log('bi page');
    
    this.data_Map=this.dataMapIndex
    console.log(this.data_Map);
    
  }

}
