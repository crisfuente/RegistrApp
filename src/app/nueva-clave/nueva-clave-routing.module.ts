import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaClavePage } from './nueva-clave.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaClavePageRoutingModule {}
