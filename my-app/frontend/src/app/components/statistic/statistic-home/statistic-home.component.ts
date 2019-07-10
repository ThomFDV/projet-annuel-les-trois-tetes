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

  user;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getStatistics().subscribe(user => {

        this.user = user;

      }, (err) => {

        alert("fail")
      });
  }

}
