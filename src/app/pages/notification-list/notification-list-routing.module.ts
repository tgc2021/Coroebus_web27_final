import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationListComponent } from './notification-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: NotificationListComponent,
    data: { animation: 'notification-list' },
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationListRoutingModule { }
