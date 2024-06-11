import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class SaveAsImageService {
  private imageCount:number=0;

  constructor() { }

  saveHtmlAsImage(divId: string) {
    const htmlElement = document.getElementById(divId);
    if(htmlElement){
      this.imageCount++;
      html2canvas(htmlElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = imgData;
        a.download = divId+'image'+this.imageCount+'.png';
        a.click();
      });
    }
  }
}
