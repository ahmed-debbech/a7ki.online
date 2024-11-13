import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/users/user.service';
import { convertDateToTimestamp } from 'src/app/utils/date';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  start_time : string = "";
  end_time : string = "";
  ip_addr : string = "";

  users : User[] = []

  constructor(
    private userService : UserService
  ){}

  ngOnInit(): void {

  }

  async goSearch(start: string, end: string, ip : string){
    this.start_time = convertDateToTimestamp(start);
    this.end_time = convertDateToTimestamp(end)
    this.ip_addr = ip;

    let users
    if(this.ip_addr.length == 0){
      users = await this.userService.getUsersByTime(this.start_time, this.end_time)
    }else{
      users = await this.userService.getUsersByTimeAndIp(this.start_time, this.end_time, this.ip_addr)
    }

    this.users = users
    console.log(this.users)
  }

}
