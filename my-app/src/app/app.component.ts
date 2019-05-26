import {Component, Input, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-app';

  @Input() user: any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  token(): string {
    return this.userService.getToken();
  }

  logout(): void {
    this.userService.signOut();
    this.router.navigate(['/']);
  }

}
