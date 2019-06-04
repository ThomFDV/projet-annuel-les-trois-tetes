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
      currentPlayerNbr: `${game.currentPlayerNbr}`,
      cashPrice: `${game.cashPrice}`
    }, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  getCollection() {
    return this.http.get(this.url + '/collection');
  }
}
