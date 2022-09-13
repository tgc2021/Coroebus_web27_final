import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteFadeAnimation } from '@shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [RouteFadeAnimation],
})
export class AppComponent implements OnInit {

  ngOnInit() {
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
