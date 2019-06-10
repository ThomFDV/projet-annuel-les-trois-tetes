import { Component, OnInit } from '@angular/core';
import {Game} from '../../../models/game';
import {GameService} from '../../../services/game.service';

@Component({
  selector: 'app-home-game',
  templateUrl: './home-game.component.html',
  styleUrls: ['./home-game.component.scss']
})
export class HomeGameComponent implements OnInit {

  private games: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getCollection().subscribe((res: Game[]) => {
      this.games = res;
    }, (err) => {
      alert('Une erreur est survenue ' + err.status);
    });
  }

  join(gameId) {
    return this.gameService.joinGame(gameId).subscribe(() => {
      alert('Vous avez rejoint la partie !');
    }, () => {
      alert('Vous êtes déjà de la partie !');
    });
  }
  // addPlayer(gameId) {
  //   // Faire en sorte que ce ne soit pas possible de rejoindre si on l'a deja fait
  //   return this.gameService.addPlayer(gameId).subscribe(() => {
  //     this.games.forEach((value, key) => {
  //       if (value._id === gameId) {
  //         value.currentPlayerNbr += 1;
  //       }
  //     });
  //   }, (err) => {
  //     err.status = 401 ? alert('Sorry, you have to be connected') : alert(err.status);
  //   });
  // }
}
