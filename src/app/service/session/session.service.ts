import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  public ready: boolean = false;
  session: any;

  constructor(
    private http: HttpService,
    private storage: StorageService,
  ) { }

  appReady(unset?: any) {
    if (unset === false) {
      this.ready = false;
    } else {
      this.ready = true;
    }
  }

  public get() {
    return this.ready && this.session;
  }

  getWithCb(cb: any) {
    if (this.get()) {
      cb(this.get());
    } else {
      setTimeout(() => {
        this.getWithCb(cb);
      }, 50);
    }
  }

  init(): any {
    return new Promise((resolve, reject) => {
      this.http.secureGet(`auth/self`).subscribe({
        next: (resp: any) => {
          this.ready = true
          this.session = { ...resp };
          console.log(this.session);
        },
        error: (err: any) => {
          console.log(err)
          if (err?.status === 401) {
            this.logout();
          }
        },
        complete: () => {
          this.appReady(true);
          resolve(this.session);
        }
      })
    })
  }

  token(): any {
    try {
      return this.storage.token();
    } catch (e) { }
  }

  hasToken() {
    return this.token() ? true : false;
  }

  user() {
    return this.session;
  }

  company() {
    try {
      return this.session._org;
    } catch (e) { }
  }

  login(userDetails: any): any {
    this.storage.token(userDetails.token);
    return this.init();
  }

  logout() {
    this.appReady(false);
    this.storage.logout();
    // this.socket.removeListener('new-message', () => {
    //   console.log("Socket event listener has been removed!");
    // });
  }
}
