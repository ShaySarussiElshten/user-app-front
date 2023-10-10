import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from '../../components/map-component/map-component.component';


@NgModule({
  declarations: [MapComponent],
  imports: [
    GoogleMapsModule,
  ],
  exports:[
    MapComponent
  ]
})
export class SharedModule { }
