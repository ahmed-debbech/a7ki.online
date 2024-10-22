import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashComponent } from './components/dash/dash.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: DashComponent },
  { path: 'users', component: UsersComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
