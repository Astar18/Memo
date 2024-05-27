import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { MemoComponent } from './components/memo/memo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'memo', component: MemoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Redirigir al componente de login por defecto

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
