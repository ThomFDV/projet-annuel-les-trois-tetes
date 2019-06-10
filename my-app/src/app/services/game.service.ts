import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Game} from '../models/game';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url = 'http://localhost:3000/game';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  createGame(game: Game): Observable <any> {
    return this.http.post(this.url + '/create', {
      title: `${game.title}`,
      mode: `${game.mode}`,
      buyIn: `${game.buyIn}`,
      maxPlayer: `${game.maxPlayer}`,
      cashPrice: `${game.cashPrice}`
    }, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  joinGame(gameId): Observable <any> {
    return this.http.put(`${this.url}/join/${gameId}`,
        null,
        {
          headers: this.tokenStorage.getHeaderToken()
        }
    );
  }

  leaveGame(gameId): Observable <any> {
    return this.http.put(`${this.url}/leave/${gameId}`,
        null,
        {
          headers: this.tokenStorage.getHeaderToken()
        }
    );
  }

  getCollection() {
    return this.http.get(this.url + '/collection');
  }

  getGame(gameId): Observable <Game> {
    return this.http.get<Game>(`${this.url}/${gameId}`);
  }
}
