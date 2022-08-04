import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user:User = {
    name : '',
    birthDate:'',
    email:''
  }

  constructor(private service:UserService) { }

  ngOnInit(): void {
  }

  sendUser():void{
    this.service.send(this.user).subscribe(
      { next : (n) => location.reload(),
        error : (e) => console.error(e)
      }
    )
  }
}