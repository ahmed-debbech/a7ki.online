import { Injectable } from '@angular/core';
import { test_users } from 'src/tests/test_parts';
import { User } from 'src/app/model/User';
import { HttpClient } from '@angular/common/http';
import { env } from 'env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  async getUsersByTime(start : string, end:string){
    var users :User[] = []
    try{
      users = test_users;
      this.http.get<User[]>(env.BASE_URL + '/api/users/' + start + "/" + end).subscribe(config => {
        console.log(config)
      });
    }catch(e){
      console.log(e)
    }
    return users
  }

  async getUsersByTimeAndIp(start : string, end:string, ip:string){
    var users :User[] = []
    try{
      users = test_users;
    }catch(e){
      console.log(e)
    }
    return users
  }
}
