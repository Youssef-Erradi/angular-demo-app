import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL:string = environment.apiBaseUrl

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

  searchByKeyword(keyword:string) : Observable<User[]>{
    let params = new HttpParams();
    params = params.append('q', keyword.toLowerCase() );
    return this.http.get<User[]>(`${this.API_URL}`,{params:params})
  }

}
