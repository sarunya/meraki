import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app/AppSettings';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class HttpUtility {

    constructor (private http: HttpClient) {
    }

    public getHttpCall(url) {
        console.log("url", url);
        return this.http.get(url, {observe:"response"});      
    }

    public postCall(url, body, headers) {
        
    }
}