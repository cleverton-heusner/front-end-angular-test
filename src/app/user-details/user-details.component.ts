import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { ModalBasicComponent } from './../modal-basic/modal-basic.component';

import { User } from '../shared/user.model';
import { UsersService } from '../users.service';
import { Routes } from '../shared/routes';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private readonly DIALOG_TITLE = 'Confirmation';
  private readonly DIALOG_CONFIRM_MSG = 'Are you sure you want to cancel the changes to this user?';
  private readonly PARAM_USER_ID = 'id';

  oldUser: User;
  newUser: User;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogService: DialogService) { }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get(this.PARAM_USER_ID);
    this.usersService.getUser(userId).subscribe((user: User) => {
      this.oldUser = user;
      this.newUser = Object.assign({}, this.oldUser);
    });
  }

  isUserModified(): boolean {
    return Object.entries(this.newUser).toString() !==
      Object.entries(this.oldUser).toString();
  }

  goToUsers(): void {
    this.router.navigate([Routes.USERS]);
  }

  showConfirmDialog(): void {
    if (this.isUserModified()) {
      this.dialogService.addDialog(ModalBasicComponent, {
        title: this.DIALOG_TITLE,
        message: this.DIALOG_CONFIRM_MSG})
        .subscribe((isConfirmed: boolean) => {
            if (isConfirmed) {
              this.goToUsers();
            }
        });
    } else {
      this.goToUsers();
    }
  }

  save(): void {
    this.usersService.updateUser(this.newUser).subscribe();
    this.goToUsers();
  }
}
