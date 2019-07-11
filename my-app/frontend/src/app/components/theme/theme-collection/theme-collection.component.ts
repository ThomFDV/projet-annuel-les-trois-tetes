import { Component, OnInit } from '@angular/core';
import {Theme} from '../../../models/theme';
import {ThemeService} from '../../../services/theme.service';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-theme-collection',
  templateUrl: './theme-collection.component.html',
  styleUrls: ['./theme-collection.component.scss']
})
export class ThemeCollectionComponent implements OnInit {

  private themes: Theme[] = [];
  user: User;
  newThemeForm: FormGroup;

  constructor(private themeService: ThemeService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
        this.user = user;

        this.themeService.getThemes().subscribe((res: Theme[]) => {
          this.themes = res;
        }), err => {
          alert('Une erreur est survenue' + err);
        };

        this.newThemeForm = this.formBuilder.group({
          title: ['', [Validators.required]]
        });

      },
        error => {
          alert('Vous devez vous connecter');
          this.router.navigate([`login`]);
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
          alert('Vous n\'avez pas l\'autorisation, échec de la création');
        });
  }
}

