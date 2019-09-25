import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private readonly PARAM_UPDATED_USER = 'updated-user';
  private readonly WAIT_KEY_UP: number = 500;

  users: any[];
  @ViewChild('userFilter', {static: true}) userFilterInput: ElementRef;
  filterValue: string;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  refreshUpdatedUserOnTable(updatedUser: any) {
    if (updatedUser) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === updatedUser.id) {
          this.users[i] = updatedUser;
          return;
        }
      }
    }
  }

  ngOnInit() {
    this.users =  this.userService.getAll().slice();
    const updatedUser = JSON.parse(this.route.snapshot.paramMap.get(this.PARAM_UPDATED_USER));
    this.refreshUpdatedUserOnTable(updatedUser);
  }

  filterUserOnTable(users: any[], searchedUser: any): any[] {
    return users.filter((user) => user.firstName.toLowerCase()
      .includes(searchedUser.toLowerCase()) || searchedUser.toLowerCase()
      .includes(user.firstName.toLowerCase()));
  }

  ngAfterViewInit() {
    fromEvent(this.userFilterInput.nativeElement, 'keyup')
      .pipe(debounceTime(this.WAIT_KEY_UP))
      .subscribe((event: KeyboardEvent) => {
        this.users = this.filterUserOnTable(this.userService.getAll(), this.filterValue);

        if (this.filterValue === '' || this.users.length === 0) {
          this.users = this.userService.getAll();
        }
      });
  }

  goToUserDetails(user: any): void {
    this.router.navigate([UserService.URL_USER_DETAILS, JSON.stringify(user)]);
  }

  isNoneUserSelected(): boolean {
    return this.getNumOfSelectedUsers() === 0;
  }

  getNumOfSelectedUsers(): number {
    return this.users.filter((user) => user.isSelected).length;
  }

  getSelectedUsers(): any[] {
    return this.users.filter((user) => user.isSelected);
  }

  remove(userToRemove: any): void {
    this.users = this.users.filter((user) => user.id !== userToRemove.id);
  }

  removeSelected(): void {
    this.users = this.users.filter((user) => !user.isSelected);
  }
}
