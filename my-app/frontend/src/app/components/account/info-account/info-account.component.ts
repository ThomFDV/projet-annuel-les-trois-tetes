import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from "@angular/router";

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

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.userService.profile().subscribe(user => {
      this.user = user.user;
    }, (err) => {
      alert('Vous devez vous connecter');
      this.router.navigate([`login`]);
    });
  }
}
