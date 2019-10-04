import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User } from './shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly USERS_URL = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.USERS_URL);
  }

  public getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.USERS_URL}/${userId}`);
  }

  public createUser(user: User) {
    return this.httpClient.post(this.USERS_URL, user);
  }

  public deleteUser(userId: number) {
    return this.httpClient.delete(`${this.USERS_URL}/${userId}`);
  }

  public updateUser(user: User) {
    return this.httpClient.put(`${this.USERS_URL}/${user.id}`, user);
  }

  public searchUsersByFirstName(firstName: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.USERS_URL}?firstName=${firstName}`);
  }
}
