import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isVisibleSubject: Subject<boolean> = new Subject();

  constructor() {}

  show() {
    this.isVisibleSubject.next(true);
  }

  hide() {
    this.isVisibleSubject.next(false);
  }
}
