import { Component, Input} from '@angular/core';
import cytoscape from 'cytoscape';
import * as utilities from 'src/app/utilities/generalUtilities.functions'
import { InstaFollowerInfo } from 'src/app/models/Instagram/FollowerInfo/FollowerInfo';
import { InstaFollowerRepository } from 'src/app/db/data-repositories/instagram/insta-follower-info/insta-follower.repository';

@Component({
  selector: 'app-insta-followers',
  templateUrl: './insta-followers.component.html',
  styleUrls: ['./insta-followers.component.less'],
  providers: [InstaFollowerRepository]
})


export class InstaFollowersComponent {
  previewMode: boolean = false;

  followerInfo : InstaFollowerInfo[] = [{instaProfileURL: "url1", instaAccountName: "Max Mustermann", timestamp: 1234567}];
  followingInfo : InstaFollowerInfo[] = [{instaProfileURL: "url2", instaAccountName: "Max Mustermann", timestamp: 1234567}];

  getObjectPairs: (obj: object) => [string, any][] = utilities.getObjectPairs;
  convertTimestamp: (str: string) => any = utilities.convertTimestamp;
  capitalizeAndPrettify: (str: string) => string = utilities.capitalizeAndPrettify;

  graphOptions = ['Followers', 'Following'];
  selectedTags: string[] = [];

  constructor(private instaFollowerRepo: InstaFollowerRepository) {
  }

  /**
   * Stores all needed data from the different tables into the corresponding interface variables.
   * 
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async collectData() {
    this.followerInfo = await this.instaFollowerRepo.getFollowerInfo();
    await this.instaFollowerRepo.getFollowingInfo().then((followingInfo) => {
      this.followingInfo = followingInfo;
    });
  }

  /**
   * Prepare the follower/following information for the graph representation. Means changing the format of the representation of this information.
   * 
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  prepareGraphData(){
    console.log(this.followerInfo)
  }

  async ngOnInit(){
    await this.collectData();
  }
  /**
   * Builds the graph for the followers and following accounts.
   * 
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  ngAfterViewInit() {
    this.prepareGraphData()
    var cy = cytoscape({
  
      container: document.getElementById('cy'), // container to render in
    
      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a' }
        },
        { // node b
          data: { id: 'b' }
        },
        { // node c
          data: { id: 'c' }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        },
        { // edge ba
          data: { id: 'ba', source: 'b', target: 'a' }
        }
      ],
    
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },
    
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label':'data(id)'
          }
        }
      ],
    
      layout: {
        name: 'grid',
        rows: 1
      }
    
    });
  }

  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    console.log('You are interested in: ', this.selectedTags);
  }
}


