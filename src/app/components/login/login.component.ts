import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  protected formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required,])
    })
  }

  getErrorMessage(fieldName: string): string | void {
    const fieldErrors = this.formGroup.controls[fieldName].errors
    if (!fieldErrors) return

    fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    let message = ''
    if (fieldErrors['required'])
      message += `${fieldName} is required\n`
    if (fieldErrors['email'])
      message += `The value entered is not a valid email address`

    return message;
  }

  login() {
    const { email, password } = this.formGroup.value
    this.auth.login(email, password).subscribe({
      next: tokens => this.auth.storeTokens(tokens).subscribe({
        next: () => this.router.navigateByUrl("/")
      }),
      error: e => alert("Bad Credentials")
    })
  }

}
