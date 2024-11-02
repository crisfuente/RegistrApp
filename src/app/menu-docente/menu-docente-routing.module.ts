import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuDocentePage } from './menu-docente.page';

const routes: Routes = [
  {
    path: '',
    component: MenuDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuDocentePageRoutingModule {}
