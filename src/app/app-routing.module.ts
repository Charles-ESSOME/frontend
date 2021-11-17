import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ConsultEventComponent } from './consult-event/consult-event.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch:'full' },
  { path: 'home', component: ConsultEventComponent },
  {path:'auth', component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
