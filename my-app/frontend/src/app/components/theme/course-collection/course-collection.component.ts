import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../models/theme';
import {ThemeService} from '../../../services/theme.service';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-course-collection',
  templateUrl: './course-collection.component.html',
  styleUrls: ['./course-collection.component.scss']
})
export class CourseCollectionComponent implements OnInit {

  theme: Theme;
  userTheme;
  user: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private themeService: ThemeService,
              private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
        this.user = user;

        let id: string;
        this.route.params.subscribe(params => id = params.id);

        this.themeService.getUserTheme(id)
          .subscribe(userTheme => {
            this.userTheme = userTheme[0];

          }, (err) => {

          });

        this.themeService.getThemeById(id)
          .subscribe(theme => {
            console.log(theme.id);
            this.theme = theme[0];
          }, (err) => {
            console.error(err);
          });
      },
      error => {
        alert('Vous devez vous connecter');
        this.router.navigate([`login`]);
      });
  }

  view(themeId, courseId) {

    this.themeService.getCourse(themeId, courseId).subscribe(() => {
    }), () => {
      alert('Une erreur est survenue');
    };
  }
}
