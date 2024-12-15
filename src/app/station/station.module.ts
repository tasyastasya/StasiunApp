import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StationPageRoutingModule } from './station-routing.module';
import { RouterModule } from '@angular/router';
import { StationPage } from './station.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component:StationPage}])
    
  ],
  declarations: [StationPage]
})
export class StationPageModule {}
