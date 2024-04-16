import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as locationData from 'src/assets/geographical-data/cities50000_country_city_lon_lat.json';
import * as countryCodeMap from 'src/assets/geographical-data/country_code_mapping.json';
import { GeoLocationData } from 'src/app/features/world-map/geolocation.type';

/*
locationData = {country: {city: [lon, lat]}}
countryCodeMap = {country_code: country}
*/


@Injectable({
    providedIn: 'root'
})

/**
 * Service for geolocation data manipulation.
 */
export class GeolocationService {
    geoData = locationData.default;
    countryCodeMap = countryCodeMap.default;
    
    constructor(private http: HttpClient) {}
    
    /**
     * Retrieves geolocation data for the given array of GeoLocationData objects.
     * @param data - Array of GeoLocationData objects.
     * @returns The modified array of GeoLocationData objects with updated geolocation information.
     */
    getGeoData(data: GeoLocationData[]) {
        for (const item of data) {
            if (item.country === undefined) {
                if (this.countryCodeMap[item.country_code as string]) {
                    item.country = this.countryCodeMap[item.country_code as string];
                }
            }
            
            if (item.country !== undefined) {
                if (this.geoData[item.country] && this.geoData[item.country][item.city]) {
                    item.lon = this.geoData[item.country][item.city][0];
                    item.lat = this.geoData[item.country][item.city][1];
                }
            }
        }
        return data;       
    }
}