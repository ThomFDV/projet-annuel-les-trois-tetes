import {Component, OnInit} from '@angular/core';
import {Game} from '../../../models/game';
import {GameService} from '../../../services/game.service';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";

@Component({
  selector: 'app-home-game',
  templateUrl: './home-game.component.html',
  styleUrls: ['./home-game.component.scss']
})
export class HomeGameComponent implements OnInit {

  private games: Game[] = [];
  user: User;

  constructor(private gameService: GameService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
        this.user = user;
        this.gameService.getCollection().subscribe((res: Game[]) => {
          this.games = res;
        }, (err) => {
          alert('Une erreur est survenue ' + err.status);
        });

      },
      error => {
        alert('Vous devez vous connecter');
        this.router.navigate([`login`]);
      });
  }

  join(gameId) {
    return this.gameService.joinGame(gameId).subscribe(() => {
      alert('Vous avez rejoint la partie !');
    }, () => {
      alert('Vous êtes déjà de la partie !');
    });
  }
}
