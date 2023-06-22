import { Component, OnInit } from '@angular/core';
import { AddressBookModel } from 'src/app/models/Facebook/addressBook';
import { FacebookAddressBookRepository } from 'src/app/db/data-repositories/facebook/fb-other-personal-info/face_address_book.repo';
import * as d3 from 'd3';
@Component({
  selector: 'app-other-personal-info',
  templateUrl: './other-personal-info.component.html',
  styleUrls: ['./other-personal-info.component.less']
})
export class OtherPersonalInfoComponent implements OnInit{
  addressBookData: AddressBookModel[] = [];
  constructor(private faceAdressBookRepo: FacebookAddressBookRepository){}
  ngOnInit(): void {
   this.getData();
  }
  async getData() {
    this.faceAdressBookRepo.getAllFaceAddressBook().then((addressBookData) => {
      const filteredData = addressBookData.filter(entry => entry.name && entry.contact_point && entry.created_timestamp);
      const groupedData = filteredData.reduce((acc: { [key: string]: AddressBookModel }, entry) => {
        if (!acc[entry.name]) {
          acc[entry.name] = entry;
        }
        return acc;
      }, {});
      const nonAmbiguousData = Object.values(groupedData);
      console.log("non", nonAmbiguousData);
      this.generateTreeMap(nonAmbiguousData);
    });
  }
  
  generateTreeMap(data: AddressBookModel[]) {
    try{
    let margin = 10;
    let leftmargin = 330;
    let rightMargin = 80; // Adjust the right margin value
    let bottomMargin = 125;
    let xAxisWidth = window.innerWidth - leftmargin - rightMargin;
    let yAxisHeight = window.innerHeight - margin - bottomMargin;
  
    let svg = d3
      .select("#treemap")
      .append("svg")
      .attr("viewBox", `0 0 ${xAxisWidth + leftmargin + rightMargin} ${yAxisHeight + margin + bottomMargin}`)
      .append("g")
      .attr("transform", "translate(" + leftmargin + "," + margin + ")");
  
    // Filter out entries with null values
    const filteredData = data.filter(entry => entry.name && entry.contact_point && entry.created_timestamp);
  
    // Create a mapping of name to entry for efficient parent lookup
    const entryMap = new Map(filteredData.map(entry => [entry.name, entry]));
  
// Transform data using stratify
// Transform data using stratify
// Transform data using stratify
const root = d3.stratify<AddressBookModel>()
  .id(function(d) { return d.name; })
  .parentId(function(d) {
    // Find parent based on name
    const parentName = d.name === 'root' ? null : d.name; // Set the root node's parent as null
    if (parentName && entryMap.has(parentName)) {
      return parentName;
    }
    return ''; // Use empty string as default parent if null or not found in the entryMap
  })
  (filteredData);
  console.log("root",root)

    // Compute the numeric value for each entity
    root.sum(function(d) { return 1; });
  
    // Compute the treemap layout
    const treemap = d3.treemap<AddressBookModel>()
      .size([xAxisWidth, yAxisHeight])
      .padding(4);
  
    treemap(root);
  
    // Output the leaves (terminal nodes)
    console.log(root.leaves());
    // Use the information to add rectangles
    svg.selectAll("rect")
      .data(root.leaves() as d3.HierarchyRectangularNode<AddressBookModel>[])
      .enter()
      .append("rect")
      .attr('x', function(d) { return (d.x0 || 0); })
      .attr('y', function(d) { return (d.y0 || 0); })
      .attr('width', function(d) { return (d.x1 || 0) - (d.x0 || 0); })
      .attr('height', function(d) { return (d.y1 || 0) - (d.y0 || 0); })
      .style("stroke", "black")
      .style("fill", "#69b3a2");
  
    // Add text labels
    svg.selectAll("text")
      .data(root.leaves() as d3.HierarchyRectangularNode<AddressBookModel>[])
      .enter()
      .append("text")
      .attr("x", function(d) { return (d.x0 || 0) + 10; }) // +10 to adjust position (more right)
      .attr("y", function(d) { return (d.y0 || 0) + 20; }) // +20 to adjust position (lower)
      .text(function(d) { return d.data.name; })
      .attr("font-size", "15px")
      .attr("fill", "black");
  }catch (error) {
    console.error(error);
  }
}
}




