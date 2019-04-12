import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.scss']
})
export class InfoAccountComponent implements OnInit {

  profilePicturePath: string = '../../../assets/images/thomas.png';

  constructor() { }

  ngOnInit() {
  }

}
