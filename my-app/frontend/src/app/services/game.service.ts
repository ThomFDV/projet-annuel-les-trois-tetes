import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Game} from '../models/game';
import {Observable, Subject} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url = 'http://localhost:3000/game';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  private easyRefresh$ = new Subject<void>();

  get easyRefresh() {
      return this.easyRefresh$;
  }

  createGame(game: Game): Observable <any> {
    return this.http.post(this.url + '/create', {
      title: `${game.title}`,
      mode: `${game.mode}`,
      buyIn: `${game.buyIn}`,
      maxPlayer: `${game.maxPlayer}`,
      cashPrice: `${game.cashPrice}`,
      initialStack: `${game.initialStack}`
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
    return this.http.get(`${this.url}/collection`,
        {
          headers: this.tokenStorage.getHeaderToken()
        }
    );
  }

  getGame(gameId): Observable <Game> {
    return this.http.get<Game>(`${this.url}/${gameId}`,
        {
          headers: this.tokenStorage.getHeaderToken()
        }
    ).pipe(
        tap(() => {
            this.easyRefresh$.next();
        })
    );
  }

  playGame(gameId): Observable <Game> {
    return this.http.get<Game>(`${this.url}/play/${gameId}`,
        {
          headers: this.tokenStorage.getHeaderToken()
        }
    );
  }

  bet(value, gameId): Observable <Game> {
    return this.http.put<Game>(`${this.url}/bet/${gameId}`,
        {value},
        {
          headers: this.tokenStorage.getHeaderToken()
        }
    );
  }

  fold(gameId): Observable <Game> {
    return this.http.put<Game>(`${this.url}/fold/${gameId}`,
        null,
        {
          headers: this.tokenStorage.getHeaderToken()
        }
    );
  }
}
