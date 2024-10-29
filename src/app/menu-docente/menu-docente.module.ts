import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuDocentePageRoutingModule } from './menu-docente-routing.module';

import { MenuDocentePage } from './menu-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuDocentePageRoutingModule
  ],
  declarations: [MenuDocentePage]
})
export class MenuDocentePageModule {}
