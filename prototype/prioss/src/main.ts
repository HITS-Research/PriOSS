import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

// Add the following import for service worker
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

jeepSqlite(window);
window.addEventListener('DOMContentLoaded', async () => {
  const platform = Capacitor.getPlatform();
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  try {
    if(platform === "web") {
      console.log('in index.ts')
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      jeepEl.autoSave = true;
      await customElements.whenDefined('jeep-sqlite');
      console.log('in index.ts after customElements')
      await sqlite.initWebStore();
      console.log('after sqlite.initWebStore()');
    }
    await sqlite.checkConnectionsConsistency();

    if (environment.production) {
      enableProdMode();
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/ngsw-worker.js')
          .then(registration => {
            console.log('Service Worker registered successfully:', registration);
          })
          .catch(error => {
            console.error('Error registering Service Worker:', error);
          });
      }
    }

    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`)
  }

});