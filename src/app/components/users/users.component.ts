import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users! : User[]
  searchFormGroup! : FormGroup

  constructor(private service:UserService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      q : this.formBuilder.control("")
    })
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
            delete this.users[this.users.indexOf(user)]
            alert("User deleted")
          },
          error : (e) => console.error(e)
        }
      )
  }

  protected searchByKeyword(){
    const q = this.searchFormGroup.value.q.toLowerCase();
    this.users = this.users.filter(user => user.name.toLowerCase().includes(q))
  }

}
