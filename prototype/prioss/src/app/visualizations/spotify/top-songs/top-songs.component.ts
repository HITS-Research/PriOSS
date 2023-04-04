import { Component } from '@angular/core';
import {NgxIndexedDBService} from "ngx-indexed-db";
import * as d3 from "d3";

@Component({
  selector: 'spot-top-songs',
  templateUrl: './top-songs.component.html',
  styleUrls: ['./top-songs.component.less']
})
export class TopSongsComponent {
  tracksBySong = new Map<string, number[]>(); // this map contains all songs together with the track ids belonging to the song
  mostListenedSongsSorted: any[]; // same content as tracksBySong but sorted by the number of times listened
  songsAndNumberListenedSorted: any[] = [];  // like mostListenedSongsSorted but without the song ids, only the number of times listened

  constructor(private dbService: NgxIndexedDBService) {
    this.dbService.getAll('spot/history').subscribe(async (history: any) => {

      for (const track of history) {

        const songAndArtist = track.trackName + " by " + track.artistName;
        if (this.tracksBySong.has(songAndArtist)) {
          this.tracksBySong.get(songAndArtist)!.push(track.$id);
        } else {
          this.tracksBySong.set(songAndArtist, [track.$id]);
        }
      }

      this.mostListenedSongsSorted = Array.from(this.tracksBySong.entries());
      this.mostListenedSongsSorted.sort(function (a, b) {
        if (a[1].length >= b[1].length) {
          return -1;
        }
        return 1;
      });

      this.songsAndNumberListenedSorted = this.getTopNSongs(this.mostListenedSongsSorted.length)
      this.makeBarChart(this.songsAndNumberListenedSorted.slice(0, 10));
    });
  }

  /**
   * Creates an array containing the top n songs and how many times a song was played
   *
   * @param n: The top n songs will be returned
   *
   * @author: Jonathan (jvn@mail.upb.de))
   *
   */
  private getTopNSongs(n: number): any[] {
    const topNSongs = [];
    for (let i = 0; i < n; i++) {
      topNSongs.push({songAndArtist: this.mostListenedSongsSorted[i][0], numberListened: this.mostListenedSongsSorted[i][1].length});
    }
    return topNSongs;
  }


  /**
   * Creates the bar chart showing the number of songs listened by an artist
   *
   * @param data: A map containing the name of a song and artist as key and the how many times the songs was heard as value
   *
   * @author: Jonathan (jvn@mail.upb.de))
   *
   */
  makeBarChart(data: { songAndArtist: string, numberListened: number }[]) {

    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 40, left: 90},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bar_chart_top_songs")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    const xScale = d3.scaleLinear()
      .domain([0, data[0].numberListened]) // maximum
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
      .domain(data.map(d => d.songAndArtist))
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(yScale).tickSize(0))
      .attr("text-anchor", "end");

    //Bars
    svg.selectAll("myRect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0) )
      .attr("y", d => yScale(d.songAndArtist))
      .attr("width", d => xScale(d.numberListened))
      .attr("height", yScale.bandwidth())
      .attr("fill", "#69b3a2");

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Times listened");
  }

}
