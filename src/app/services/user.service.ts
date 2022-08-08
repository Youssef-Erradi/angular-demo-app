import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL:string = 'http://localhost:8080/api/users'

  constructor(private http:HttpClient) { }

  getAll() : Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  save(user : User) : Observable<Object> {
    if(user.id)
      return this.http.put(`${this.API_URL}/${user.id}`, user)  
    return this.http.post(this.API_URL, user)
  }

  delete(id : number) : Observable<Object> {
    return this.http.delete(`${this.API_URL}/${id}`)
  }

  get(id : number) : Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`)
  }

}
