import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { User } from './User';
import { map } from 'rxjs/operators';

@Injectable()
export class UserauthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  authenticateUser(user)
  {
    let headers =new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/api/user/login',user,{headers:headers}).pipe(map(res=>res.json()));
  }

  addUser(newUser: { username:String; password:String; email:String})
  {
    console.log("register service data: ",newUser);
    return this.http.post('http://localhost:3000/api/user/register',newUser).pipe(map((res)=>
    {
      return res.json();
    }));
  }
}
