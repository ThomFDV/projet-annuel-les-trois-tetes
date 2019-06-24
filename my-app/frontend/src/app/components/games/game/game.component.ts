import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gamers = [];
  game: Game;

  constructor(private route: ActivatedRoute,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.getGame();
  }

  getGame(): void {
    let id: string;
    this.route.params.subscribe( params => id = params.id);
    this.gameService.getGame(id)
        .subscribe(game => {
          this.game = game;
        }, (err) => {
          console.error(err);
        });
  }
}
