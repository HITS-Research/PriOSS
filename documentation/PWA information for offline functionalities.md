General Information / Further Reading: https://angular.io/guide/service-worker-intro

# Using the PriOSS as a Progressive Web App (PWA) during development:

Angular, by standard, only allows/recommends Service Workers (SWs) to be used for production builds. Therfore the command "ng serve --configuration=production" has to be used while developing to use SWs and allow proper offline caching.

# Adding files that should be cached on first page load:

These files can be specified in the Document: "/ngsw-config.json". To be precise under the "files" part of the following JSON snippet from the file.
```
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js",
          "/assets/images/fb-instructions/*",
          "/assets/images/insta-instructions/*",
          "/assets/images/spot-instructions/*",
          "/assets/images/facebook.png",
          "/assets/images/instagram.png",
          "/assets/images/spotify.png"
        ]
      }
  }
}
```

The second asset group of the "/ngsw-config.json" file called "name": "assets", is configured with lazy-prefetching, meaning that all files listed there (which are all other files) will only be cached after the user visited the site where they are embedded first.
