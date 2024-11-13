import { Injectable } from '@angular/core';
import { test_users } from 'src/tests/test_parts';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUsersByTime(start : string, end:string){
    var users :User[] = []
    try{
      users = test_users;
    }catch(e){
      console.log(e)
    }
    return users
  }
}
