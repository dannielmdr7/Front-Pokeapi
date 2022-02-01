import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient,private router:Router) {}
  authUser(user: string, password: string) {
    return this.http.post(`${this.apiUrl}/authUser`, { user, password });
  }
  createUser(user: string, password: string, nickName: string, team: string) {
    return this.http.post(`${this.apiUrl}/createUser`,{user,password,nickName,team})
  }
  getInfoUser():User{
    const data = JSON.stringify(localStorage.getItem('navigationToken'))
    try {
      return jwt_decode(data);
    } catch(Error) {
      return {
        name:'',
        nickName:'',
        uid:'',
        team:''
      };
    }
  }
  logedOut(){
    localStorage.removeItem('navigationToken');
    this.router.navigateByUrl('/login')
  }
}
