import { Injectable } from '@angular/core';

import users from '../../../users.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly URL_USER_DETAILS = '/user-details';
  static readonly URL_USERS = '/users';

  constructor() { }

  getAll() {
    return users;
  }
}
