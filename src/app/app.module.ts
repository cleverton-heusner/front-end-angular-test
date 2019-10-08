import { LoaderService } from './shared/loader.service';
import { LoaderInterceptor } from './shared/loader.interceptor';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfilerInterceptor } from './shared/profiler.interceptor';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    CsvDownloadComponent,
    UserDetailsComponent,
    ModalBasicComponent,
    LoaderComponent
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
  providers: [
  DataService,
  LoaderService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ProfilerInterceptor,
    multi: true
  }],
  entryComponents: [
    ModalBasicComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
