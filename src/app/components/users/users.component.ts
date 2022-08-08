import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  protected users:Array<User> = []

  constructor(private service:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getUsers()
    console.log(this.route.snapshot.params)
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

  public delete(id:number){
    if(confirm(`Are you sure you want to delete the user with ID ${id} ?`))
      this.service.delete(id).subscribe(
        { next : () => {
            alert("User deleted")
            this.ngOnInit();
          },
          error : (e) => console.error(e)
        }
      )
  }

}
