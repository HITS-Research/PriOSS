import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import * as d3 from 'd3';
import { SpotHistoryRepository } from 'src/app/db/data-repositories/spotify/spot-history/spot-history.repository';
import { endOfMonth } from 'date-fns';
import * as sampleData from './samplesongsformood.json';

const CLIENT_ID = environment.CLIENT_ID;
const CLIENT_SECRET = environment.CLIENT_SECRET;
let token: string;
let withdate: any;
const spotifyGreen = "#1DB954";
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


  constructor(private spotHistoryRepo: SpotHistoryRepository) {
    this.setToken();
  }

  setMood = (mood: string) => {
    this.mood = mood;
  }

  /* 
   * This function starts the drawing of the Radarchart. If offlineLoading is true the json file is loaded.
   * If false the songIds for the given data download are requested.
   * The Spotify API rate limit is already for one user to slow to hande many requests. Therefore, we decided for now to only use sampledata for this component.
   * 
   * @author: Sven (svenf@mail.uni-paderborn.de)
  */
  startRadarChart() {
    if (this.offlineLoading) {
      withdate = Object.values(JSON.parse(JSON.stringify(sampleData))).slice(0, 500);
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

  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };

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
    const spotHistory = await this.spotHistoryRepo.getSpotHistory();
    this.allSongsNumber = spotHistory.length;
    const trackIds: string[] = [];
    const names: string[] = [];
    const limit = 500;

    for (const entry of spotHistory) {

      if (this.queriedSongs >= limit) {
        break;
      }
      names.push(entry.trackName);
      const trackId = await this.getTrackId(entry.trackName);
      trackIds.push(trackId);
      this.queriedSongs++;
    }
    const audiofeatures: any = await this.getAudioFeaturesInBulk(trackIds);
    const flattend = makeOneArray(audiofeatures);
    withdate = addListeningDateToAudiofeatures(flattend, names, spotHistory);
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
      if (start >= timestamp.toUTCString() && timestamp.toUTCString() <= end) timed.push(d);
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
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })
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

function addListeningDateToAudiofeatures(audiofeatures: any, names: string[], original: any): any {
  let counter = 0;
  for (let i = 0; i < original.length; i++) {
    const key = original[i];
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
function makeRadarChart(audiofeatures: any, componentInstance: MoodComponent) {
  d3.select("#bar-chart").selectAll("*").remove();
  let danceabilitySum = 0;
  let energySum = 0;
  let loudnessSum = 0;
  let valenceSum = 0;
  let tempoSum = 0;
  let accousticnessSum = 0;
  const count = audiofeatures.length;

  audiofeatures.forEach((key: any) => {
    danceabilitySum += key.danceability;
    energySum += key.energy;
    loudnessSum += (-1) * key.loudness;
    valenceSum += key.valence;
    tempoSum += normalizeTempo(key.tempo);
    accousticnessSum += key.acousticness;
  })

  const avgDance = danceabilitySum / count * 100;
  const avgEnergy = energySum / count * 100;
  const avgLoudness = loudnessSum / count;
  const avgVal = valenceSum / count * 100;
  const avgTempo = tempoSum / count;
  const avgAccousticness = accousticnessSum / count * 100;

  // Define criteria for each mood. Here could a more profound machine learning be applied to analyse what mood is indicated be the values
  const danceabilityThreshold = 0.6;  // Adjust as needed
  const energyThreshold = 0.6;        // Adjust as needed
  const valenceThreshold = 0.6;       // Adjust as needed
  const acousticnessThreshold = 0.4;
  if (avgDance >= danceabilityThreshold && avgEnergy >= energyThreshold) {
    if (avgVal >= valenceThreshold) {
      componentInstance.setMood('happy');
    } else {
      componentInstance.setMood('energetic');

    }
  } else {
    if (avgVal >= valenceThreshold) {
      componentInstance.setMood('calm');
    } else if (avgAccousticness >= acousticnessThreshold) {
      componentInstance.setMood('sad');
    }
  }


  const data: any = [
    { feature: "Valence", value: avgVal, additionalText: "Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)." },
    { feature: "Energy", value: avgEnergy, additionalText: "represents a perceptual measure of intensity and activity" },
    { feature: "Dancebility", value: avgDance, additionalText: "describes how suitable a track is for dancing" },
    { feature: "Loudness", value: avgLoudness, additionalText: "is the quality of a sound that is the primary psychological correlate of physical strength (amplitude)" },
    { feature: "Tempo", value: avgTempo, additionalText: "is the speed or pace of a given piece and derives directly from the average beat duration" },
    { feature: "Accousticness", value: avgAccousticness, additionalText: "High acoustic values represents  high confidence the track is acoustic" }
  ];

  const margin = 100;
  const leftmargin = 150;
  const bottomMargin = 125;
  const xAxisWidth = window.innerWidth - margin * 2;
  const yAxisHeight = window.innerHeight * 0.90 - margin * 2



  const svg = d3.select("#bar-chart").append("svg")
    .attr(
      "viewBox",
      `0 0 ${xAxisWidth + margin * 2} ${yAxisHeight + bottomMargin}`
      //`0 0 ${xAxisWidth + margin * 2} ${yAxisHeight + bottomMargin}`
    )
    .append("g")
    .attr("transform", "translate(" + leftmargin + "," + 0 + ")");


  const radialScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 250]);
  const ticks = [20, 40, 60, 80, 100];

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

  const featureData = data.map((f: any, i: any) => {
    const angle = (Math.PI / 2) + (2 * Math.PI * i / data.length);
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
        .attr("x2", (d: any) => d.line_coord.x)
        .attr("y2", (d: any) => d.line_coord.y)
        .attr("stroke", "black")
    );

  // draw axis label
  svg.selectAll(".axislabel")
    .data(featureData)
    .enter()
    .append("g")
    .attr("class", "axislabel")
    .attr("transform", (d: any) => `translate(${d.label_coord.x},${d.label_coord.y})`)
    .each(function (d: any) {
      const group = d3.select(this);

      group.append("text")
        .attr("x", 15)
        .attr("y", 5)
        .text(d.name.feature)
        .attr("class", "label");


      group.append("circle")
        .attr("r", 10)
        .attr("class", "circle")
        .attr("fill", "black");



      group.append("text")
        .attr("x", 0)
        .attr("y", 4)
        .text("i")
        .attr("class", "icon")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-weight", "bold")
        .style("font-size", "10px");

      const additionalTextGroup = group.append("g"); // Create a group for background and text
      const backgroundRect = additionalTextGroup
        .append("rect")
        .attr("fill", "#3C3D3E")
        .attr("stroke", "#3C3D3E")
        .attr("stroke-width", 1)
        .attr("rx", 5)
        .style("opacity", 0); 

      // Append the text element
      const textElement: any = additionalTextGroup
        .append("text")
        .attr("x", 10) // Adjust the position as needed
        .attr("y", 25) // Adjust the position as needed
        .text(d.name.additionalText) // Replace with the desired additional text
        .attr("class", "additional-text")
        .style("fill", "white")
        .style("font-size", "12px")
        .style("font-weight", "normal")
        .style("pointer-events", "none")
        .style("opacity", 0); // Initially hide it. This prevents the background from blocking mouse events

      // Calculate and set the background rectangle's dimensions based on the text's size
      const textBoundingBox = textElement.node().getBBox();
      backgroundRect.attr("width", textBoundingBox.width + 20); // Adjust the padding as needed
      backgroundRect.attr("height", textBoundingBox.height + 20); // Adjust the padding as needed



      // Add event handlers to show/hide on mouseover/mouseout
      group.on("mouseover", function () {
        backgroundRect.style("opacity", 1); // Show the background
        textElement.style("opacity", 1); // Show the text
      }).on("mouseout", function () {
        backgroundRect.style("opacity", 0); // Hide the background
        textElement.style("opacity", 0); // Hide the text
      });

    });



  const line = d3.line()
    .x((d: any) => d.x)
    .y((d: any) => d.y);
  const colors = [spotifyGreen];
  /*
  * This is a helper function ro calculate the path coordinates
  *
  * @author: Sven (svenf@mail.uni-paderborn.de)
  *
  */
  function getPathCoordinates() {
    const coordinates = [];
    for (let i = 0; i < data.length; i++) {
      const angle = (Math.PI / 2) + (2 * Math.PI * i / data.length);
      coordinates.push(angleToCoordinate(angle, data[i].value));
    }

    return coordinates;
  }

  svg.selectAll("path")
    .data(data)
    .join(
      (enter: any) => enter.append("path")
        .datum(() => getPathCoordinates())
        .attr("d", line)
        .attr("stroke-width", 3)
        .attr("stroke", () => colors[0])
        .attr("fill", () => colors[0])
        .attr("stroke-opacity", 1)
        .attr("opacity", 1)
    );


  /*
  * This is a helper function to calculate the angle for labels and lines
  *
  * @author: Sven (svenf@mail.uni-paderborn.de)
  *
  */
  function angleToCoordinate(angle: number, value: number) {
    const x = Math.cos(angle) * radialScale(value);
    const y = Math.sin(angle) * radialScale(value);
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
  const flattenedArray: any = []
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




