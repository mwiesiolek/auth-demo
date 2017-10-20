import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {JwtHelper, tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials))
      .map(response => {
        let result = response.json();
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }

        return false;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return tokenNotExpired();

/*    let token = localStorage.getItem('token');
    if(!token) {
      return false;
    }

    let helper = new JwtHelper();
    let expirationDate = helper.getTokenExpirationDate(token);
    let isExpired = helper.isTokenExpired(token);

    return !isExpired;*/
  }

  get currentUser(): string {
    let token = localStorage.getItem('token');
    if(!token) return null;

    let helper = new JwtHelper();
    return helper.decodeToken(token);
  }
}

