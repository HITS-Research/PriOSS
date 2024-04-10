import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


// Add the following import for service worker
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

window.addEventListener('DOMContentLoaded', async () => {
  try {
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