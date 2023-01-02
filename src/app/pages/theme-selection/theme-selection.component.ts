import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpProtocols } from '@app/http/http.protocols';
import { UserModel } from '@models/user.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as themeActions from '../../core/app-state/actions';
import { takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../core/app-state';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Util } from '@app/utils/util';
import { ApiserviceService } from 'app/apiservice.service';
@Component({
  selector: 'app-theme-selection',
  templateUrl: './theme-selection.component.html',
  styleUrls: ['./theme-selection.component.scss']
})
export class ThemeSelectionComponent implements OnInit, OnDestroy {
  userObj: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  themeList: any;
  selectedTheme: any
  showComponent: boolean = false
  constructor(private readonly store: Store, private router: Router, public Util: Util,public http:ApiserviceService) {
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      this.getThemes()
    })
  }

  ngOnInit(): void {

  }
  async getThemes() {
    let err: any, res: any;
    let body: any;
    body = { "userid": this.userObj?._personal_data?.USERID };
    [err, res] = await HttpProtocols.to(UserModel.getThemes(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200) {

      let body={
        _userid:this.userObj?._personal_data?.USERID,
        _game:"na",
        _device:"W",
        _section:"Theme Page",
        _description:"Theme Page"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })

      const newArr = [];
      while (res?.data?.length) newArr.push(res?.data?.splice(0, 3));
      this.themeList = newArr
      this.selectedTheme = this.themeList?.[0]?.[0]?.id_coroebus_theme
      if (this.themeList?.[0]?.length === 1) {
        this.selectTheme()
      } else {
        this.showComponent = true
      }
    } else {
      Swal.fire({
        title: '',
        text: res?.message || res?.data,
        imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: '#556ee6'
      });
    }
  }
  handleChange(event, data) {
    this.selectedTheme = data?.id_coroebus_theme
    this.selectTheme()
  }
  selectTheme() {
    let body={
      _userid:this.userObj?._personal_data?.USERID,
      _game:"na",
      _device:"W",
      _section:"Theme Page",
      _description:"Theme selected"
    }

    this.http.engagamentlog(body).subscribe(res=>{
      console.log(res);
      
    })

    this.store.dispatch(themeActions.theme({ theme: { 'id_coroebus_theme': this.selectedTheme } }))
    this.router.navigate(['/account/game/selection']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  handleCarouselEvents(event: any) {
    console.log(event);
  }

}
