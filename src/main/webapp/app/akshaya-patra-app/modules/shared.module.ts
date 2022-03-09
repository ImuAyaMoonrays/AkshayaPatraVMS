import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { HasAnyAuthorityDirective } from '../directives/has-any-authority/has-any-authority.directive';

@NgModule({
  imports: [SharedLibsModule],
  declarations: [HasAnyAuthorityDirective],
  exports: [SharedLibsModule, HasAnyAuthorityDirective],
})
export class SharedModule {}
