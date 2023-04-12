import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';
import { EventService } from '../../core/services/event.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbNavModule, NgbAccordionModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';

import { MENU } from './menu';

import { MENU_SPECTATOR } from './menu_spectator';
import { MenuItem } from './menu.model';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as userActions from '../../core/app-state/actions';
import { DefaultComponent } from '@pages/dashboards/default/default.component';
import { ApiserviceService } from 'app/apiservice.service';
import { MENU_HOS } from './menu_hos';
@Component({
  providers:[DefaultComponent ],

  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

/**
 * Sidebar component
 */
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('componentRef') scrollRef;
  @Input() isCondensed: boolean;
  menu: any;
  data: any;
  hide:boolean=true
  menuItems: any;
  id_role:any;

  @ViewChild('sideMenu') sideMenu: ElementRef;
  userObj: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  activeRouterLink: any
  produce1Data: any
  profileLogo:any
  is_about_game:any
  url: string;
  filepath: any;
  ProfileImageNewOne:any=null
  id_coroebus_theme :any
  themeObj: any
  id_coroebus_organization: any
  rewardpoints:any;
  is_interactive_dashboard:any
  windowlocation:any
  spectator_value:any
  constructor(private eventService: EventService, private router: Router,public dashboard:DefaultComponent,
    public translate: TranslateService, private http: ApiserviceService,
    private readonly store: Store, private cd: ChangeDetectorRef,public route:ActivatedRoute) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        this._scrollElement();
      }
    });
    this.eventService.subscribe('requestSendForProduce1Data', (data) => {
      
      console.log(data)
      this.produce1Data = data
      this.profileLogo=this.produce1Data._personal_data?.profile_logo
      this.filepath=this.produce1Data.about_game[0].file_name;
     
        this.menuItems = MENU;
        // console.log(this.filepath);
        console.log(this.userObj)
        console.log(this.menuItems);
        console.log(this.userObj?.games.length);
  
        var menuArr: any
        menuArr = MENU.filter((value, index) => {
          if (value?.label === 'MENUITEMS.PLAY_ZONE') {
            if (this.produce1Data?.is_play_zone === 0) {
              this.menuItems.splice(0, 1);
              console.log(this.menuItems, index)
            }
          }
          if (value?.label === 'MENUITEMS.GAME_SELECTION') {
            if ( this.userObj?.games.length==1) {
              this.menuItems.splice(8, 1);
              console.log(this.menuItems, index)
            }
            else{
              
            }
          }
      
  
          if (value?.label === 'MENUITEMS.CHALLENGE_ZONE') {
            MENU[index]?.subItems.filter((subVal, subIndex) => {
              if (this.produce1Data?.is_champions_league === "D" || this.userObj?._personal_data?.id_role ==='3' ||this.userObj?._personal_data?.id_role ==='1'||
              this.userObj?._personal_data?.id_role ==='2' ||this.userObj?._personal_data?.id_role ==='5' ||this.userObj?._personal_data?.id_role ==='7' ||this.userObj?._personal_data?.id_role ==='8' || 
              this.userObj?._personal_data?.id_role ==='9' ||this.userObj?._personal_data?.id_role ==='10' || this.userObj?._personal_data?.id_role ==='11' ||
              this.userObj?._personal_data?.id_role ==='12') 
              {
                this.menuItems?.[index]?.subItems?.splice(subIndex, 1);
                console.log(this.menuItems?.[index]?.subItems, subIndex)
              }
           
            });
            if (MENU[index]?.subItems?.length === 0) {
              this.menuItems.splice(index,1); 
            }
            
          }
        
        })
  
      
     
     



      var menuArr1: any
      menuArr1 = MENU_SPECTATOR.filter((value, index) => {
      
       
    

     
      
      })

    })
    // console.log(this.menuItems);

  
  }

  ngOnInit() {
   
    // console.log(this.menuItems);
    this.is_about_game= localStorage.getItem('is_about_game')
    this.rewardpoints=localStorage.getItem('reward_points');
    console.log(this.rewardpoints);
    this.is_interactive_dashboard=localStorage.getItem("is_interactive_dashboard")

    this.windowlocation=window.location.href
    console.log(this.windowlocation);

    var url = new URL(this.windowlocation)
    console.log(url);

    var checkUserID = this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        // this.userid = params.userid;
        // console.log(this.userid); // price
        this.spectator_value = params['view'];
       
        console.log(this.spectator_value);
       
      }
      );
   
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      console.log(this.userObj)
      this.id_role =this.userObj?._personal_data?.id_role
      console.log(this.id_role);
      
      this.id_coroebus_theme=this.userObj.themes[0].id_coroebus_theme
      console.log(this.id_coroebus_theme);
   
   this.id_coroebus_organization=this.userObj._personal_data.id_coroebus_organization
console.log(this.id_coroebus_organization);


    })

    this.initialize();

    this._scrollElement();
    this.ProfileImageNewOne=JSON.parse(localStorage.getItem('Profile'))
    console.log("Updated User Pic" ,this.ProfileImageNewOne);
  }

  ngAfterViewInit() {
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
    this._activateMenuDropdown();
  }

  toggleMenu(event) {
    event.currentTarget.nextElementSibling.classList.toggle('mm-show');
  }

  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }
  _scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0]['offsetTop'];
        if (currentPosition > 500)
          if (this.scrollRef.SimpleBar !== null)
            this.scrollRef.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 300;
      }
    }, 300);
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Activate the parent dropdown
   */
  _activateMenuDropdown() {
    this._removeAllClass('mm-active');
    this._removeAllClass('mm-show');
    this._removeAllClass('active');

    const links = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;
    // tslint:disable-next-line: prefer-for-of
    const paths = [];
    for (let i = 0; i < links.length; i++) {
      paths.push(links[i]['pathname']);
    }
    var itemIndex = paths.indexOf(window.location.pathname);
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf('/');
      const item = window.location.pathname.substr(0, strIndex).toString();
      menuItemEl = links[paths.indexOf(item)];
    } else {
      menuItemEl = links[itemIndex];
    }
    if (menuItemEl) {
      // menuItemEl.classList.add('active');
      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        //parentEl.classList.add('mm-active');
        const parent2El = parentEl.parentElement.closest('ul');
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.add('mm-show');
          const parent3El = parent2El.parentElement;
          if (parent3El && parent3El.id !== 'side-menu') {
            parent3El.classList.add('mm-active');
            const childAnchor = parent3El.querySelector('.has-arrow');
            const childDropdown = parent3El.querySelector('.has-dropdown');
            if (childAnchor) { childAnchor.classList.add('mm-active'); }
            if (childDropdown) { childDropdown.classList.add('mm-active'); }
            const parent4El = parent3El.parentElement;
            if (parent4El && parent4El.id !== 'side-menu') {
              parent4El.classList.add('mm-show');
              const parent5El = parent4El.parentElement;
              if (parent5El && parent5El.id !== 'side-menu') {
                parent5El.classList.add('mm-active');
                const childanchor = parent5El.querySelector('.is-parent');
                if (childanchor && parent5El.id !== 'side-menu') { childanchor.classList.add('mm-active'); }
              }
            }
          }
        }
      }
    }

  }

  /**
   * Initialize
   */
  initialize(): void {
    if(this.id_role == 7 || this.spectator_value=='spectator'){
      console.log(this.spectator_value);
     
      
      this.menuItems = MENU_SPECTATOR;
      this.activeRouterLink = location.hash?.split('#')?.[1] //this.menuItems?.[1]?.link
     
    }
    else  if(this.id_role == 13){
      
      this.menuItems = MENU_HOS;
      this.activeRouterLink = location.hash?.split('#')?.[1] //this.menuItems?.[1]?.link
      if(this.is_about_game==0||this.is_about_game==null){
       
       
        const result = this.menuItems.filter(data => data.icon != 'Aboutgameicon');

        this.menuItems=result;

       
        console.log(this.menuItems);
        
      }
    }
    else {
      console.log(this.spectator_value);
    
      this.menuItems = MENU;
      console.log(this.menuItems);
      
     console.log(this.userObj?.games.length==1);
     console.log(this.userObj?.games.length);
     console.log(this.userObj?.games);
     
      console.log(this.menuItems);
      console.log(this.is_about_game);
      this.eventService.subscribe('requestSendForProduce1Data', (data) => {
        console.log(data);
        
      })

      if(this.is_about_game==0||this.is_about_game==null){
       
       
        const result = this.menuItems.filter(data => data.icon != 'Aboutgameicon');

        this.menuItems=result;

       
        console.log(this.menuItems);
        
      }
      if(this.id_role == 9 || this.id_role == 8 ||this.id_role == 12){
        const result = this.menuItems.filter(data => data.icon != 'ChallengeZoneicon');
     console.log('rol i 9,8,12');
     
        this.menuItems=result;

       
        console.log(this.menuItems);
        
      }
     if(this.userObj?.games.length==1){
        const result = this.menuItems.filter(data => data.icon != 'game');
        console.log('Game selsection Page');
        
           this.menuItems=result;
   
          
           console.log(this.menuItems);
      }
      this.activeRouterLink = location.hash?.split('#')?.[1] //this.menuItems?.[1]?.link
    }

    
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    
    
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
  logout() {
    let body={
      "_userid": this.userObj?._personal_data?.USERID,
      "_game":this.userObj?.otherInfo?.id_coroebus_game,
      _device:"W",
      _section:"Logout",
      _description: "User has logged out of the application"
    }
  
  
    this.http.engagamentlog(body).subscribe(res=>{
      console.log(res);
      
    })

    document.body.classList.remove('dashboard-bg-image');
    document.body.style.backgroundImage = "url('')"
    localStorage.clear()
    this.store.dispatch(userActions.logout(null))
    location.reload()
    location.href = '#/account/login';
    // this.router.navigate(['/account/login'], { queryParams: { returnUrl: location.hash } })
  }
  activeLink(item) {
    console.log(item);
    
    this.activeRouterLink = item?.link1;
    document?.getElementById('vertical-menu-btn')?.click()
    if (item?.icon === 'logout') {
      this.logout()
    }
    else if(item?.icon === 'aboutus'){
      let body={
        "_userid": this.userObj?._personal_data?.USERID,
        "_game":this.userObj?.otherInfo?.id_coroebus_game,
        _device:"W",
        _section:"About Us",
        _description: "About Us"
      }
    
    
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })
      this.url = 'https://www.thegamificationcompany.com/';
      window.open(this.url, '_blank');
      
    }
    else if(item?.icon === 'Aboutgameicon'){
   
      this.url = this.filepath;
      window.open(this.url, '_blank');
    }
    else if(item?.icon === 'Aboutgameicon'){
      this.url = this.filepath;
      window.open(this.url, '_blank');
    }
    else if(item?.icon === 'myper'){
      let body={
        "_userid": this.userObj?._personal_data?.USERID,
        "_game":this.userObj?.otherInfo?.id_coroebus_game,
        _device:"W",
        _section:"Performance",
        _description: "From Menu"
      }
    
    
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })
    }
    else if(item?.icon === 'rewards'){
      let body={
        "_userid": this.userObj?._personal_data?.USERID,
        "_game":this.userObj?.otherInfo?.id_coroebus_game,
        _device:"W",
        _section:"Rewards Page",
        _description: "From Menu"
      }
    
    
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })
    }
    else if(item?.icon === 'playzone'){
      let body={
        "_userid": this.userObj?._personal_data?.USERID,
        "_game":this.userObj?.otherInfo?.id_coroebus_game,
        _device:"W",
        _section:"Achievement Shelf",
        _description: "From Menu"
      }
    
    
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })
    }
    else if(item?.icon === 'home' && this.is_interactive_dashboard=="0"){
      this.router.navigateByUrl("/dashboard")
    }
  
    
    
if(this.id_role=='7'){
  this.menuItems=MENU_SPECTATOR

}
else if(this.id_role=='13'){
  this.menuItems=MENU_HOS

}
else if(this.id_role=='9'){
  this.menuItems=MENU_HOS

}
else{
  this.menuItems = MENU;
}
   
    // this.menuItems=MENU_SPECTATOR
   
    console.log(this.menuItems);

    // else if(item?.icon === 'home'){
    //    this.dashboard.activeTabForSectionView_2='0'
       
    // }
  }
 
  


}
