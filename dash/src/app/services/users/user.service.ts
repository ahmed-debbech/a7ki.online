import { Injectable } from '@angular/core';
import { test_users } from 'src/tests/test_parts';
import { ipToCountry } from 'src/app/utils/networking';
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

      for(let i = 0; i<=users.length-1; i++){
        users[i].ip = "("+ ipToCountry(users[i].ip) + ") " + users[i].ip
      }
    }catch(e){
      console.log(e)
    }
    return users
  }
}
