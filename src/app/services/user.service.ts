import { AppSettings } from '../AppSettings';
import { HttpUtility } from '../../utils/http-util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl;
  private googlePath;

  constructor(private httpUtil: HttpUtility) { 
    this.baseUrl = AppSettings.GOOGLE_API_ENDPOINT;
    this.googlePath = AppSettings.PATHS.user;
  }

  public validateUserCall(accessToken) {
    return this.httpUtil.getHttpCall(this.baseUrl+this.googlePath.google_validate+accessToken);
  }

}
