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

  followerInfo : InstaFollowerInfo[] = [];
  followingInfo : InstaFollowerInfo[] = [];
  graphElements: { data: { id?: string, source?: string, target?: string  }, position?: {x: number, y: number} }[] = [];

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
    //Creates a set of nodes for the star-pattern
    const nodes = new Set<string>();
    if(this.graphOptions.includes('Followers')){
      this.followerInfo.forEach(follower => nodes.add(follower.instaAccountName)); 
    } 
    if(this.graphOptions.includes('Following')){
      this.followingInfo.forEach(following => nodes.add(following.instaAccountName)); 
    } 
    const numberOfNodes = nodes.size;
    //Gives every node their position in the cycle and add the nodes to the graphElement array
    this.graphElements = [...nodes].map((node, index) => ({
      data: {
        id: node,
      },
      position: { 
        x: 100 + 200 * Math.cos(360/numberOfNodes*index),
        y: 100 + 200 * Math.sin(360/numberOfNodes*index),
      },

    }))
    //adds the users node to the array and fix his position into the center
    const you = 'you';
    this.graphElements.push({
      data:{
        id: you,
      },
      position:{
        x: 100,
        y: 100,
      }
    });
    //Add the edges between the user to its followers
    this.followerInfo.forEach((follower)=>{
      this.graphElements.push({
        data:{
          //id: `${follower.instaAccountName}${you}`,
          source: follower.instaAccountName,
          target: you,
        }
      });
    });
  }

  /**
   * Builds the graph for the followers and following accounts.
   * 
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async ngAfterViewInit() {
    await this.collectData();
    this.prepareGraphData();
    var cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
      elements: this.graphElements,     
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
          }
        }
      ],
      layout: {
        name: 'preset',
        fit: true,
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


