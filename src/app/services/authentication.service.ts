import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private LOGIN_URL:string = environment.loginUrl

  constructor(private http:HttpClient) { }

  login(username:string, password:string) : Observable<any>{
    const credential = JSON.stringify({username:username, password:password});
    return this.http.post(this.LOGIN_URL, credential);
  }

  storeTokens(tokens:string) : Observable<boolean>{
    localStorage.setItem("tokens", JSON.stringify(tokens))
    return of(true);
  }

  getToken() : string | void{
    let item = localStorage.getItem("tokens");
    if(!item) return
    const tokens = JSON.parse(item)
    return tokens.access;
  }
}
