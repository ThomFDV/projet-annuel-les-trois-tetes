import { User } from '../models/user';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';

@Injectable({ providedIn: 'root'})
export class UserService {
    private url = 'http://localhost:3000/user';

    constructor(private http: HttpClient, private token: TokenStorageService) { }

    register(user: User) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<User[]>(this.url + `/register`, user, httpOptions);
    }

    login(email: string, password: string): Observable <any> {
        return Observable.create(observer => {
            this.http.post(this.url + '/login', {
                email,
                password
            }).subscribe((data: any) => {
                observer.next({user: data.user});
                this.token.saveToken(data.token);
                observer.complete();
            })
        });
    }

    profile(): Observable<any> {
        return this.http.get(this.url + '/profile', {
            headers: this.token.getHeaderToken()
        });
    }

    signOut(): void {
        this.token.signOut();
        delete (<any>window).user;
        alert('Deconnected! See you soon!');
    }
}
