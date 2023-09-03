import { AfterViewInit, Component, ElementRef, OnInit, Input, Output,EventEmitter } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import * as Proj from 'ol/proj';
import {
  defaults as defaultControls,
  Control
} from 'ol/control';
import { OSM } from 'ol/source';
import { MatSnackBar } from '@angular/material/snack-bar';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import VectorSource from 'ol/source/Vector';
import { MapService } from '../service/map.service';
import { ResponseMaps } from '../model/response-maps.model';

export const DEFAULT_HEIGHT = '500PX';
export const DEFAULT_WIDTH = '500PX';
export const DEFAULT_ANCHOR = [0.5, 1];
export const DEFAULT_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAyVBMVEUAAADnTDznTDvnTDvnTDvAOCrnTDznSzvnTDvAOCvnTDznTDznTDvnTDzAOCrnTDvnTDvnTDvnTDznTDvAOSrnTDznTDzTQjLSQjPnTDzpTDvnSzvAOCrnTDvAOSvAOCvnSzvnTDzAOCvnSzznTDznTDvnTDy/OCvnTDznTDvnTDznSzvmSzvAOCvnTDzAOCvnTDvmTDvAOCq+OCrpTDzkSzrbRjbWRDTMPi+8NinrTT3EOy3gSDjTQjPPQDLHPS/DOiu5NCjHPC5jSfbDAAAAMHRSTlMAKPgE4hr8CfPy4NzUt7SxlnpaVlRPIhYPLgLt6ebOysXAwLmej4iGgGtpYkpAPCBw95QiAAAB50lEQVQ4y42T13aDMAxAbVb2TrO6927lwQhktf//UZWVQ1sIJLnwwBEXWZYwy1Lh/buG5TXu+rzC9nByDQCCbrg+KdUmLUsgW08IqzUp9rgDf5Ds8CJv1KS3mNL3fbGlOdr1Kh1AtFgs15vke7kQGpDO7pYGtJgfbRSxiXxaf7AjgsFfy1/WPu0r73WpwGiu1Fn78bF9JpWKUBTQzYlNQIK5lDcuQ9wbKeeBiTWz3vgUv44TpS4njJhcKpXEuMzpOCN+VE2FmPA9jbxjSrOf6kdG7FvYmkBJ6aYRV0oVYIusfkZ8xeHpUMna+LeYmlShxkG+Zv8GyohLf6aRzzRj9t+YVgWaX1IO08hQyi9tapxmB3huxJUp8q/EVYzB89wQr0y/FwqrHLqoDWsoLsxQr1iWNxp1iCnlRbt9IdELwfDGcrSMKJbGxLx4LenTFsszFSYehwl6aCZhTNPnO6LdBYOGYBVFqwAfDF27+CQIvLUGrTU9lpyFBw9yeA+sCNsRkJ5WQjg2K+QFcrywEjoCBHVpe3VYGZyk9NQCLxXte/jHvc1K4XXKSNQ520PPtIhcr8f2MXPShNiavTyn4jM7wK0g75YdYgTE6KA465nN9GbsILwhoMHZETx53hM7Brtet9lRDAYFwR80rG+sfAnbpQAAAABJRU5ErkJggg==';
export const DEFAULT_TEXT = '';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit {

  @Input() lat!: number;
  @Input() lon!: number;
  @Input() zoom!: number;
  @Input() width: String | number = DEFAULT_WIDTH;
  @Input() height: String | number = DEFAULT_HEIGHT;
  @Input() icon: string = DEFAULT_ICON;
  @Input() text: string = DEFAULT_TEXT;
  @Input() anchor: number[] = DEFAULT_ANCHOR;

  @Output() movestart = new EventEmitter<any>();
  @Output() moveend = new EventEmitter<any>();
  @Output() reponseMapEvent = new EventEmitter<any>();
  loading = false;
  responseMaps!: ResponseMaps;

  map!: Map;
  private mapEl!: HTMLElement;
  vectorAnt: any  = null;

  constructor(private elementRef: ElementRef,
              private mapService: MapService,
              private snackBar: MatSnackBar) {
                this.responseMaps = new ResponseMaps();

  }

  ngOnInit(): void {
    this.mapEl = this.elementRef.nativeElement.querySelector('#map');
    this.setSize();
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }),
      controls: defaultControls({attribution: false, zoom: false}).extend([])
    });

    this.map.on("moveend", (e) => {
      this.moveend.emit(e);
    });

    this.map.on("movestart", (e) => {
      this.movestart.emit(e);
    });

    this.map.on("click", (evt) => {
      console.info(Proj.toLonLat(evt.coordinate));
      var coords = Proj.toLonLat(evt.coordinate);
      var lat = coords[1];
      var lon = coords[0];
      this.setMarker(lat, lon);
      this.buscaEndereco(lat, lon);
    });

  }

  buscaEndereco(lat: any, lon: any){
    this.loading = true;
    this.mapService.buscaEndereco(lat, lon)
     .subscribe({
         next: response => {
          this.loading = false;
             this.responseMaps = response;
             this.reponseMapEvent.emit(this.responseMaps);
       },
       error: err =>{
        this.loading = false;
         this.snackBar.open(err.message, "Erro", {duration:5000});
       }
     });
  }

  setMarker(lat: any, lon: any) {

    const marker = new Feature({
      geometry: new Point(Proj.fromLonLat([lon, lat]))
    });

    const markerText = new Feature({
      geometry: new Point(Proj.fromLonLat([lat, lon]))
    });

    const icon = new Style({
      image: new Icon({
        anchor: this.anchor,
        src: this.icon,
      })
    });

    const text = new Style({
      text: new Text({
        text: this.text,
        font: 'bold 12px arial',
        offsetY: 8,
        fill: new Fill({color: 'rgb(0,0,0)'}),
        stroke: new Stroke({color: 'rgb(255,255,255)', width: 1})
      })
    });

    marker.setStyle(icon);
    markerText.setStyle(text);

    const vectorSource = new VectorSource({
        features: [marker, markerText]
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource
    });

    vectorLayer.setZIndex(10);

    if(this.vectorAnt){
      this.map.removeLayer(this.vectorAnt);
    }
    this.map.addLayer(vectorLayer);
    this.vectorAnt = vectorLayer;
  }



  setControl(control: Control) {
    this.map.addControl(control);
  }


  private setSize(): void {
    if (this.mapEl) {
      const styles = this.mapEl.style;
      styles.height = coerceCssPixelValuye(this.height) || DEFAULT_HEIGHT;
      styles.width = coerceCssPixelValuye(this.width) || DEFAULT_WIDTH;
    }
  }
}

const ccsUnitsPattern = /([A-Za-a%]+)$/;

function coerceCssPixelValuye(value: any): string {
  if (value == null) {
    return '';
  }

  return ccsUnitsPattern.test(value) ? value : `${value}px`;
}
