import { Component, OnInit, Input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { NgxEchartsModule, provideEcharts } from 'ngx-echarts';
import * as worldjson from 'src/assets/geographical-data/world.json';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.less'],
  standalone: true,
  providers: [provideEcharts()],
  imports: [NgxEchartsModule, NzIconModule, NzPopoverModule],
})
export class WorldMapComponent implements OnInit {
  @Input() mapOptions: EChartsOption;

  options: EChartsOption;

  constructor() {}

  ngOnInit(): void {
    echarts.registerMap('world', worldjson.default);

    this.options = {
      geo: {
        map: 'world',
        roam: true,
        scaleLimit: {
          min: 1,
          max: 30,
        },
        zoom: 1.2,
        aspectScale: 1, 
        itemStyle: {
          borderColor: '#999',
        },
      },
      tooltip: {
        trigger: 'item',
        show: false
      },
    };
    
    // series and other options from the input
    for (const key in this.mapOptions) {
      this.options[key] = this.mapOptions[key];
    }
  }
}

// // Example series for the map
//   series: [  
//     {
//       type: 'effectScatter',
//       coordinateSystem: 'geo',
//       data: [
//         {
//             "name": "Unna, Germany",
//             "value": [
//                 7.69,
//                 51.538
//             ],
//             emphasis: {
//                 label: {
//                     show: true
//                 }
//             }
//         },
//         {
//             "name": "Paderborn, Germany",
//             "value": [
//                 8.754,
//                 51.719
//             ],
//         },
//         {
//             "name": "Unna, Germany",
//             "value": [
//                 7.69,
//                 51.538
//             ],
//         }
//     ],
//       symbolSize: 10,
//       showEffectOn: 'render',
//       rippleEffect: {
//         brushType: 'stroke',
//       },
//     },
//   ],
