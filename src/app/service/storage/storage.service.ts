import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private router: Router) { }

  token(token?: any): any {
    try {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        return localStorage.getItem("token");
      }
    } catch (e) { }
  }

  hasToken() {
    return this.token() ? true : false;
  }

  logout(): any {
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }
}
