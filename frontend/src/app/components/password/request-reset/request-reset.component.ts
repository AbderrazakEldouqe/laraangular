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
    this.snotifyService.info('Wait...',{timeout:5000});
    this.Jarvise.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error =>this.snotifyService.error(error.error.error)
    );
  }
  handleResponse(res)
  {
    this.snotifyService.success(res.data,{timeout:5000});
    console.log(res);
    this.form.email= null;
  }
}
