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
      name: 'Articles',
      url: 'articles/collection'
    },
    {
      id: 2,
      name: 'Cours',
      url: 'courses'
    },
    {
      id: 3,
      name: 'Jouer en ligne',
      url: 'play'
    },
    {
      id: 4,
      name: 'Mis en situation',
      url: 'simulation/collection'
    },
    {
      id: 5,
      name: 'Contact',
      url: 'contact'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
