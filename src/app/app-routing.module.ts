import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanModule } from './components/kanban/kanban.module';
import { AuthGuard } from './components/user/auth.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'kanban',
    loadChildren: () =>
      import('./components/kanban/kanban.module').then((m) => m.KanbanModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./components/users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
