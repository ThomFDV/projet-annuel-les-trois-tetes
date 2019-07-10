import { Component, OnInit } from '@angular/core';
import {Theme} from '../../../models/theme';
import {ThemeService} from '../../../services/theme.service';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-theme-collection',
  templateUrl: './theme-collection.component.html',
  styleUrls: ['./theme-collection.component.scss']
})
export class ThemeCollectionComponent implements OnInit {

  private themes: Theme[] = [];
  newThemeForm: FormGroup;

  constructor(private themeService: ThemeService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.themeService.getThemes().subscribe((res: Theme[]) => {
      this.themes = res;
    }), err => {
      alert('Une erreur est survenue' + err);
    };

    this.newThemeForm = this.formBuilder.group({
      title: ['', [Validators.required]]
    });

  }

  view(themeId) {

    this.themeService.getUserTheme(themeId).subscribe(() => {
    }), () => {
      alert('Une erreur est survenue');
    };
    this.themeService.getThemeById(themeId).subscribe(() => {
    }), () => {
      alert('Une erreur est survenue');
    };

  }

  onSubmit() {

    if (this.newThemeForm.invalid) {
      alert('Format invalide');
      return;
    }
    this.themeService.createTheme(this.newThemeForm.value)
      .subscribe(
        () => {
          alert('Le thème a bien été créé!');
          window.location.reload();
        },
        error => {
          alert('Vous n\'êtes pas connecté, échec de la création');
        });
  }
}

