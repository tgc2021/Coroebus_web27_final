import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    userObj: any
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        private router: Router,
        private readonly store: Store
    ) {
        this.store.select(fromRoot.userLogin).pipe(
            takeUntil(this.destroy$)
        ).subscribe(data => {
            this.userObj = data?.user
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userObj) {
            return true
        }
        // switch (this.userObj?.indicator_flag) {
        //     case "0": {
        //         this.router.navigate(['/dashboard/a']);
        //         return true;
        //     }
        //     case "1": {
        //         this.router.navigate(['/dashboard/b']);
        //         return true;
        //     }
        //     case "2": {
        //         this.router.navigate(['/dashboard/c']);
        //         return true;
        //     }
        //     default: {
        //         this.router.navigate(['/login'])
        //         return false;
        //     }
        // }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
