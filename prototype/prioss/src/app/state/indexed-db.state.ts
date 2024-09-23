import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import InstaUserDataModel from '../instagram/state/models/insta-user-data-model.interface';
import { FacebookDataFile } from '../facebook/models/FacebookDataFile.interface';
import { FacebookIndexedDBMedia } from '../facebook/models/FacebookIndexDBMedia.interface';
import { AppType } from '../framework/pages/service-selection/app-type';

interface SelectedService {
  service: string,
  filename: string
}
/**
 * make sure to upgrade the db in createDb, when you add things to the schema
 * you have to increase the version number!
 */
interface PriossDB extends DBSchema {
  selectedService: {
    key: AppType.SelectedService,
    value: SelectedService,
    keyPath: 'service',
    indexes: { 'by-service': string }
  }
  facebook: {
    key: AppType.Facebook,
    value: FacebookDataFile,
    keyPath: 'filename',
    indexes: { 'by-filename': string }
  }
  facebookMediaFiles: {
    key: AppType.FacebookMediaFiles,
    value: FacebookIndexedDBMedia,
    keyPath: 'thread_path'
  }
  instagram: {
    key: AppType.Instagram,
    value: InstaUserDataModel,
    indexes: { 'by-name': string }
  }
  youtube: {
    key: AppType.Youtube,
    value: { filename: string, value: string },
    keyPath: 'filename',
    indexes: { 'by-filename': string }
  };
}

@Injectable({ providedIn: "root" })
export class IndexedDbService {
  db: IDBPDatabase<PriossDB>;
  dbName = 'prioss-db';
  constructor() {
    this.createDb().then(db => {
      this.db = db;
    });
  }


  /**
   * clear the selectedService store
   */
  async clearSelectedServiceStore() {
    await this.waitForDb();
    await this.db.clear(AppType.SelectedService);
  }


  /**
   * set the selected service to the selectedService store
   *
   * @param service the selected service
   * @param filename the selected Dataexportfile
   */
  async setSelectedServiceStore(service: string | null, filename: string) {
    if (!service) return;

    await this.waitForDb();
    //put overwrites the value of the key
    const selService: SelectedService = { service: service, filename: filename };
    this.db.put(AppType.SelectedService, selService);
  }


  /**
   * get the selected service from the selectedService store
   */
  async getSelectedService(service: string): Promise<SelectedService> {
    await this.waitForDb();
    const selServices = await this.db.getAll(AppType.SelectedService);
    const selService = selServices.find(selService => selService.service === service);
    return selService ?? {} as SelectedService;
  }


  /**
   * clear the selectedSevice store and set the selected service to facebook
   * Just a wrapper for setSelectedServiceStore(AppType.Facebook, filename)
   *
   * @param filename the selected Dataexportfile
   */
  async setSelectedFacebookDataStore(filename: string) {
    await this.waitForDb();
    await this.setSelectedServiceStore(AppType.Facebook, filename);
  }


  /**
   * adds the selected Dataexportfile to the facebook store
   *
   * @param datafile the facebook data file
   */
  async addFacebookUserDataStore(datafile: FacebookDataFile) {
    await this.waitForDb();
    const userstoreId = await this.db.put(AppType.Facebook, datafile);
    return userstoreId;
  }

  /**
   * Bulk adding data is faster than having one transaction per file, so we use this function to add multiple files in one transacation
   * @param files the facebook media files
   */
  async bulkAddFacebookMediaFiles(files: FacebookIndexedDBMedia[]) {
    await this.waitForDb();

    const tx = this.db.transaction(AppType.FacebookMediaFiles, 'readwrite');
    const store = tx.objectStore(AppType.FacebookMediaFiles);

    for (const file of files) {
      store.put(file);
    }

    // Wait for the transaction to complete
    await tx.done;
  }


  /**
   * deletes the data store of a service by filename
   * @param service  the service name
   * @param filename  the filename of the data export file
   */
  async deleteUserDataStore(service: string, filename: string): Promise<void> {
    await this.waitForDb();
    const keyRange = IDBKeyRange.only(filename);
    switch (service) {
      case AppType.Facebook:
        await this.db.delete(AppType.Facebook, keyRange);
        break;
      case AppType.Instagram:
        await this.db.delete(AppType.Instagram, keyRange);
        break;
    }
  }


  /**
   * deletes the facebook data store by filename,
   * this is just a wrapper for deleteUserDataStore(AppType.Facebook, filename)
   * @param filename the filename of the facebook data store
   */
  async deleteFacebookUserDataStore(filename: string): Promise<void> {
    await this.waitForDb().then(() => {
      this.deleteUserDataStore(AppType.Facebook, filename);
    });

  }


  /**
   * This function will be used the most in components, because it returns the selected facebook data store
   * @returns the selected facebook data store
   */
  async getSelectedFacebookDataStore() {
    await this.waitForDb();
    const selService = await this.getSelectedService(AppType.Facebook);
    return this.getFacebookUserDataStoreByFilename(selService.filename);
  }


  /**
   * If you want to load a specific facebook data store by filename, you can use this function
   * is useful, when the user has already explored some data exports of the same service and wants to load them again
   * @param filename
   * @returns the facebook data store
   */
  async getFacebookUserDataStoreByFilename(filename: string): Promise<FacebookDataFile> {
    await this.waitForDb();
    return await this.db.getAll(AppType.Facebook).then(stores => {
      return stores.find(store => {
        return store.filename === filename;
      }) ?? {} as FacebookDataFile;
    })
      ;

  }



  /**
   * If we want to list all facebook data stores, we can use this function
   * @returns all facebook data stores
   */
  async getAllFacebookUserDataStores(): Promise<FacebookDataFile[]> {
    await this.waitForDb();
    const stores: FacebookDataFile[] = await this.db.getAll(AppType.Facebook);
    return stores;
  }

  /**
   * returns all media files from your data export
   * @param dataExport the data export file
   * @returns all images, videos, pdfs and whatever is stored in your data export file
   */
  async getAllFacebookMediaFiles(dataExport: string): Promise<FacebookIndexedDBMedia[]> {
    await this.waitForDb();
    const files = await this.db.getAll(AppType.FacebookMediaFiles);
    return files.filter(file => file.data_export_file === dataExport);
  }

  /**
   * returns the media file by the thread path. The thread path is specified in some json files
   * @param thread_path the thread path of the media file
   * @returns the media file
   */
  async getFacebookMediaFileByFilename(thread_path: string): Promise<FacebookIndexedDBMedia> {
    await this.waitForDb();
    const files = await this.db.getAll(AppType.FacebookMediaFiles);
    return files.find(file => file.thread_path === thread_path) ?? {} as FacebookIndexedDBMedia;
  }

  async setYouTubeData(key: string, value: string): Promise<void> {
    await this.waitForDb();
    const data = {
      filename: key,
      value: value
    };
    await this.db.put(AppType.Youtube, data);
  }

  async getYouTubeData(key: string): Promise<string> {
    await this.waitForDb();
    const data = await this.db.get<any>(AppType.Youtube, key);
    return data ? data.value : null;
  }

  async clearDataStore(name: string) {
    await this.waitForDb();
    switch (name) {
      case AppType.Facebook:
        await this.db.clear(AppType.Facebook);
        break;
      case AppType.Instagram:
        await this.db.clear(AppType.Instagram);
        break;
      case AppType.Youtube:
        await this.db.clear(AppType.Youtube);
        break;
      case AppType.SelectedService:
        await this.db.clear(AppType.SelectedService);
        break;
      case AppType.FacebookMediaFiles:
        await this.db.clear(AppType.FacebookMediaFiles);
        break;
    }
  }
  async isDbEmpty(): Promise<boolean> {
    let stores = await this.db.count(AppType.Facebook);
    stores += await this.db.count(AppType.Instagram);
    stores += await this.db.count(AppType.Youtube);
    return stores === 0;
  }

  async createDb() {
    const db: IDBPDatabase<PriossDB> = await openDB<PriossDB>('prioss-db', 2, {
      upgrade(db: IDBPDatabase<PriossDB>, oldVersion: number) {
        if (oldVersion <= 1) {
          const facebookStore = db.createObjectStore(AppType.Facebook, {
            keyPath: 'filename'
          });
          facebookStore.createIndex('by-filename', 'filename');

          db.createObjectStore(AppType.FacebookMediaFiles, {
            keyPath: 'thread_path'
          });
          const serviceSelectionStore = db.createObjectStore(AppType.SelectedService, {
            keyPath: 'service'
          });
          serviceSelectionStore.createIndex('by-service', 'service');


          const instagramStore = db.createObjectStore(AppType.Instagram, {
            keyPath: 'filename'
          });
          instagramStore.createIndex('by-name', 'filename');
        }
        //for new tables add them here like above, but increase the version number
        if(oldVersion<=2){
          const youtubeStore = db.createObjectStore(AppType.Youtube,{
            keyPath:"filename"
          });
          youtubeStore.createIndex('by-filename','filename')
        }
      }
    });
    return db;
  }

  private async waitForDb() {
    if (!this.db) {
      this.db = await this.createDb();
    }
    return;
  }

}
