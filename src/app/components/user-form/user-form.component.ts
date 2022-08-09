import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
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

  protected formGroup!:FormGroup

  constructor(private service:UserService, private route:ActivatedRoute, private router:Router,
              private formBuiler:FormBuilder) { }

  ngOnInit(): void {
    this.initFormGroup()
    let id:number = this.route.snapshot.params["id"]
    if(id)
      this.getUser(id)   
  }

  saveUser():void{
    this.user = this.formGroup.value
    this.service.save(this.user).subscribe(
      { next : () => this.router.navigate(['/users']),
        error : (e) => console.error(e)
      }
    )
  }

  getUser(id:number):void{
    this.service.get(id).subscribe(
      { next : (user) => {
        this.user = user
        this.initFormGroup()
      },
        error : (e) => console.error(e)
      }
    )
  }

  getErrorMessage(fieldName:string) : string | void{
    const fieldErrors = this.formGroup.controls[fieldName].errors
    if(!fieldErrors) return

    fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    let message = ''
    if(fieldErrors['required'])
      message += `${fieldName} is required\n`
    if(fieldErrors['email'])
      message += `The value entered is not a valid email address`

    return message;
  }

  private initFormGroup(){
    this.formGroup = this.formBuiler.group({
      id: this.formBuiler.control(this.user.id),
      name: this.formBuiler.control(this.user.name, [Validators.required]),
      email: this.formBuiler.control(this.user.email, [Validators.required, Validators.email]),
      birthDate: this.formBuiler.control(this.user.birthDate, [Validators.required]),
    })
  }

}