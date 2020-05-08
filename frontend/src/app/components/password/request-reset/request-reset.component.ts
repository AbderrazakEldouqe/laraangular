import { JarwisService } from './../../../Services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };
  public error;
  constructor(
    private Jarvise: JarwisService,
    private snotifyService: SnotifyService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.Jarvise.sendPasswordResetLink(this.form).subscribe(
      data => console.log(data),
      error =>this.snotifyService.error(error.error.error)
    );
  }
  handleResponse(res)
  {
    console.log(res);
    this.form.email= null;
  }
}
