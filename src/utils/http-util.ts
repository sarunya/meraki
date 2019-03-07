import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../app/AppSettings';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class HttpUtility {

    baseUrl: string;

    constructor (private http: HttpClient) {
        this.baseUrl = AppSettings.API_ENDPOINT;
    }

    public getHttpCall(path) {
        return this.http.get(this.baseUrl+path, {observe:"response"});      
    }
}