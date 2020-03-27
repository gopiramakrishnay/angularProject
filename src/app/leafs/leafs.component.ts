import { Component, OnInit, NgModule, AfterViewInit } from '@angular/core';
import { tileLayer, latLng, marker, icon, Map, point, circle, polygon, polyline, Polyline } from 'leaflet';
import { from } from 'rxjs';
declare let L;

@Component({
  selector: 'app-leafs',
  templateUrl: './leafs.component.html',
  styleUrls: ['./leafs.component.scss']
})

export class LeafsComponent implements OnInit {
  options;
  layersControl;
  layers;
  layer;
  map: L.Map;
  drawOptions;
  route;
  roadPath;
  constructor() { }

  ngOnInit() {
    this.route = polyline([[ 46.78465227596462,-121.74141269177198 ],
      [ 46.80047278292477, -121.73470708541572 ],
      [ 46.815471360459924, -121.72521826811135 ],
      [ 46.8360239546746, -121.7323131300509 ],
      [ 46.844306448474526, -121.73327445052564 ],
      [ 46.84979408048093, -121.74325201660395 ],
      [ 46.853193528950214, -121.74823296256363 ],
      [ 46.85322881676257, -121.74843915738165 ],
      [ 46.85119913890958, -121.7519719619304 ],
      [ 46.85103829018772, -121.7542376741767 ],
      [ 46.85101557523012, -121.75431755371392 ],
      [ 46.85140013694763, -121.75727385096252 ],
      [ 46.8525277543813, -121.75995212048292 ],
      [ 46.85290292836726, -121.76049157977104 ],
      [ 46.8528160918504, -121.76042997278273 ]]);
    this.roadPath = {baseLayers: {
        'Street Maps': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      },
      overlays: {
        'Mt. Rainier Climb Route': this.route
      }
    }
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap contributors' })
      ],
      zoom: 15,
      center: latLng([46.879966, -121.726909])
    };
    this.layersControl = {
      baseLayers: {
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      },
      overlays: {
        'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
        'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
      }
    };
    this.layers = [
      // circle([ 46.95, -122 ], { radius: 5000 }),
      // polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
      // marker([ 17.814912, 83.356928 ]),
      // marker([ 17.813056, 83.356561 ])
    ];
    this.layer = circle([ 46.40, -102 ], { radius: 5000 });
  }
  ngAfterViewInit() {
    
  }
  addMarker(event) {
    this.layers.push(
      marker([event.latlng.lat, event.latlng.lng])
    )
    if(this.layers.length >= 2) {
      let llGroup= [];
      this.layers.forEach(lay => {
        llGroup.push([lay._latlng.lat, lay._latlng.lng]);
      });
      new Polyline(llGroup, {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
      }).addTo(this.map);
    }
  }
  onMapReady(map: Map) {
    this.map = map;
    map.fitBounds(this.route.getBounds(), {
      padding: point(24, 24),
      maxZoom: 18,
      animate: true
    });
  }
}
