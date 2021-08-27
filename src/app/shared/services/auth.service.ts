import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userLoginSubject = new ReplaySubject<boolean>(1);
  constructor() { }

  setLoggedInUser(isUserLoggedIn) {
    this.userLoginSubject.next(isUserLoggedIn);
  }

  getLoggedInUser() {
    return this.userLoginSubject.asObservable();
  }

}
