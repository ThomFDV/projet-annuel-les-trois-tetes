import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../models/game';
import {Player} from '../../../models/player';
import {UserService} from '../../../services/user.service';
import {User} from "../../../models/user";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  game: Game;
  min = 0;
  value = this.min;
  user: User;
  userIdx: -1;
  isUserIn = false;
  imgPath: string;
  imgPath2: string;
  boardImg: string[];
  hide = true;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
        this.user = user;
        this.getGame();
      },
      error => {
        alert('Vous devez vous connecter');
        this.router.navigate([`login`]);
      });
  }

  getGame(): void {
    let id: string;
    this.route.params.subscribe(params => id = params.id);
    this.gameService.getGame(id)
      .subscribe(game => {
        this.game = game;
        this.userIdx = this.getUserIdx(game);
        if (this.userIdx > -1) {
          this.isUserIn = true;
        }
        this.getHand(this.userIdx, game);
        this.getBoard(game);
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

  playGame(gameId) {
    this.gameService.playGame(gameId).subscribe(game => {
      this.game = game;
      this.userIdx = this.getUserIdx(game);
      this.getHand(this.userIdx, game);
      this.getBoard(game);
      this.hide = !this.hide;
      alert('La partie commence !');
    }, err => {
      console.log(err);
    });
  }

  bet(value, gameId) {
    this.gameService.bet(value, gameId).subscribe(game => {
      this.game = game;
    }, err => {
      alert(JSON.stringify(err));
    });
  }

  getUserIdx(game) {
    return game.players.findIndex(x => x.email === this.user.email);
  }

  getHand(user, game) {
    this.imgPath = '../../../../assets/images/cards/';
    this.imgPath2 = '../../../../assets/images/cards/';
    if (user > -1 && this.user.email === game.players[user].email && game.players[user].hand !== null) {
      this.imgPath += game.players[user].hand[0][0];
      this.imgPath2 += game.players[user].hand[1][0];
      this.imgPath += game.players[user].hand[0][1];
      this.imgPath2 += game.players[user].hand[1][1];
    } else {
      this.imgPath += 'back';
      this.imgPath2 += 'back';
    }
    this.imgPath += '.png';
    this.imgPath2 += '.png';
    console.log(this.imgPath);
  }

  getBoard(game) {
    this.boardImg = [
        '../../../../assets/images/cards/back.png',
        '../../../../assets/images/cards/back.png',
        '../../../../assets/images/cards/back.png',
        '../../../../assets/images/cards/back.png',
        '../../../../assets/images/cards/back.png'
    ];
    let counter = 0;
    if (game.board.length > 0) {
      for (const card of game.board) {
        this.boardImg[counter] = `../../../../assets/images/cards/${card[0]}${card[1]}.png`;
        counter += 1;
      }
    }
  }
}
