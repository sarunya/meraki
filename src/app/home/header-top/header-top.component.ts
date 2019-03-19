import { Component, OnInit, NgZone } from '@angular/core';
import { Globals } from '../../globals';
import { CookieService } from 'ngx-cookie-service';
import * as sha from 'js-sha512';

declare const gapi;
@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css'],
  providers: [ Globals ]
})
export class HeaderTopComponent implements OnInit {
  userImageUrl:any;
  signIn: any = false;
  userName : any;
  constructor(ngZone:NgZone, public globals: Globals, private cookieService: CookieService) {
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));

    window['signOut'] = () => ngZone.run(() => this.signOut());
  }
  ngOnInit() {
  }

  public onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //this.userImageUrl = profile.getImageUrl().toString();
    this.userName = profile.getName();
    this.userImageUrl = {
      'background-image': 'url('+profile.getImageUrl()+'?sz=48)'
    };
    this.signIn = true;
    let authResponse = googleUser.getAuthResponse();
    
    this.cookieService.set("g_access_token", authResponse.access_token, authResponse.expires_in);
    this.cookieService.set("g_id_token", authResponse.id_token, authResponse.expires_in);
    this.cookieService.set("g_login_hint", authResponse.login_hint, authResponse.expires_in);
  }

  public pleaseCallThis() {
    console.log("please call this");
  }

  public signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      this.signIn = false;
      this.globals.userDetails = null;
    });
  }

  private toSha512(str) {
    return sha.sha512.hmac('key', str);
  }
}
