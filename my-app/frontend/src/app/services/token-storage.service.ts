import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class TokenStorageService {

    constructor() { }

    public saveToken(token: string) {
        if (!token) return;
        window.localStorage.removeItem('AuthToken');
        window.localStorage.setItem('AuthToken',  token);
    }

    signOut() {
        window.localStorage.removeItem('AuthToken');
        window.localStorage.clear();
    }

    getToken(): string {
        return window.localStorage.getItem('AuthToken');
    }

    getHeaderToken(): HttpHeaders {
        const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.getToken()});
        return httpOptions;
    }
}
