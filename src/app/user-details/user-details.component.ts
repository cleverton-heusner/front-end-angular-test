import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { ModalBasicComponent } from './../modal-basic/modal-basic.component';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private readonly DIALOG_TITLE = 'Confirmation';
  private readonly DIALOG_CONFIRM_MSG = 'Are you sure you want to cancel the changes to this user?';
  private readonly PARAM_USER = 'user';

  oldUser: any;
  newUser: any;

  constructor(private route: ActivatedRoute, private router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    this.newUser = JSON.parse(this.route.snapshot.paramMap.get(this.PARAM_USER));
    this.oldUser = Object.assign({}, this.newUser);
  }

  isUserModified(): boolean {
    return Object.entries(this.oldUser).toString() !==
      Object.entries(this.newUser).toString();
  }

  goToUsers(): void {
    this.router.navigate([UserService.URL_USERS]);
  }

  showConfirmDialog(): void {
    if (this.isUserModified()) {
      this.dialogService.addDialog(ModalBasicComponent, {
        title: this.DIALOG_TITLE,
        message: this.DIALOG_CONFIRM_MSG})
        .subscribe((isConfirmed: any) => {
            if (isConfirmed) {
              this.goToUsers();
            }
        });
    } else {
      this.goToUsers();
    }
  }

  save(): void {
    this.router.navigate([UserService.URL_USERS, JSON.stringify(this.newUser)]);
  }
}
