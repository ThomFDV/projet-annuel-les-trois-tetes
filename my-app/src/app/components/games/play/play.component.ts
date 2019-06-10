import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../models/game';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

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

  leave(gameId) {
    this.gameService.leaveGame(gameId).subscribe(() => {
      alert('Vous avez quitter la partie !');
    }, () => {
      alert('Vous êtes déjà de la partie !');
    });
  }
}
