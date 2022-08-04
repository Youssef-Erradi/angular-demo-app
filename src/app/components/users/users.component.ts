import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  protected users:Array<User> = []
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  public getUsers(){
    this.service.getAll().subscribe(
      { next : (response) => {
          this.users = response;
        },
        error : (e) => console.error(e)
      }
    )
  }

}
