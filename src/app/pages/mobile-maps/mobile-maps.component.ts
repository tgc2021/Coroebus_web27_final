import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mobile-maps',
  templateUrl: './mobile-maps.component.html',
  styleUrls: ['./mobile-maps.component.scss']
})
export class MobileMapsComponent implements OnInit {
  map: any;
  bi: any;
  dataMap: any;
  dataMapMobile: any;

  constructor(public router: Router,public route:ActivatedRoute) { }

  ngOnInit(): void {


     var href = window.location.href;
    
    var url = new URL(href)
    
  
    var checkUserID= this.route.queryParams
    .subscribe(params => {
      
      this.map = params.map;
      
      localStorage.setItem('map',this.map)
    }
  );
  this.bi=  localStorage.getItem('map')
  if( this.bi!='undefined'){
     this.dataMap=this.bi
     this.dataMapMobile=this.bi;

     
     
  }
  else{
    
  
      this.dataMap= localStorage.getItem('res');
      this.dataMapMobile=localStorage.getItem('res');
      console.log(this.dataMapMobile);
      
     

    
      

  
  
    

  }
   
  }

}
