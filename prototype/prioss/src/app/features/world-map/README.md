# Geolocation Service using Echarts

## Overview

The `GeolocationService` is an Angular service designed to manipulate and retrieve geolocation data. It utilizes local JSON files to map country codes to country names and to fetch longitude and latitude information for cities.

## Installation

Ensure you have the necessary JSON files in the specified paths:

- `src/assets/geographical-data/cities50000_country_city_lon_lat.json`
- `src/assets/geographical-data/country_code_mapping.json`

These files should contain the following structures:

- `cities50000_country_city_lon_lat.json`: `{country: {city: [lon, lat]}}`
- `country_code_mapping.json`: `{country_code: country}`

## Usage

### Injecting the Service and Displaying Map

Inject the `GeolocationService` into your component or another service where you need to use it.

```typescript
// example.component.ts
import { Component, OnInit } from "@angular/core";
import { GeolocationService } from "src/app/services/geolocation.service";
import { GeoLocationData } from "src/app/features/world-map/geolocation.type";
import { WorldMapComponent } from 'src/app/features/world-map/world-map.component';

@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
  styleUrls: ["./example.component.css"],
})
export class ExampleComponent implements OnInit {
  constructor(private geolocationService: GeolocationService) {}

  ngOnInit() {
    const data: GeoLocationData[] = [
      { country_code: "US", city: "New York" },
      { country_code: "FR", city: "Paris" },
    ];
    const mapLocationData: Set<object> = new Set();

    const updatedData = this.geolocationService.getGeoData(data);

    for (const loc of geoLocationData) {
      if (loc.lat && loc.lon) {
        mapLocationData.add({ name: loc.city, value: [loc.lon, loc.lat] });
      }
    }

    options = {
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          data: Array.from(mapLocationData),
          // rest of the options
        },
      ],
    };
  }
}
```
```html
<!--example.component.html-->
<world-map [mapOptions]="options"></world-map>
```
