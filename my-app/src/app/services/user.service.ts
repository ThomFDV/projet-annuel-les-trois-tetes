import { User } from '../models/user';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';

@Injectable({ providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient, private token: TokenStorageService) { }

    register(user: User) {
        return this.http.post('http://localhost:3000/api/user/register', user);
        // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // return this.http.post<User[]>(`http://localhost:3000/api/user/register`, user, httpOptions);
    }

    login(email: string, password: string): Observable <any> {
        return Observable.create(observer => {
            this.http.post('http://localhost:3000/api/user/login', {
                email,
                password
            }).subscribe((data: any) => {
                observer.next({user: data.user});
                this.token.saveToken(data.token);
                observer.complete();
            })
        });
    }

    signOut(): void {
        this.token.signOut();
        delete (<any>window).user;
        alert('Deconnected! See you soon!');
    }
}
