import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from '../../page/list-view/list-view.component';
import { FormViewComponent } from '../../page/form-view/form-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/list-view', pathMatch: 'full' },
  { path: 'list-view', component: ListViewComponent },
  { path: 'form-view', component: FormViewComponent },
  { path: 'form-view/:id', component: FormViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
