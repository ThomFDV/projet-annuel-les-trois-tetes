import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../models/game';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {Player} from '../../../models/player';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  smallBlind = 10;
  tapis = 1000;
  value = this.smallBlind;
  max = this.tapis;
  min = this.smallBlind;
  game: Game;
  user: any;
  connectedPlayer: Player;

  constructor(private route: ActivatedRoute,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.getGame();
    this.playerStuff();
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

  playerStuff() {
    // for (let player of this.game.players) {
    //   if (player.email === 'toto@toto.toto') {
    //     alert('found you !');
    //   }
    // }
    alert(this.game);
  }
}
