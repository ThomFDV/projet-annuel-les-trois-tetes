import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user";

@Component({
  selector: 'app-statistic-home',
  templateUrl: './statistic-home.component.html',
  styleUrls: ['./statistic-home.component.scss']
})
export class StatisticHomeComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
      this.user = user;
      },
      error => {
        alert('Vous devez vous connecter');
        this.router.navigate([`login`]);
      });
  }

}
