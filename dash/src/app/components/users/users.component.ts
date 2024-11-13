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
  users : User[] = []

  constructor(
    private userService : UserService
  ){}

  ngOnInit(): void {

  }

  async goSearch(start: string, end: string){
    this.start_time = convertDateToTimestamp(start);
    this.end_time = convertDateToTimestamp(end)

    let users = await this.userService.getUsersByTime(this.start_time, this.end_time)
    this.users = users
    console.log(this.users)
  }

}
