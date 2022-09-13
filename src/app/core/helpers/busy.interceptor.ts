import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BusyService } from '@app/services/busy.service'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'

@Injectable()
export class BusyInterceptor implements HttpInterceptor {
    constructor(private busyService: BusyService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const msg = req.method === 'GET' ? 'Loading ...' : 'Saving ...'

        this.busyService.increment(msg)
        return next.handle(req).pipe(
            finalize(() => {
                this.busyService.decrement()
            })
        )
    }
}