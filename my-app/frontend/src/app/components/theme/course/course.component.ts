import {Component, OnInit} from '@angular/core';
import {Theme} from '../../../models/theme';
import {ThemeService} from '../../../services/theme.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../../models/course";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  theme: Theme;
  user: User;

  constructor(private themeService: ThemeService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
        this.user = user;

        let themeId: string;
        let courseId: string;

        this.route.params.subscribe(params => themeId = params.themeId);
        this.route.params.subscribe(params => courseId = params.courseId);

        this.themeService.getCourse(themeId, courseId)
          .subscribe(theme => {
            this.theme = theme[0];

          }, (err) => {
            alert("Vous n'avez pas accès à ce cours");
            this.router.navigate([`theme/${themeId}`]);
          });
      },
      error => {
        alert('Vous devez vous connecter');
        this.router.navigate([`login`]);
      });
  }


}
