import { Subscription, combineLatest, Subject, Observable } from 'rxjs';
import * as fromRoot from '../../core/app-state';
import { Store } from '@ngrx/store';

import { Component, OnInit, AfterViewInit, HostListener} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BusyService } from '@app/services/busy.service';
import { asapScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

import { EventService } from '../../core/services/event.service';

import { SIDEBAR_TYPE } from "../layouts.model";

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})

/**
 * Vertical component
 */
export class VerticalComponent implements OnInit, AfterViewInit {
  combineLatest: Subscription
  isCondensed:boolean=true;
  sidebartype: string;
  busy = false
  userSelectionData: { games?: any; is_heart_points?: any; kpi_name?: any; _personal_data?: any; id_coroebus_game?: any; id_coroebus_theme?: any; coroebus_theme_title?: string; theme_description?: string; logo?: string; theme_label?: string; role_3_label?: string; role_4_label?: string; role_6_label?: string; role_8_label?: string; role_9_label?: string; theme_background?: string; player_label?: string; target_icon?: string; userID?: string; olympic_logo?: string; indicator_flag?: number; theme_flag?: number; terms?: string; is_spectator?: number; is_learningAcademy?: number; is_champions_league?: string; is_personal_challenge?: string; is_fantasy_league?: string; is_seasonal_theme?: string; security_questions?: string; themes?: any; _access_token?: string; _system?: any; otherInfo?: any; };
  passDataToHeaderSub: any;
  headerInfo: any;
  color: any;
  bgImage: any;
  element: any;
  _routeSub: any;
  _route: any;
  queryParams: any;
  constructor(private readonly store: Store, private router: Router, private eventService: EventService,
    private busyService: BusyService) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        document.body.classList.remove('sidebar-enable');
      }
    });
    busyService.busyState$
      // asapScheduler ensures this is async; remove this and look in console to see nasty error without this
      .pipe(observeOn(asapScheduler))
      .subscribe((bs) => {
        this.busy = bs.isBusy
      })
  }

  ngOnInit() {
    this.sidebartype = SIDEBAR_TYPE;
    // listen to event and change the layout, theme, etc
    this.eventService.subscribe('changeSidebartype', (layout) => {
      this.sidebartype = layout;
      this.changeSidebar(this.sidebartype);
    });

    this.changeSidebar(this.sidebartype);

    document.body.setAttribute('data-layout', 'vertical');
this.dynamicColor()
  }

  isMobile() {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
  }

  dynamicColor() {
    // $('#example').DataTable();
  

    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
console.log(this.userSelectionData);

    })
    this.passDataToHeaderSub?.unsubscribe()
    this.passDataToHeaderSub = this.eventService.subscribe('passDataToHeader', (data) => {
      this.headerInfo = data
      console.log(this.headerInfo);

    })
    if (this.userSelectionData?.otherInfo) {
      this.headerInfo = this.userSelectionData?.otherInfo
      console.log(this.headerInfo);
      this.color = this.headerInfo.color; //yellowcolor
      console.log(this.color);
      this.bgImage= this.userSelectionData?.themes[0].theme_background_web
      console.log(this.bgImage);
      
      this.element.nativeElement.style.setProperty('--myvar', `${this.color}`)
      this.element.nativeElement.style.setProperty('--bgImage', `${this.bgImage}`)

      // this.element.nativeElement.style.setProperty('--mycolor',`${this.color}`)
      // console.log( this.element.nativeElement.style.setProperty('--myvar',`${this.color}`));


    }
    this._routeSub = this._route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams
      console.log(queryParams)
    })
  }

  ngAfterViewInit() {
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }
  changeSidebar(value) {
    switch (value) {
      case "light":
        document.body.setAttribute('data-sidebar', 'light');
        document.body.setAttribute('data-topbar', 'dark');
        document.body.removeAttribute('data-sidebar-size');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.classList.remove('vertical-collpsed');
        document.body.removeAttribute('data-layout-scrollable');
        if (!this.isCondensed) {
          document.body.classList.add('sidebar-enable');
        }
        break;
      case "compact":
        document.body.setAttribute('data-sidebar-size', 'small');
        document.body.setAttribute('data-sidebar', 'dark');
        document.body.removeAttribute('data-topbar');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.classList.remove('sidebar-enable');
        document.body.classList.remove('vertical-collpsed');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case "dark":
        document.body.setAttribute('data-sidebar', 'dark');
        document.body.removeAttribute('data-topbar');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.removeAttribute('data-sidebar-size');
        document.body.classList.remove('sidebar-enable');
        document.body.classList.remove('vertical-collpsed');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case "icon":
        document.body.classList.add('vertical-collpsed');
        document.body.setAttribute('data-sidebar', 'dark');
        document.body.removeAttribute('data-layout-size');
        document.body.setAttribute('data-keep-enlarged', "true");
        document.body.removeAttribute('data-topbar');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case "colored":
        document.body.classList.remove('sidebar-enable');
        document.body.classList.remove('vertical-collpsed');
        document.body.setAttribute('data-sidebar', 'colored');
        document.body.removeAttribute('data-layout-size');
        document.body.removeAttribute('data-keep-enlarged');
        document.body.removeAttribute('data-topbar');
        document.body.removeAttribute('data-layout-scrollable');
        document.body.removeAttribute('data-sidebar-size');
        break;
      default:
        document.body.setAttribute('data-sidebar', 'dark');
        break;
    }
  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    this.isCondensed = !this.isCondensed;
    document.body.classList.toggle('sidebar-enable');
    document.body.classList.toggle('vertical-collpsed');
    if (window.screen.width <= 768) {
      document.body.classList.remove('vertical-collpsed');
    }
    this.changeSidebar(this.sidebartype);
  }
  
}


