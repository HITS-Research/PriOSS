import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export enum Services {
    None = 0,
    Instagram = 1 << 0,
    Facebook = 1 << 1,
    Spotify = 1 << 2,
    YouTube = 1 << 3,
    All = ~(~0 << 4)
}

@Injectable()
export class FeatureToggleService {
    enabledServices = new BehaviorSubject<Services>(Services.None);

    constructor() {
        const stringValue: string | null = localStorage.getItem('enabledServices');
        const intValue: number = parseInt(stringValue ?? '0', 0);
        this.enabledServices.next(intValue);
    }

    enableService(service: Services): void {
        if ((this.enabledServices.getValue() & service) !== service){
            this.enabledServices.next(this.enabledServices.getValue() | service);
        localStorage.setItem('enabledServices', this.enabledServices.getValue().toString())
        }
    }

    disableService(service: Services): void {
        if ((this.enabledServices.getValue() & service) === service)
            this.enabledServices.next(this.enabledServices.getValue() | service)
        localStorage.setItem('enabledServices', this.enabledServices.getValue().toString())
    }
}
