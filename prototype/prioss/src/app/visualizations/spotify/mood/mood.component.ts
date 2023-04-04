import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { environment } from '../../../../environments/environment.prod';
import * as d3 from 'd3';

const CLIENT_ID = environment.CLIENT_ID;
const CLIENT_SECRET = environment.CLIENT_SECRET;
let token: string;
let withdate:any;

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
  files: any[] = [];
  

  constructor(private dbService: NgxIndexedDBService) {
        this.dbService.getAll('spot/history').subscribe(async (history) => 
    {
      console.log("history: ");
      console.log(history);
      let ids: string[] = [];
              let names: string[] = [];
             
                await this.setToken();

                const trackNames = history.map((track: any) => track.trackName);
                console.log(trackNames);
                const lastSongName = trackNames[trackNames.length - 1];
                let lastStringId = await this.getTrackId(lastSongName);
                trackNames.forEach(async (key: any) => {
                  let stringid = await this.getTrackId(key);
                  ids.push(stringid);
                  names.push(key);
                  if (stringid === lastStringId) {  //for some unknown reason the ids behaves weird. Normally you would except to have after the for loop all ids added and then make the calls 
                                                    //that are inside this if clause. However, somehow the values are undefined if you try to access them after the loop. What is weird. console.log(ids).
                                                    //This somehow circumvents this. It is probably realted to await and async but it does not make sense to me why it is not working.
                    let audiofeatures: any = await this.getAudioFeaturesInBulk(ids);
                    let flattend = makeOneArray(audiofeatures);
                    withdate = addListeningDateToAudiofeatures(flattend, names, history);
                    makeBarChart(flattend);
                    
                  }
                })
         
              
    });
  }

  /**
  * Updates the displayed bar chart using an start and end date that the user can select.
  *
  * @author: Max (maxy@mail.upb.de), Sven (svenf@mail.uni-paderborn.de)
  *
  */
  updateBarChart() {
    let startDateInput:any = (document.getElementById("start-date") as HTMLInputElement).value;
    let endDateInput:any = (document.getElementById("end-date") as HTMLInputElement).value;
    let timed:any  = withdate.filter((d:any) => {
      let timestamp = new Date(d.time);
      return timestamp >= new Date(startDateInput) && timestamp <= new Date(endDateInput);
    });
    console.log(timed);
  
    d3.select("#bar-chart").selectAll("*").remove();
    makeBarChart(timed);
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
  
  async setToken() {;
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
    const response = await fetch(`https://api.spotify.com/v1/search?q=${trackName}&type=track&limit=1`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();
    return json.tracks.items[0].id
  };



  /**
  * This function queries the Spotify Web API endpoint audio-features. To prevent timeouts a bulk request is performed. The Spotify Web API allows up to 100 song ids at once.
  * 
  * @author: Sven (svenf@mail.uni-paderborn.de)
  *
  */
  async getAudioFeaturesInBulk(ids: string[]): Promise<string[]> {
    const spotifyUrl = 'https://api.spotify.com/v1/audio-features?ids='
    let start = 0;
    let end = 100;
    let valenceArray = []
    
    while (start < ids.length) {
      let songsBatch = ids.slice(start, end);
      let bulkUrl = makeBulkRequestUrl(songsBatch, spotifyUrl);
      start += 100;
      end += 100;
      await new Promise(resolve => setTimeout(resolve, 1000));
      let response = await fetch(bulkUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      let json = await response.json();
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

function addListeningDateToAudiofeatures(audiofeatures: any, names:string[], original:any):any {
  let counter = 0;
  for (let i = 0; i < original.length; i++) { 
    let key = original[i];
    if (names.includes(key.trackName)) {
      audiofeatures[counter].time = key.endTime;
      counter++;
    if (counter === audiofeatures.length) break;
   }
  }
  console.log(audiofeatures);
  return audiofeatures;
}


/*
* D3 seems to be the most used visualisation library for javascript. I don't understand the code here yet. However, at the moment it calculates the average of all provided songs for the 
* audiofeatures dancebility, enery, liveness and sum. And these values are then represented in a barchart.
* @author: Sven (svenf@mail.uni-paderborn.de)
*
*/
function makeBarChart(audiofeatures: any) {
  let danceabilitySum = 0;
  let energySum = 0;
  let loudnessSum = 0;
  let valenceSum = 0;
  let tempoSum = 0;
  let count = audiofeatures.length;

  audiofeatures.forEach((key: any) => {;
    danceabilitySum += key.danceability;
    energySum += key.energy;
    loudnessSum += key.loudness;
    valenceSum += key.valence;
    tempoSum += key.tempo;
  })

  let avgDance = danceabilitySum / count;
  let avgEnergy = energySum / count;
  //let avgLoudness = loudnessSum / count;
  let avgVal = valenceSum / count;
  //let avgTempo = tempoSum / count;


  let data: any = [
    { name: "Valence", value: avgVal, color: "#9954E6" },
    { name: "Energy", value: avgEnergy, color: "#63adfeb3" },
    //{ name: "Loudness", value: avgLoudness, color: "#533a84" },
    { name: "Dancebility", value: avgDance, color: "#dd8050c4" },
   // { name: "Tempo", value: avgTempo, color: "#296E01" }
  ];

  let margin = 100;
  let width = 750 - margin * 2;
  let height = 600 - margin * 2;
  let svg = d3
    .select("#bar-chart")
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${width + margin * 2} ${height + margin * 2}`
    )

    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

  let x: any = d3
    .scaleBand()
    .range([0, width])
    .domain(data.map((d: any) => d.name))
    .padding(0.2);

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Average audio_feature values of listend songs in given time");

  // Drawing X-axis on the DOM
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    // .attr('transform', 'translate(-10, 0)rotate(-45)')
    // .style('text-anchor', 'end')
    .style("font-size", "14px");

  // Creaate Y-axis band scale
  let y = d3
    .scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

  let formatter = d3.format(".0%");
  // Draw the Y-axis on the DOM
  svg
    .append("g")
    .call(d3.axisLeft(y).scale(y).tickFormat(formatter))
    .selectAll("text")
    .style("font-size", "14px");

  // Create and fill the bars
  svg
    .selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.name))
    .attr("y", (d: any) => y(d.value))
    //.attr("y", (d: any) => height - y(d.value) * height / 100)
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => height - y(d.value))
    //.attr("height", (d: any) => y(d.value) * height / 100)// this.height
    .attr("fill", (d: any) => d.color);

  svg
    .selectAll("text.bar")
    .data(data)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("fill", "#70747a")
    .attr("x", (d: any) => x(d.name) + 19)
    .attr("y", (d: any) => y(d.value) - 5) // change text position
    .text((d: any) => d3.format(".0%")(d.value));

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
