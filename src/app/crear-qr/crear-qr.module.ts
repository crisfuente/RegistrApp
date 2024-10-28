import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearQRPageRoutingModule } from './crear-qr-routing.module';

import { CrearQRPage } from './crear-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearQRPageRoutingModule
  ],
  declarations: [CrearQRPage]
})
export class CrearQRPageModule {}
