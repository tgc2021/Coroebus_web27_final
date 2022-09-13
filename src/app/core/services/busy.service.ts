import { Injectable } from '@angular/core'
import { ReplaySubject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

interface IBusyPayload {
    isBusy: boolean
    message?: string
}

const notBusyPayload: IBusyPayload = { isBusy: false }
@Injectable({ providedIn: 'root' })


export class BusyService {
    private subject = new ReplaySubject<IBusyPayload>()
    public busyCounter = 0
    busyState$ = this.subject.asObservable()

    increment(message: string) {
        this.busyCounter++
        const payload: IBusyPayload = { isBusy: true, message }
        this.subject.next(payload)
    }

    decrement() {
        this.busyCounter--
        if (this.busyCounter <= 0) {
            this.subject.next(notBusyPayload)
        }
    }

    profile(){

    }
   
}