import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearQRPage } from './crear-qr.page';

const routes: Routes = [
  {
    path: '',
    component: CrearQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearQRPageRoutingModule {}
