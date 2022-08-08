import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  protected users!:Array<User>

  constructor(private service:UserService, private route:ActivatedRoute) { }

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

  public delete(user:User){
    if(confirm(`Are you sure you want to delete the user with ID ${user.id} ?`))
      this.service.delete(user.id!).subscribe(
        { next : () => {
            this.users.splice(this.users.indexOf(user), 1)
            alert("User deleted")
          },
          error : (e) => console.error(e)
        }
      )
  }

}
