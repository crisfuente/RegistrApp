import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NuevaClavePageRoutingModule } from './nueva-clave-routing.module';
import { NuevaClavePage } from './nueva-clave.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaClavePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NuevaClavePage]
})
export class NuevaClavePageModule {}
