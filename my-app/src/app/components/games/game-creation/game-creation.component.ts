import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from '../../../services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.component.html',
  styleUrls: ['./game-creation.component.scss']
})
export class GameCreationComponent implements OnInit {

  newGameForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private gameService: GameService,
              private router: Router) { }

  ngOnInit() {
    this.newGameForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      buyIn: ['', [Validators.required]],
      maxPlayer: ['', [Validators.required]],
      currentPlayerNbr: ['0', [Validators.required]],
      cashPrice: ['', [Validators.required]],
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
