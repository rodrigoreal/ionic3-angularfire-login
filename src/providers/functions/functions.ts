import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http'; 

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

@Injectable()
export class FunctionsProvider {
  url: string;
  constructor(private http: Http, private afAuth: AngularFireAuth) {
    this.url = ' https://us-central1-ionic2-angularfire-login-14ea3.cloudfunctions.net/api/';
  }

  post(method: string, data: object): Observable<any> {
    return Observable.create((observer) => {
      this.afAuth.authState.first().subscribe((user: firebase.User) => {
        user.getIdToken().then((token) => {
          const url = this.url + method;
          const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          });
          const options = new RequestOptions({ headers, });
          this.http.post(url, data, options).map(res => res.json()).subscribe((response) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
        });
      });
    });
  }

  put(method: string, data: object): Observable<any> {
    return Observable.create((observer) => {
      this.afAuth.authState.first().subscribe((user: firebase.User) => {
        user.getIdToken().then((token) => {
          const url = this.url + method;
          const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          });
          const options = new RequestOptions({ headers, });
          this.http.put(url, data, options).map(res => res.json()).subscribe((response) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
        });
      });
    });
  }

  delete(method: string): Observable<any> {
    return Observable.create((observer) => {
      this.afAuth.authState.first().subscribe((user: firebase.User) => {
        user.getIdToken().then((token) => {
          const url = this.url + method;
          const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          });
          const options = new RequestOptions({ headers, });
          this.http.delete(url, options).map(res => res.json()).subscribe((response) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
        });
      });
    });
  }

  get(method: string, query?: {}): Observable<any> {
    return Observable.create((observer) => {
      this.afAuth.authState.first().subscribe((user: firebase.User) => {
        user.getIdToken().then((token) => {
          const url = this.url + method;
          const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          });
          const params: URLSearchParams = new URLSearchParams();
          for (const key in query) {
            params.set(key, query[key]);
          }
          const options = new RequestOptions({ headers, search: params });
          this.http.get(url, options).map(res => res.json()).subscribe((response) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
        });
      });
    });
  }
}
