import { Component, OnInit, ElementRef  } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  map: any;
  ele:any;
  constructor(private elRef: ElementRef) {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapBox.accessToken);
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 3,
      center: [-96, 37.8]
    });
    this.map["_canvasContainer"].getElementsByTagName('canvas')[0].style.height = '450px';
    this.map["_container"].getElementsByClassName('mapboxgl-ctrl-top-right')[0].style.top='22.5%';
    this.map.addControl(new mapboxgl.NavigationControl());
    // this.map.on('click', e => {
    //   let ele = document.createElement('div');
    //   ele.className = 'markerClass';
    //   new mapboxgl.Marker(ele)
    //   .setLngLat(e.lngLat)
    //   .addTo(e.target);
    // });
    this.map.on('click', this.markerAdded);
    this.ele = document.createElement('div');
    this.ele.className = 'markerClass';
  }

  mapChange(event: any) {
    this.map.setStyle('mapbox://styles/mapbox/'+ event.currentTarget.id);
  }
  markerAdded(e) {
    // let ele = document.createElement('div');
    // ele.className = 'markerClass';
    new mapboxgl.Marker()
      .setLngLat(e.lngLat)
      .addTo(e.target);
  }
}
