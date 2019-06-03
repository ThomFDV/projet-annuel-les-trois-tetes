import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.scss']
})
export class InfoAccountComponent implements OnInit {

  profilePicturePath = '../../../assets/images/thomas.png';
  user: any;
  hide = true;
  hide2 = true;
  hide3 = true;
  oldPassword: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.profile().subscribe(user => {
      this.user = user.user;
    }, (err) => {
      console.error(err);
    });
  }
}
