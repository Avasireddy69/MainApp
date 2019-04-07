import { Component, OnInit } from '@angular/core';
import {UserauthService} from '../userauth.service';
import {RouterModule,Router} from '@angular/router';
import { FlashMessagesService  } from 'angular2-flash-messages';
import {User} from '../User';
import {ValidateService} from '../validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserauthService]
})
export class LoginComponent implements OnInit {

  
  username: String;
  password: String;
 
  constructor(private flashMessage: FlashMessagesService,
    private authService:UserauthService,private validate:ValidateService,private router:Router) { }

  ngOnInit() {
  }

  onLoginSubmit()
{
  const userauth= {
    username:this.username,
    password:this.password,
  };

  if(!this.validate.validateLogin(userauth))
  {
    this.flashMessage.show("Please fill all fields",{cssClass:'alert-danger',timeout:3000});
    return false;
  }
  this.authService.authenticateUser(userauth).subscribe((data)=>
  {
    if(data.success!=true)
    {
      this.flashMessage.show('Wrong credentials! Try again',{cssClass:'alert-danger',timeout:3000});
      this.router.navigate(['']);
    }
    else{
    this.router.navigate(['/home']);
    }
  });
};

}


