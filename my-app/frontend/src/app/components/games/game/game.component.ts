import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../models/game';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gamers = [];
  game: Game;
  user: User;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private userService: UserService,
              private router: Router) {}

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
      }, (err) => {
        console.error(err);
      });
  }
}
