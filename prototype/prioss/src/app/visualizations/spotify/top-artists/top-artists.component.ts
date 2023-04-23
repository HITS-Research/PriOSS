import {Component} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import * as d3 from 'd3';
import {SpotHistoryRepository} from "../../../db/data-repositories/spotify/spot-history/spot-history.repository";
import {SpotYearlyListening} from "../../../models/Spotify/ListeningHistory/SpotYearlyListening";
import {InferencesEntry} from "../../../models/General/Inferences/InferencesEntry";
import {SpotListenHistoryEntry} from "../../../models/Spotify/ListeningHistory/SpotListenHistoryEntry";

/**
 * This component visualizes how many songs from an artist were listened to
 * Because of missing UIDs for artists we cannot distinguish between artists with the same name
 *
 * @author: Jonathan (jvn@mail.upb.de)
 *
 */
@Component({
  selector: 'spot-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.less']
})


export class TopArtistsComponent {

  tracksByArtist = new Map<string, number[]>(); // this map contains all artists together with the song ids belonging to an artist
  mostListenedArtistsSorted: any[]; // same content as tracksByArtist but sorted by the number of songs listened to
  artistsAndSongsListenedSorted: any[] = [];  // like mostListenedArtistsSorted but without the song ids, only the number of songs listened from the artist
  readonly spotifyGreen: string = "#1DB954";

  constructor(private spotHistoryRepo: SpotHistoryRepository) {
    this.spotHistoryRepo.getSpotHistory().then((history) => {
      for (const track of history) {
        if (this.tracksByArtist.has(track.artistName)) {
          this.tracksByArtist.get(track.artistName)!.push(track.id);
        } else {
          this.tracksByArtist.set(track.artistName, [track.id]);
        }
      }

      this.mostListenedArtistsSorted = Array.from(this.tracksByArtist.entries());
      this.mostListenedArtistsSorted.sort(function (a, b) {
        if (a[1].length >= b[1].length) {
          return -1;
        }
        return 1;
      });

      this.artistsAndSongsListenedSorted = this.getTopNArtists(this.mostListenedArtistsSorted.length)
      this.makeBarChart(this.artistsAndSongsListenedSorted.slice(0, 10));
    });
  }

  /**
   * Creates an array containing the top n artists and how many songs of an artists were played
   *
   * @param n: The top n artists will be returned
   *
   * @author: Jonathan (jvn@mail.upb.de))
   *
   */
  private getTopNArtists(n: number): any[] {
    const topNArtists = [];
    for (let i = 0; i < n; i++) {
      topNArtists.push({artist: this.mostListenedArtistsSorted[i][0], numberSongsListened: this.mostListenedArtistsSorted[i][1].length});
    }
    return topNArtists;
  }


  /**
   * Creates the bar chart showing the number of songs listened by an artist
   *
   * @param data: A map containing the name of an artist as key and the number of songs heard by the artist as value
   *
   * @author: Jonathan (jvn@mail.upb.de))
   *
   */
  makeBarChart(data: { artist: string, numberSongsListened: number }[]) {

    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 40, left: 90},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bar_chart_top_artists")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    const xScale = d3.scaleLinear()
      .domain([0, data[0].numberSongsListened]) // maximum
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    var yScale: any = d3.scaleBand()
      .range([0, height])
      .domain(data.map(d => d.artist))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(yScale).tickSize(0));

    //Bars
    svg.selectAll("myRect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0) )
      .attr("y", d => yScale(d.artist))
      .attr("width", d => xScale(d.numberSongsListened))
      .attr("height", yScale.bandwidth())
      .attr("fill", this.spotifyGreen);

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Songs listened");
  }

}
