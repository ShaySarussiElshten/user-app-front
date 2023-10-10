import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponent implements AfterViewInit {

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  
  @Input() center!: google.maps.LatLngLiteral;
  zoom = 18;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  
  ngAfterViewInit(): void {
    const center = this.map.getCenter();
    if(center) {
      this.center = {
        lat: center.lat(),
        lng: center.lng()
      };
    } else {
      console.error('Map center is undefined');
    }
  }
}






