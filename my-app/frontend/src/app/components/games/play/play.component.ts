import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../models/game';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {Player} from '../../../models/player';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  game: Game;
  user: any;
  connectedPlayer: Player;
  tapis = 1000;
  max = this.tapis;
  min = 10;
  value = this.min;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getUser();
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

  getUser() {
    this.user = this.userService.profile().subscribe(user => {
      this.user = user.user;
    }, (err) => {
      console.error(err);
    });
  }

  playerStuff() {
    // for (let player of this.game.players) {
    //   if (player.email === 'toto@toto.toto') {
    //     alert('found you !');
    //   }
    // }
  }
}
