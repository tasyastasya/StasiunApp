import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map!: L.Map;

  constructor() { }

  ionViewDidEnter() {
    // Inisialisasi peta dengan tampilan awal di UGM
    this.map = L.map('mapId').setView([-7.769619258693336, 110.37751757537171], 13);

    // Opsi basemap yang berbeda dari Esri
    const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
    });

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
    });

    const hybrid = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
    }).addTo(this.map); // Default basemap yang akan ditampilkan pertama kali

    const topoVector = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
    });

    const darkGrayVector = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
    });

    // Circle marker di UGM
    const circleMarker = L.circleMarker([-7.769619258693336, 110.37751757537171], {
      radius: 10, // Ukuran lingkaran
      color: '#3388ff', // Warna lingkaran
      fillColor: '#3388ff', // Warna isi lingkaran
      fillOpacity: 0.5
    }).addTo(this.map);

    // Pastikan circle marker memiliki pop-up
    circleMarker.bindPopup("<b>Universitas Gadjah Mada</b><br>UGM is a public university in Yogyakarta, Indonesia.").openPopup();

    // Layer control untuk base map
    const baseMaps = {
      "Streets": streets,
      "Satellite": satellite,
      "Hybrid": hybrid,
      "Topographic": topoVector
    };

    // Tambah layer control ke peta
    L.control.layers(baseMaps).addTo(this.map);

    // Default layer yang ditampilkan adalah Hybrid
    hybrid.addTo(this.map);
  }
}
