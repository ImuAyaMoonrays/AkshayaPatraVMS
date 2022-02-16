import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/en';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgxWebstorageModule } from 'ngx-webstorage';
import dayjs from 'dayjs/esm';
import { NgbDateAdapter, NgbDatepickerConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationConfigService } from 'app/jhipster-app/core/config/application-config.service';
import './jhipster-app/config/dayjs';
import { SharedModule } from 'app/jhipster-app/shared/shared.module';
import { TranslationModule } from 'app/jhipster-app/shared/language/translation.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './jhipster-app/home/home.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { NgbDateDayjsAdapter } from './jhipster-app/config/datepicker-adapter';
import { fontAwesomeIcons } from './jhipster-app/config/font-awesome-icons';
import { httpInterceptorProviders } from 'app/jhipster-app/core/interceptor/index';
import { AppComponent } from './akshaya-patra-app/components/app-component/app.component';
import { NavbarComponent } from './akshaya-patra-app/components/navbar/navbar.component';
import { SidebarComponent } from './akshaya-patra-app/components/sidebar/sidebar.component';
import { FooterComponent } from './akshaya-patra-app/components/footer/footer.component';
import { SettingsPanelComponent } from './akshaya-patra-app/components/settings-panel/settings-panel.component';
import { SpinnerComponent } from './akshaya-patra-app/components/spinner/spinner.component';
import { HomeScreenComponent } from './akshaya-patra-app/components/home-screen/home-screen.component';
import { LoginComponent } from './akshaya-patra-app/components/login/login.component';
import { RegisterComponent } from './akshaya-patra-app/components/register/register.component';
import { ResetPasswordComponent } from './akshaya-patra-app/components/reset-password/reset-password.component';
import { EventsDashboardComponent } from './akshaya-patra-app/components/events-dashboard/events-dashboard.component';
import { EventComponent } from './akshaya-patra-app/components/event/event.component';
import { CompletedEventForPrototypeComponent } from './akshaya-patra-app/components/completed-event-for-prototype/completed-event-for-prototype.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AppRoutingModule,
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
    TranslationModule,
  ],
  providers: [
    NgbModule,
    Title,
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    httpInterceptorProviders,
  ],
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
    ResetPasswordComponent,
    EventsDashboardComponent,
    EventComponent,
    CompletedEventForPrototypeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
