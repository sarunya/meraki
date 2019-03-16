import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AppSettings } from './../app/AppSettings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class HttpUtility {

    constructor(private http: HttpClient) {
    }

    public getHttpCall(url, headers = {}): Observable<HttpResponse<Object>> {
        console.log("url", url);
        return this.http.get(url, {
            headers: new HttpHeaders(headers),
            observe: "response"
        });
    }

    public postHttpCall(url, body, headers={}) {
        const me = this;
        return me.http.post(url, body, {
            headers: new HttpHeaders(headers),
            observe: "response"
        });
    }

    private _constructHttpOptions(headers, observe) {
        return {
            headers: new HttpHeaders(headers),
            observe: observe
        }
    }
}