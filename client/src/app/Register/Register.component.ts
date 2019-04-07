import { Component, OnInit } from '@angular/core';
import {UserauthService} from '../userauth.service';
import {RouterModule,Router} from '@angular/router';
import { FlashMessagesService  } from 'angular2-flash-messages';
import {User} from '../User';
import {ValidateService} from '../validate.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
  providers:[UserauthService]
})
export class RegisterComponent implements OnInit {

  users:User[];
  user:User;
  username: String;
  password: String;
  email: String;

  constructor(private flashMessage: FlashMessagesService,
    private authService:UserauthService,private validate:ValidateService
    , private router: Router ) { }

  ngOnInit() {
  }

  onRegisterSubmit()
  {
    const newUser =
    {
      username:this.username,
      password:this.password,
      email:this.email,
    };

    if(!this.validate.validateRegister(newUser))
    {
      this.flashMessage.show("Please fill all fields",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    
    if(!this.validate.validateEmail(newUser.email))
    {
      this.flashMessage.show("Please give valid email id",{cssClass:'alert-danger',timeout:3000});
      return false;
    }



    this.authService.addUser(newUser).subscribe((data)=>
    {
      if(data.success)
      {
        this.flashMessage.show('You are now registered and can log in!',{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/']);
      }
      else{
        this.flashMessage.show("Something went wrong!",{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
      }
    });
  }

    

}
