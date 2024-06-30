import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { endOfMonth } from 'date-fns';
import * as sampleData from './samplesongsformood.json';

const CLIENT_ID = environment.CLIENT_ID;
const CLIENT_SECRET = environment.CLIENT_SECRET;
let token: string;
let withdate: any;
let startDateInput: any = null;
let endDateInput: any = null;

/**
 * This component visualizes the mood of songs in the datadownload based on the information fetched from a Spotify API
 *
 * @author: Simon (scg@mail.upb.de), Sven (svenf@mail.uni-paderborn.de), Max (maxy@mail.upb.de)
 *
 */
@Component({
  selector: 'prioss-spotify-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.less'],
})
export class MoodComponent {
  offlineLoading = true; //load from jsonfile
  @Input()
  previewMode = false;
  @Input()
  firstRun = false;
  @Input()
  selectedRange = [new Date('2021-11-01'), new Date('2021-11-30')]; // Set specific default dates
  @Input()
  mood = '';
  isLoading = false;
  files: any[] = [];
  queriedSongs = 0;
  allSongsNumber = 0;

  constructor() {
    this.setToken();
  }

  setMood = (mood: string) => {
    this.mood = mood;
  };

  /*
   * This function starts the drawing of the Radarchart. If offlineLoading is true the json file is loaded.
   * If false the songIds for the given data download are requested.
   * The Spotify API rate limit is already for one user to slow to hande many requests. Therefore, we decided for now to only use sampledata for this component.
   *
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  startRadarChart() {
    if (this.offlineLoading) {
      withdate = Object.values(JSON.parse(JSON.stringify(sampleData))).slice(
        0,
        500,
      );
      this.updateRadarChart();
      this.firstRun = true;
    } else {
      this.getSongIds();
    }
  }

  /*
   * This is a helper function to redraw the diagramm without calling the Spotify API again.
   *
   * @author: Sven (svenf@mail.uni-paderborn.de)
   */
  drawRadarAgainWithSavedValues() {
    this.updateRadarChart();
  }

  ranges = {
    Today: [new Date(), new Date()],
    'This Month': [new Date(), endOfMonth(new Date())],
  };

  /*
   * This is a helper function to that sets the date taken from the range picker
   *
   * @author Sven (svenf@mail.uni-paderborn.de)
   */
  onChange(result: Date[]): void {
    if (result[0] == undefined) {
      startDateInput = new Date('1900-01-01');
      endDateInput = new Date('2023-07-19');
      return;
    }
    startDateInput = result[0];
    endDateInput = result[1];
  }

  /**
   * This function gets all Song Ids (currently limited to 100). Also calls @makeRadarChart.
   *
   * @author Sven
   */
  async getSongIds() {
    this.isLoading = true;
    this.firstRun = true;
    //sqlite trash
    // const trackIds: string[] = [];
    // const names: string[] = [];
    // const limit = 500;

    //sqlite trash
    // const audiofeatures: any = await this.getAudioFeaturesInBulk(trackIds);
    // const flattend = makeOneArray(audiofeatures);
    // withdate = addListeningDateToAudiofeatures(flattend, names, spotHistory);
    this.isLoading = false;
    this.updateRadarChart();
  }

  /**
   * Updates the displayed bar chart using an start and end date that the user can select.
   *
   * @author: Max (maxy@mail.upb.de), Sven (svenf@mail.uni-paderborn.de)
   *
   */
  updateRadarChart() {
    const timed: any = [];
    withdate.forEach((d: any) => {
      const timestamp = new Date(d.time);
      const start = new Date(startDateInput).toUTCString();
      const end = new Date(endDateInput).toUTCString();
      if (start >= timestamp.toUTCString() && timestamp.toUTCString() <= end)
        timed.push(d);
    });
    makeRadarChart(timed, this);
  }

  /**
   * Sets the token to communicate with Spotify Web API https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
   * CLIENT_ID and CLIENT_SECRET are read when file is selected {@link onFileSelected()}
   * The values are currently taken from /environments/environment.ts ,however I think Angulars design is bad because the files are necessary to compile the project.
   * However, you don't want the values in your repo.
   *
   * @author: Sven (svenf@mail.uni-paderborn.de)
   *
   */

  async setToken() {
    const response = await fetch(`https://accounts.spotify.com/api/token`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const json = await response.json();
    token = json.access_token;
  }

  /**
   * This function queries the Spotify Web API endpoint search to retrieve a song id. The assumption here is that the first song provided by the API is the correct one.
   *
   * @author: Sven (svenf@mail.uni-paderborn.de)
   *
   */
  async getTrackId(trackName: string): Promise<string> {
    if (trackName.length === 0) {
      throw new Error('Track name is empty');
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${trackName}&type=track&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Error retrieving track ID');
      }

      const json = await response.json();
      if (!json.tracks.items.length) {
        throw new Error('No track found');
      }

      return json.tracks.items[0].id;
    } catch (error) {
      // TODO: Toast : show the below message as Toast,
      console.error('An error occurred:', error);
      throw error;
    }
  }

  /**
   * This function queries the Spotify Web API endpoint audio-features. To prevent timeouts a bulk request is performed. The Spotify Web API allows up to 100 song ids at once.
   *
   * @author: Sven (svenf@mail.uni-paderborn.de)
   *
   */
  async getAudioFeaturesInBulk(ids: string[]): Promise<string[]> {
    const spotifyUrl = 'https://api.spotify.com/v1/audio-features?ids=';
    const batchSize = 100;
    const valenceArray = [];

    for (let start = 0; start < ids.length; start += batchSize) {
      const end = Math.min(start + batchSize, ids.length);
      const songsBatch = ids.slice(start, end);
      const bulkUrl = makeBulkRequestUrl(songsBatch, spotifyUrl);
      const response = await fetch(bulkUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      valenceArray.push(json);
    }

    return valenceArray;
  }
}

/**
 * This function concats songids and a comma ('%2C') to the spotifyUrl to provide the bulk url.
 *
 * @author: Sven (svenf@mail.uni-paderborn.de)
 *
 */
function makeBulkRequestUrl(trackIds: string[], spotifyUrl: string): string {
  let url = spotifyUrl;
  for (let i = 0; i < trackIds.length; i++) {
    url += trackIds[i] + '%2C';
  }
  return url;
}

/**
 * A user provides his spotify data. This data contains among others the songname and the listening date. However, we query the Spotify API with the songname to get the songid.
 * Afterwards we query with the songid to get the audiofeatures (like valence). In this process, we lose listening date. However, it is needed for visualisation. Therefore,
 * the current solution is to add it to the json object which is returned by the {@getValence} method.
 * Why can't we just map the initial data to the returned object. It is not possible because the listening history might contain, e.g., podcasts and these result in errors.
 * At the moment as there is no error handling this can be abused to do the function as it is now. Because names contains all the names which didnt result in an error by the API.
 * Therefore, we can just add the name to audiofeatures with no further checking as audiofeatures and names are ordered the same.
 *
 * @author: Sven (svenf@mail.uni-paderborn.de)
 *
 */

// function addListeningDateToAudiofeatures(audiofeatures: any, names: string[], original: any): any {
//   let counter = 0;
//   for (let i = 0; i < original.length; i++) {
//     const key = original[i];
//     if (names.includes(key.trackName)) {
//       audiofeatures[counter].time = key.endTime;
//       counter++;
//       if (counter === audiofeatures.length) {
//         break;
//       }
//     }
//   }
//   return audiofeatures;
// }

/*
 * Creates radar chart for spotify audio values
 * @author Sven Feldmann
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function makeRadarChart(audiofeatures: any, componentInstance: MoodComponent) {}
