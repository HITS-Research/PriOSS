import { Injectable } from '@angular/core';
import {from, map, Observable} from "rxjs";
import {IndexedDbService} from "../../../../state/indexed-db.state";

@Injectable({
  providedIn: 'root'
})
export class CustomStorageService {
  constructor(private dbService: IndexedDbService) {}

  public add(key:string, value:string){
    this.dbService.setYouTubeData(key,value).then();
  }

  public get(key:string,):Observable<string>{
    return from(this.dbService.getYouTubeData(key)).pipe(
      map(data => data || "")
    );
  }
}
