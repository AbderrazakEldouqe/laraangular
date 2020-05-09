
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };
  public error = {
    email: null,
    password: null,
    password_confirmation: null
  }
  constructor(
    private route:ActivatedRoute,
    private Jarvis: JarwisService,
    private router: Router,
    private snotify: SnotifyService
  ) 
  { 
   route.queryParams.subscribe(params=>{
    this.form.resetToken=params['token']
    });
  }

  ngOnInit(): void {
  }
  onSubmit()
  {
    this.Jarvis.changePassword(this.form).subscribe(
      data=> this.handleResponse(data),
      error=> this.handleError(error)
    );
  }
  handleResponse(data)
  {
    let _router= this.router;
    this.snotify.confirm('Done!, Now login w3ith password',{
      buttons:[
        {
          text:'Okey',
          action:toster =>{
            _router.navigateByUrl('/login');
            this.snotify.remove(toster.id);
          }
        }
      ]
    });
  }
  handleError(error)
  {
    this.error= {
      email: null,
      password: null,
      password_confirmation: null
    };
    if(error.error.errors)
    {
      this.error= error.error.errors;
    }
    if(error.error.error)
    {
      this.snotify.error(error.error.error);
    }
  }

}
