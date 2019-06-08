import {Component, Input, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-app';

  constructor(private userService: UserService,
              private router: Router,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
  }

  token(): string {
    return this.tokenStorageService.getToken();
  }

  logout(): void {
    this.userService.signOut();
    this.router.navigate(['/']);
  }

}
