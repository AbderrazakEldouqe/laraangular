import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../Services/auth.service';
import { TokenService } from './../../Services/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn : boolean;
  constructor(
    private Auth:AuthService,
    private Token:TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(value=> this.loggedIn=value);
  }

  logout(event : MouseEvent)
  { 
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }
}
