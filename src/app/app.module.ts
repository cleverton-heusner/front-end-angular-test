import { DataService } from './shared/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';

import { CsvDownloadComponent } from './csv-download/csv-download.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersListComponent } from './users-list/users-list.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    CsvDownloadComponent,
    UserDetailsComponent,
    ModalBasicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BootstrapModalModule.forRoot({container: document.body}),
    HttpClientModule,
    InMemoryWebApiModule.forRoot(DataService),
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: UsersListComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'user-details/:id',
        component: UserDetailsComponent
      }
    ])
  ],
  providers: [DataService],
  entryComponents: [
    ModalBasicComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
