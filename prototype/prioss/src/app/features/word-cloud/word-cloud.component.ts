import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { CloudData, CloudOptions, TagCloudComponent } from "angular-tag-cloud-module";
import { SaveAsImageService } from "../save-as-image/save-as-image.service";


@Component({
  selector: 'prioss-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrl: './word-cloud.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TagCloudComponent
  ]
})
export class WordCloudComponent {
  @ViewChild(TagCloudComponent) tagCloudComponent: TagCloudComponent;
  @Input()set data(value: string[]) {
    this._data = this.assignRandomSizes(value);
  }
  @Input()set cloudHeight(height: number) {
    this.options.height = height;
  }
  get cloudData(): CloudData[] {
    return this._data;
  }
  private _data: CloudData[] = [];

  options: CloudOptions = {
    width: 1,
    height: 500,
    overflow: false,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.5,
      color:this.getRandomSoftColor()
    },
    background: "white",
    realignOnResize: true,
    randomizeAngle: true,
    step: 2,
    delay: 50
  };

  constructor(private imageService: SaveAsImageService) {
  }

  private assignRandomSizes(data: string[]): CloudData[] {
    const weightedData :CloudData[]= [];
    data.forEach(word=> weightedData.push({text:word, weight:this.getRandomSize(10,40),external:false,rotate:this.getRandomAngle()}));
    return weightedData
  }
  private getRandomSize(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomAngle(): number {
    const angles: number[] = [0, 1];
    return angles[(Math.floor(Math.random() * angles.length))];
  }

  private getRandomSoftColor() {
    const hue = Math.floor(Math.random() * 360);
    const lightness = Math.floor(Math.random() * 20) + 70;
    const saturation = Math.floor(Math.random() * 21) + 40;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  public reDraw() {
    this.tagCloudComponent.reDraw();
  }

  public saveAsImage(){
    this.imageService.saveHtmlAsImage("wordCloud");
  }
}
