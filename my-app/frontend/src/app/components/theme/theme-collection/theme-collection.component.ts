import { Component, OnInit } from '@angular/core';
import {Theme} from '../../../models/theme';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-theme-collection',
  templateUrl: './theme-collection.component.html',
  styleUrls: ['./theme-collection.component.scss']
})
export class ThemeCollectionComponent implements OnInit {

  private themes: Theme[] = [];


  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.getThemes().subscribe((res: Theme[]) => {
      this.themes = res;
    }), err => {
      alert('Une erreur est survenue' + err);
    };
  }

  view(themeId) {

    this.themeService.getThemeById(themeId).subscribe(() => {
    }), () => {
      alert('Une erreur est survenue');
    };
  }
}

