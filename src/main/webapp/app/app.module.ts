import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/en';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { NgbDatepickerConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { AppComponent } from './akshaya-patra-app/components/app-component/app.component';
import { NavbarComponent } from './akshaya-patra-app/components/navbar/navbar.component';
import { SidebarComponent } from './akshaya-patra-app/components/sidebar/sidebar.component';
import { FooterComponent } from './akshaya-patra-app/components/footer/footer.component';
import { SettingsPanelComponent } from './akshaya-patra-app/components/settings-panel/settings-panel.component';
import { SpinnerComponent } from './akshaya-patra-app/components/spinner/spinner.component';
import { HomeScreenComponent } from './akshaya-patra-app/components/home-screen/home-screen.component';
import { LoginComponent } from './akshaya-patra-app/components/login/login.component';
import { RegisterComponent } from './akshaya-patra-app/components/register/register.component';
import { PasswordResetInitComponent } from './akshaya-patra-app/components/reset-password-init/reset-password-init.component';
import { EventsDashboardComponent } from './akshaya-patra-app/components/events-dashboard/events-dashboard.component';
import { EventComponent } from './akshaya-patra-app/components/event/event.component';
import { CreateEventComponent } from './akshaya-patra-app/components/create-event/create-event.component';
import { ApplicationConfigService } from './akshaya-patra-app/services/application-config/application-config.service';
import { SharedModule } from './akshaya-patra-app/modules/shared.module';
import { httpInterceptorProviders } from './akshaya-patra-app/interceptors/interceptor';
import { fontAwesomeIcons } from './akshaya-patra-app/configs/font-awesome-icons';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NewPasswordComponent } from './akshaya-patra-app/components/new-password/new-password.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { TimePipe } from "./akshaya-patra-app/pipes/time/time.pipe";
import { DatePipe } from './akshaya-patra-app/pipes/date/date.pipe';
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { AppState } from "./akshaya-patra-app/store/states/App.state";
import { EventPreviewComponent } from './akshaya-patra-app/components/event-preview/event-preview.component';
import { IsAdminDirective } from './akshaya-patra-app/directives/is-admin/is-admin.directive';
import { IfIsNormalUserDirective } from './akshaya-patra-app/directives/if-is-normal-user/if-is-normal-user.directive';
import { UpcomingUnregisteredEventsComponent } from './akshaya-patra-app/components/upcoming-events/upcoming-unregistered-events.component';
import { RegisteredEventsComponent } from './akshaya-patra-app/components/registered-events/registered-events.component';
import { CompletedEventsComponent } from './akshaya-patra-app/components/completed-events/completed-events.component';
import { AdminUpcomingEventsComponent } from './akshaya-patra-app/components/admin-upcoming-events/admin-upcoming-events.component';
import { AdminPastEventsComponent } from './akshaya-patra-app/components/admin-past-events/admin-past-events.component';
import { PromoteToAdminComponent } from './akshaya-patra-app/components/promote-to-admin/promote-to-admin.component';
import { ProfileComponent } from './akshaya-patra-app/components/profile/profile.component';
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { SecureImageSrcPipe } from './akshaya-patra-app/pipes/secure-image-src/secure-image-src.pipe';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { EventCardRowsComponent } from './akshaya-patra-app/components/card-row/event-card-rows.component';
import { AddressPipe } from './akshaya-patra-app/pipes/address/address.pipe';
import { CausesPipe } from './akshaya-patra-app/pipes/causes/causes.pipe';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AppRoutingModule,
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: true}),
    HttpClientModule,
    NgxWebstorageModule.forRoot({prefix: 'jhi', separator: '-'}),
    NgSelectModule,
    NgxsModule.forRoot([AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SweetAlert2Module.forRoot(),
    TagInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    DropzoneModule
  ],
  providers: [NgbModule, Title, {provide: LOCALE_ID, useValue: 'en'}, httpInterceptorProviders],
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    SettingsPanelComponent,
    SpinnerComponent,
    HomeScreenComponent,
    LoginComponent,
    RegisterComponent,
    PasswordResetInitComponent,
    NewPasswordComponent,
    EventsDashboardComponent,
    EventComponent,
    CreateEventComponent,
    TimePipe,
    DatePipe,
    EventPreviewComponent,
    IsAdminDirective,
    IfIsNormalUserDirective,
    UpcomingUnregisteredEventsComponent,
    RegisteredEventsComponent,
    CompletedEventsComponent,
    AdminUpcomingEventsComponent,
    AdminPastEventsComponent,
    PromoteToAdminComponent,
    ProfileComponent,
    SecureImageSrcPipe,
    EventCardRowsComponent,
    AddressPipe,
    CausesPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
