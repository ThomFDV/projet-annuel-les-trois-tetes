import { User } from '../models/user';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: User) {
        alert('finally here!');
        return this.http.post(`http://localhost:3000/api/user/register`, user);
        // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // return this.http.post<User[]>(`http://localhost:3000/api/user/register`, user, httpOptions);
    }
}
