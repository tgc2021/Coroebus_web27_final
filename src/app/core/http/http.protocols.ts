import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import * as pe from 'parse-error'
import { AppInjector } from '../../app.module'
import { environment } from '@env'

export class HttpProtocols {
  constructor() { }
  static get _router() {
    return AppInjector.get(Router)
  }

  static get _http() {
    return AppInjector.get(HttpClient)
  }
  static getUrlParams(route: any) {
    return new Promise((resolve) => {
      route.params.subscribe((params) => resolve(params))
    })
  }

  // global function that will help use handle promise rejections, this article talks
  static to(promise: any, parse?: any) {
    return promise
      .then((data: any) => {
        return [null, data]
      })
      .catch((err: any) => {
        
        if (parse === false) {
          return [err]
        }
        return [pe(err)]
      })
  }

  // TE stands for Throw Error
  // tslint:disable-next-line:variable-name
  static TE = (err_message: string, log?: boolean) => {
    if (log === true) {
      console.error(err_message)
    }
    const config = { data: { title: 'Alert!', body: err_message } }
    alert(JSON.stringify(config))
    // throw new Error(err_message)
  }

  static getApiUrl() {
    return this.getEnvObj()
  }

  static getEnvObj() {
    return environment
  }

  static apiHeaders(headers: any, isFormData?: any) {
    if (isFormData !== undefined) {
      headers = headers.append('mimeType', 'multipart/form-data')
    } else {
      headers = headers.append('Content-Type', 'application/json')
    }
    return headers
  }

  static responder(err: any, res: any) {
    let send: any
    if (err) {
      send = err
    }
    if (res) {
      send = res
    }
    return JSON.parse(JSON.stringify(send))
  }

  static async post(url: any, data: any, isFormData?: any) {
    // tslint:disable-next-line:one-variable-per-declaration
    let err: any, res: any
      ;[err, res] = await this.to(
        this._http.post<any>(url, data).toPromise(),
        true
      )
    return this.responder(err, res)
  }

  static async put(url: any, data: any) {
    // tslint:disable-next-line:one-variable-per-declaration
    let err: any, res: any
      ;[err, res] = await this.to(
        this._http.put<any>(url, data).toPromise(),
        true
      )
    return this.responder(err, res)
  }

  static async patch(url: any, data: any) {
    // tslint:disable-next-line:one-variable-per-declaration
    let err: any, res: any
      ;[err, res] = await this.to(
        this._http.patch<any>(url, data).toPromise(),
        true
      )
    return this.responder(err, res)
  }

  static async delete(url: any, data?: any) {
    const headers = new HttpHeaders()
    const httpOptions = {
      headers: this.apiHeaders(headers),
      body: data,
    }
    // if (url[0] === '/') {
    //   url = this.getApiUrl() + url
    // }
    // tslint:disable-next-line:one-variable-per-declaration
    let err: any, res: any
      ;[err, res] = await this.to(
        this._http.delete<any>(url, httpOptions).toPromise(),
        true
      )
    return this.responder(err, res)
  }

  static async get(url: any, responseType: any = 'json', forPolling: boolean = false) {
    // tslint:disable-next-line:one-variable-per-declaration
    const headers = new HttpHeaders()
    const httpOptions = {
      headers: headers.append('isPolling', ''),
      responseType: responseType
    }
    if (!forPolling) {
      delete httpOptions.headers
    }
    let err: any, res: any

      ;[err, res] = await this.to(
        this._http
          .get<any>(url, httpOptions)
          .toPromise(),
        false
      )
    return this.responder(err, res)
  }
  static route(uri: any) {
    this._router.navigate([uri])
  }
  static async getWithCancel(url: any, responseType: any = 'json') {
    return this._http
      .get<any>(url, { responseType: responseType })
  }
}
