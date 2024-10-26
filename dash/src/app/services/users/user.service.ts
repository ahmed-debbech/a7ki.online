import { Injectable } from '@angular/core';
import { test_users } from 'src/tests/test_parts';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUsersByTime(start : string, end:string){
    let users = test_users;
  }
}
