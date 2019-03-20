import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuItems = [
    {
      id: 1,
      name: 'Articles'
    },
    {
      id: 2,
      name: 'Cours'
    },
    {
      id: 3,
      name: 'Jouer en ligne'
    },
    {
      id: 4,
      name: 'Mis en situation'
    },
    {
      id: 5,
      name: 'Contact'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
