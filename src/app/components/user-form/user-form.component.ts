import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user:UserViewModel = {
    name : '',
    birthDate:'',
    email:''
  }
  private url:string = 'http://localhost:8080/api/users'

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  sendUser():void{
    alert(this.user.name + '\n' +this.user.email+'\n'+this.user.birthDate)
    this.http.post(this.url, this.user).subscribe(
      { next : (v) => {location.reload()},
        error : (e) => {alert(e.getMessage())}
      }
    )
  }
}

export interface UserViewModel{
  name:string
  birthDate:string
  email:String 
}
