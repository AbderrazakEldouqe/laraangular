import { JarwisService } from './../../Services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };
  public error = {
    email: null,
    name: null,
    password: null
  }
  
  constructor(
    private Jarwis:JarwisService,
    private Token:TokenService,
    private router: Router,
    private Auth:AuthService
    ) { }

  ngOnInit(): void {
    
  }

  onSubmit()
  {
    this.Jarwis.signup(this.form).subscribe(
      data=> this.handleResponse(data),
      error=> this.handleError(error)
    );
  }
  handleError(error)
  {
    this.error=error.error.errors;
  }
  handleResponse(data)
  {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }
}
