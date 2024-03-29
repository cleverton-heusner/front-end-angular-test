import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

import users from '../../../users.json';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {users};
  }
}
