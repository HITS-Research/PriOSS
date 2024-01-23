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
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      jeepEl.autoSave = true;
      await customElements.whenDefined('jeep-sqlite');
      await sqlite.initWebStore();
    }
    await sqlite.checkConnectionsConsistency();

    if (environment.production) {
      enableProdMode();
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/ngsw-worker.js')
          .catch(error => {
            // TODO: Toast : show the below message as Toast,
            console.error('Error registering Service Worker:', error);
          });
      }
    }

    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));  // TODO: Toast : show the below message as Toast,
  } catch (err) {
    console.log(`Error: ${err}`);  // TODO: Toast : show the below message as Toast,
    throw new Error(`Error: ${err}`)
  }

});