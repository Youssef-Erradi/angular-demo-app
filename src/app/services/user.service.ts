import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL:string = 'http://localhost:8080/api/users'

  constructor(private http:HttpClient) { }

  getAll() : Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  send(user : User) : Observable<Object> {
    return this.http.post(this.API_URL, user)
  }

}
