import { Component, OnInit,HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteFadeAnimation } from '@shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [RouteFadeAnimation],
})
export class AppComponent implements OnInit {
@HostListener('window:orientationchange',['$event'])
@HostListener('window:resize',['$event'])

onResize(){
  this.hideAddressBar();
}
  ngOnInit() {
    this.hideAddressBar();

  }

  hideAddressBar(){
    if(window.innerHeight < window.outerHeight){
      console.log(window.innerHeight);
      console.log(window.outerHeight);
      
      
      window.scrollTo(0,1);
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
