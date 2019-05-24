import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.scss']
})
export class LoginAccountComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  email: string;
  password: string;

  ngOnInit() {
  }

  login(): void {
    this.userService.login(this.email, this.password)
        .subscribe(
            data => {
              this.router.navigate(['/account']);
            },
            error => {
              alert('error !');
            });
  }

}
