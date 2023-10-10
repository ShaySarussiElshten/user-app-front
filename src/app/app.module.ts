import { NgModule } from '@angular/core';
import { AngularCoreModule } from './module/angular-core/angular-core.module';
import { AppRoutingModule } from './module/routing/app-routing.module';
import { AppComponent } from './app.component';
import { ListViewComponent } from './page/list-view/list-view.component';
import { FormViewComponent } from './page/form-view/form-view.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AngularMaterialModule } from './module/angular-material/angular-material.module';
import { SharedModule } from './module/shared/shared.module';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    FormViewComponent,
    UserCardComponent,
    UserDetailsComponent,
    DialogComponent,
    FormFieldComponent,
    NavigationComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    AngularCoreModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
