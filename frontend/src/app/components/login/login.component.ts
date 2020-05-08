import { AuthService } from './../../Services/auth.service';
import { TokenService } from './../../Services/token.service';
import { JarwisService } from './../../Services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };
  public error;
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
    return this.Jarwis.login(this.form).subscribe(
      data=>this.handleResponse(data),
      error=> this.handleError(error)
    );
  }
  handleError(error)
  {
    this.error=error.error.error;
  }
  handleResponse(data)
  {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }
}
