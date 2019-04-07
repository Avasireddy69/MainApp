import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateLogin(login)
  {
    if(login.username == undefined || login.password == undefined)
    {
      return false;
    }
    else{
      return true;
    }
  }

  validateHotelReg(hotel)
  {
    if(hotel.name == undefined || hotel.location == undefined || hotel.stars == undefined|| hotel.reviews == undefined)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  validateRegister(user)
  {
    if(user.username == undefined ||user.password == undefined||user.email == undefined)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  validateEmail(email)
  {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);  
  }
}
