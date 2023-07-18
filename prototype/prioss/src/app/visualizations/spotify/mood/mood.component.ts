import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import * as d3 from 'd3';
import { SpotHistoryRepository } from 'src/app/db/data-repositories/spotify/spot-history/spot-history.repository';
import { endOfMonth } from 'date-fns';

const CLIENT_ID = environment.CLIENT_ID;
const CLIENT_SECRET = environment.CLIENT_SECRET;
let token: string;
let withdate: any;
const spotifyGreen: string = "#1DB954"
let savedValues: any[] = [];
let startDateInput: any = null;
let endDateInput: any = null;



/**
  * This component visualizes the mood of songs in the datadownload based on the information fetched from a Spotify API
  *
  * @author: Simon (scg@mail.upb.de), Sven (svenf@mail.uni-paderborn.de), Max (maxy@mail.upb.de)
  *
  */
@Component({
  selector: 'spot-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.less']
})
export class MoodComponent {
  @Input()
  previewMode: boolean = false;
  @Input()
  firstRun: boolean = false;

  

  files: any[] = [];
  queriedSongs = 0;
  allSongsNumber = 0;


  constructor(private spotHistoryRepo: SpotHistoryRepository) {
    this.setToken();
    console.log(token);
  }

  drawRadarAgainWithSavedValues() {
    this.updateBarChart();
  }

  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };

  onChange(result: Date[]): void {
    console.log('From: ', result[0], ', to: ', result[1]);
    startDateInput = result[0];
    endDateInput = result[1];
  }
  

  /**
   * This function gets all Song Ids (currently limited to 100). Also calls @makeRadarChart.
   * 
   * @author Sven
   */
  async getSongIds() {
    this.firstRun = true;
    let spotHistory = await this.spotHistoryRepo.getSpotHistory();
    this.allSongsNumber = spotHistory.length;
    const trackIds: string[] = [];
    const names: string[] = [];
    const limit = 100;

    for (const entry of spotHistory) {

      if (this.queriedSongs >= limit) {
        break;
      }
      names.push(entry.trackName);
      const trackId = await this.getTrackId(entry.trackName);
      trackIds.push(trackId);
      this.queriedSongs++;
    }
    let audiofeatures: any = await this.getAudioFeaturesInBulk(trackIds);
    let flattend = makeOneArray(audiofeatures);
    withdate = addListeningDateToAudiofeatures(flattend, names, spotHistory)
    this.updateBarChart();
    //makeRadarChart(flattend);
  }

  /**
  * Updates the displayed bar chart using an start and end date that the user can select.
  *
  * @author: Max (maxy@mail.upb.de), Sven (svenf@mail.uni-paderborn.de)
  *
  */
  updateBarChart() {
    let timed: any = [];
      withdate.forEach((d: any) => {
      let timestamp = new Date(d.time);
      let start = new Date(startDateInput).toUTCString();
      let end = new Date(endDateInput).toUTCString();
      if (start >= timestamp.toUTCString() && timestamp.toUTCString() <= end) timed.push(d);
    });
    console.log(timed);
    makeRadarChart(timed);
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
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })
    const json = await response.json();
    token = json.access_token;
  };

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
      const response = await fetch(`https://api.spotify.com/v1/search?q=${trackName}&type=track&limit=1`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error retrieving track ID');
      }

      const json = await response.json();
      if (!json.tracks.items.length) {
        throw new Error('No track found');
      }

      return json.tracks.items[0].id;
    } catch (error) {
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
    let valenceArray = [];

    for (let start = 0; start < ids.length; start += batchSize) {
      const end = Math.min(start + batchSize, ids.length);
      const songsBatch = ids.slice(start, end);
      const bulkUrl = makeBulkRequestUrl(songsBatch, spotifyUrl);
      const response = await fetch(bulkUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
};


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

function addListeningDateToAudiofeatures(audiofeatures: any, names: string[], original: any): any {
  let counter = 0;
  for (let i = 0; i < original.length; i++) {
    let key = original[i];
    if (names.includes(key.trackName)) {
      audiofeatures[counter].time = key.endTime;
      counter++;
      if (counter === audiofeatures.length) {
        break;
      }
    }
  }
  return audiofeatures;
}

/*
* Creates radar chart for spotify audio values
* @author Sven Feldmann
*/
function makeRadarChart(audiofeatures: any) {
  d3.select("#bar-chart").selectAll("*").remove();
  
  savedValues = audiofeatures;
  let danceabilitySum = 0;
  let energySum = 0;
  let loudnessSum = 0;
  let valenceSum = 0;
  let tempoSum = 0;
  let accousticnessSum = 0;
  let count = audiofeatures.length;

  audiofeatures.forEach((key: any) => {
    danceabilitySum += key.danceability;
    energySum += key.energy;
    loudnessSum += (-1)* key.loudness;
    valenceSum += key.valence;
    tempoSum += normalizeTempo(key.tempo);
    accousticnessSum += key.acousticness;
  })

  let avgDance = danceabilitySum / count * 100;
  let avgEnergy = energySum / count * 100;
  let avgLoudness = loudnessSum / count;
  let avgVal = valenceSum / count * 100;
  let avgTempo = tempoSum / count;
  let avgAccousticness = accousticnessSum / count * 100;


  let data: any = [
    { feature: "Valence", value: avgVal, color: "#9954E6" },
    { feature: "Energy", value: avgEnergy, color: "#63adfeb3" },
    //{ name: "Loudness", value: avgLoudness, color: "#533a84" },
    { feature: "Dancebility", value: avgDance, color: "#dd8050c4" },
    // { name: "Tempo", value: avgTempo, color: "#296E01" }
    { feature: "Loudness", value: avgLoudness, color: "#9954E6" },
    { feature: "Tempo", value: avgTempo, color: "#63adfeb3" },
    //{ name: "Loudness", value: avgLoudness, color: "#533a84" },
    { feature: "Accousticness", value: avgAccousticness, color: "#dd8050c4" }
  ];
  console.log(data);

  let margin = 100;
  let leftmargin = 150;
  let bottomMargin = 125;
  let xAxisWidth = window.innerWidth - margin * 2;
  let yAxisHeight = window.innerHeight*0.90 - margin * 2

  

  let svg = d3.select("#bar-chart").append("svg")
  .attr(
    "viewBox",
    `0 0 ${xAxisWidth + margin * 2} ${yAxisHeight + bottomMargin}`
    //`0 0 ${xAxisWidth + margin * 2} ${yAxisHeight + bottomMargin}`
  )
  .append("g")
  .attr("transform", "translate(" + leftmargin + "," + 0 + ")");


  let radialScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 250]);
  let ticks = [20, 40, 60, 80, 100];

  svg.selectAll("circle")
    .data(ticks)
    .join(
      enter => enter.append("circle")
        .attr("cx", xAxisWidth / 2)
        .attr("cy", yAxisHeight / 2)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", d => radialScale(d))
    );

  svg.selectAll(".ticklabel")
    .data(ticks)
    .join(
      enter => enter.append("text")
        .attr("class", "ticklabel")
        .attr("x", xAxisWidth / 2 + 5)
        .attr("y", d => yAxisHeight / 2 - radialScale(d))
        .text(d => d.toString())
    );

  let featureData = data.map((f:any, i:any) => {
    let angle = (Math.PI / 2) + (2 * Math.PI * i / data.length);
    return {
      "name": f,
      "angle": angle,
      "line_coord": angleToCoordinate(angle, 100),
      "label_coord": angleToCoordinate(angle, 105)
    };
  });

  

  // draw axis line
  svg.selectAll("line")
    .data(featureData)
    .join(
      enter => enter.append("line")
        .attr("x1", xAxisWidth / 2)
        .attr("y1", yAxisHeight / 2)
        .attr("x2", (d:any)  => d.line_coord.x)
        .attr("y2", (d:any)  => d.line_coord.y)
        .attr("stroke", "black")
    );

  // draw axis label
  svg.selectAll(".axislabel")
    .data(featureData)
    .join(
      enter => enter.append("text")
        .attr("x", (d:any) => d.label_coord.x)
        .attr("y", (d:any)  => d.label_coord.y)
        .text((d:any)  => d.name.feature)
    );




  let line = d3.line()
    .x((d:any)  => d.x)
    .y((d:any)  => d.y);
  let colors = ["#1DB954"];

  function getPathCoordinates() {
    let coordinates = [];
    for (var i = 0; i < data.length; i++) {
      let angle = (Math.PI / 2) + (2 * Math.PI * i / data.length);
      coordinates.push(angleToCoordinate(angle, data[i].value));
    }
    
    return coordinates;
  }

  svg.selectAll("path")
    .data(data)
    .join(
      (enter:any) => enter.append("path")
        .datum(() => getPathCoordinates())
        .attr("d", line)
        .attr("stroke-width", 3)
        .attr("stroke", () => colors[0])
        .attr("fill", () => colors[0])
        .attr("stroke-opacity", 1)
        .attr("opacity", 1)
    );


    function angleToCoordinate(angle:number, value:number) {
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { "x": xAxisWidth / 2 + x, "y": yAxisHeight / 2 - y };
    }



}




/*
* This is a helper function to flatten the 100 bulk arrays to one large
*
* @author: Sven (svenf@mail.uni-paderborn.de)
*
*/
function makeOneArray(arrayOfArrays: any): any {
  let flattenedArray: any = []
  arrayOfArrays.forEach((array: any) => {
    array.audio_features.forEach((element: any) => {
      if (element != null) {
        flattenedArray.push(element);
      }
    })
  });
  return flattenedArray
}

/*
* This is a helper function to normalize the tempo values to 0-100.
*
* @author: Sven (svenf@mail.uni-paderborn.de)
* @return normalizedValue 
*/
function normalizeTempo(originalValue: number): number {
  const minValue = 40;
  const maxValue = 160;
  const newMin = 0;
  const newMax = 100;

  const normalizedValue = ((originalValue - minValue) / (maxValue - minValue)) * (newMax - newMin) + newMin;
  
  return normalizedValue;
}


