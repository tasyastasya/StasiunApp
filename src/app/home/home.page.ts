import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  map!: L.Map;
  layerControl: L.Control.Layers | null = null;  // Menyimpan kontrol layer

  constructor() { }

  ionViewDidEnter() {
    // Inisialisasi peta dengan tampilan awal di UGM
    this.map = L.map('mapId', {
      center: [-7.769619258693336, 110.37751757537171], 
      zoom: 13,  // zoom level
      zoomControl: true,  // Pastikan kontrol zoom aktif
    });

    // Opsi basemap yang berbeda dari Esri
    const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
    });

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
    });

    const hybrid = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
    });

    const topoVector = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
    });

    const darkGrayVector = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
    });

    // Menambahkan layer kontrol jika belum ada
    if (!this.layerControl) {
      const baseMaps = {
        "Streets": streets,
        "Satellite": satellite,
        "Hybrid": hybrid,
        "Topographic": topoVector
      };

      this.layerControl = L.control.layers(baseMaps).addTo(this.map);
    }

    // Default layer yang ditampilkan adalah Hybrid
    hybrid.addTo(this.map);

    // Data stasiun dan keberangkatan
    const stations = [
      { name: "Stasiun Tugu Yogyakarta", lat: -7.7879, lon: 110.3631, keberangkatan: ["05:30", "06:50", "07:40", "08:50", "10:25", "11:57", "13:05", "15:20", "16:30", "17:45", "20:16", "22:35"] },
      { name: "Stasiun Lempuyangan", lat: -7.7901, lon: 110.3754, keberangkatan: ["05:36", "06:55", "07:46", "08:55", "10:31", "12:02", "13:11", "15:25", "16:35", "17:50", "20:21", "22:43"] },
      { name: "Stasiun Maguwo", lat: -7.7846, lon: 110.4367, keberangkatan: ["05:43", "07:02", "07:53", "09:02", "10:38", "12:09", "13:18", "15:32", "16:42", "17:57", "20:28", "22:50"] },
      { name: "Stasiun Brambanan", lat: -7.7563, lon: 110.5004, keberangkatan: ["05:51", "07:10", "08:01", "09:10", "10:46", "12:17", "13:26", "15:40", "16:59", "18:05", "20:36", "22:58"] },
      { name: "Stasiun Srowot", lat: -7.7412, lon: 110.5491, keberangkatan: ["05:58", "07:17", "08:08", "09:17", "10:53", "12:24", "13:33", "15:47", "17:06", "18:12", "20:43", "23:05"] },
      { name: "Stasiun Klaten", lat: -7.7122, lon: 110.6030, keberangkatan: ["06:05", "07:24", "08:16", "09:24", "11:01", "12:31", "13:41", "15:54", "17:13", "18:19", "20:50", "23:13"] },
      { name: "Stasiun Ceper", lat: -7.6688, lon: 110.6748, keberangkatan: ["06:14", "07:33", "08:25", "09:33", "11:10", "12:40", "13:50", "16:03", "17:22", "18:28", "20:59", "23:22"] },
      { name: "Stasiun Delanggu", lat: -7.6220, lon: 110.7066, keberangkatan: ["06:21", "07:40", "08:32", "09:40", "11:17", "12:47", "13:57", "16:10", "17:29", "18:35", "21:06", "23:29"] },
      { name: "Stasiun Gawok", lat: -7.5892, lon: 110.7445, keberangkatan: ["06:27", "07:46", "08:38", "09:46", "11:24", "12:53", "14:16", "16:16", "17:35", "18:41", "21:12", "23:36"] },
      { name: "Stasiun Purwosari", lat: -7.5616, lon: 110.7965, keberangkatan: ["06:34", "07:53", "08:45", "09:53", "11:32", "13:00", "14:23", "16:23", "17:42", "18:48", "21:19", "23:43"] },
      { name: "Stasiun Solo Balapan", lat: -7.5571, lon: 110.8210, keberangkatan: ["06:40", "08:04", "08:53", "09:59", "11:39", "13:08", "14:30", "16:30", "17:49", "18:56", "21:27", "23:51"] }
    ];

    // Tambahkan marker dengan pop-up dan hubungkan dengan garis
    const latLonArray: L.LatLngExpression[] = [];

    stations.forEach(station => {
      const circleMarker = L.circleMarker([station.lat, station.lon], {
        radius: 10,
        color: '#3388ff',
        fillColor: '#3388ff',
        fillOpacity: 0.5,
      }).addTo(this.map);

      // Menambahkan koordinat ke array untuk membuat garis
      latLonArray.push([station.lat, station.lon]);

      // Membuat pop-up untuk setiap stasiun
      const departureList = station.keberangkatan.join("<br>");
      circleMarker.bindPopup(`
        <b>${station.name}</b><br>
        Keberangkatan:<br>
        ${departureList}<br>
      `).openPopup();
    });

    // Menggambar garis yang menghubungkan antar stasiun
    const polyline = L.polyline(latLonArray, {
      color: 'blue',
      weight: 3,
      opacity: 0.5,
      dashArray: '5, 5'
    }).addTo(this.map);

    // Menambahkan layer kontrol jika belum ada
    if (!this.layerControl) {
      const baseMaps = {
        "Streets": streets,
        "Satellite": satellite,
        "Hybrid": hybrid,
        "Topographic": topoVector
      };

      this.layerControl = L.control.layers(baseMaps).addTo(this.map);
    }
  }
}



