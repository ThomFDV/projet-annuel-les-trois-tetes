import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../../services/game.service';
import {Router} from '@angular/router';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.component.html',
  styleUrls: ['./game-creation.component.scss']
})
export class GameCreationComponent implements OnInit {

  newGameForm: FormGroup;
  submitted = false;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private gameService: GameService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
        this.user = user;

        this.newGameForm = this.formBuilder.group({
          title: ['', [Validators.required]],
          mode: ['', [Validators.required]],
          buyIn: ['', [Validators.required]],
          maxPlayer: ['', [Validators.required]],
          cashPrice: ['', [Validators.required]],
          initialStack: ['', [Validators.required]],
        });
      },
      error => {
        alert('Vous devez vous connecter');
        this.router.navigate([`login`]);
      });
  }

  onSubmit() {

    if (this.newGameForm.invalid) {
      return;
    }
    this.gameService.createGame(this.newGameForm.value)
      .subscribe(
        () => {
          alert('La partie à bien été créé!');
          this.router.navigate(['games/home']);
          this.submitted = true;
        },
        error => {
          alert('Vous n\'êtes pas connecté, échec de la création');
        });

  }
}
