import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  storeTokens(access:string, refresh:string){
    const tokens = JSON.stringify({access:access, refresh:refresh})
    localStorage.setItem("tokens", tokens)
  }
}
