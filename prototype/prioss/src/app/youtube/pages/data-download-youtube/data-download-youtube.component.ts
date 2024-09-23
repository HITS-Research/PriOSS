import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Step} from "../../../features/stepper/step.type";
import {StepperComponent} from "../../../features/stepper/stepper.component";

@Component({
  selector: 'prioss-data-download-youtube',
  template: `
    <prioss-stepper
      [stepIndex]="initialIndex"
      [steps]="steps"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [StepperComponent],
})
export class DataDownloadYoutubeComponent {

  /**
   * The initial step-index.
   */
  initialIndex: number = 0;

  /**
   * All steps which should be displayed.
   */
  #steps: Step[] = [
    {
      title: 'Step 1',
      description: 'Open the Google Takeout service by clicking on this <a href="https://takeout.google.com/settings/takeout" target="_blank"><b><i>link</i></b></a>. Once you are on the page, click on <b><i>Deselect all</i></b> to ensure you only export the data you specifically need.',
      imageUrl: '../../assets/images/youtube-data-download-instruction/Step1.png'
    },
    {
      title: 'Step 2',
      description: 'Scroll through the list of available Google products and find <b><i>Profile</i></b>. Check the box next to it to select your profile data for export.',
      imageUrl: '../../assets/images/youtube-data-download-instruction/Step2.png'
    },
    {
      title: 'Step 3',
      description: 'Make sure the format for the profile data is set to <b><i>JSON</i></b>. This will ensure that your profile settings are exported in a machine-readable format.',
      imageUrl: '../../assets/images/youtube-data-download-instruction/Step3.png'
    },
    {
      title: 'Step 4',
      description: 'Next, scroll down and find <b><i>YouTube and YouTube Music</i></b> in the list. Select this option to include your YouTube data in the export.',
      imageUrl: '../../assets/images/youtube-data-download-instruction/Step4.png'
    },
    {
      title: 'Step 5',
      description: 'Under the YouTube options, make sure to select the <b><i>History</i></b> format as <b><i>JSON</i></b>. This ensures that your watch and search history are included in a machine-readable format.',
      imageUrl: '../../assets/images/youtube-data-download-instruction/Step5.png'
    },
    {
      title: 'Step 6',
      description: 'After selecting the desired data, click on the <b><i>Next step</i></b> button to proceed to the export settings.',
      imageUrl: '../../assets/images/youtube-data-download-instruction/Step6.png'
    },
    {
      title: 'Step 7',
      description: 'In the next step, choose the file type as <b><i>.zip</i></b> and set the preferred file size. Then, click on <b><i>Create export</i></b> to start the process.',
      imageUrl: '../../assets/images/youtube-data-download-instruction/Step7.png'
    },
    {
      title: 'Step 8',
      description: 'The export process will begin, and you can monitor the progress on the screen. Google will notify you via email once the export is complete, and your data is ready for download.',
      imageUrl: '../../assets/images/youtube-data-download-instruction/Step8.png'
    },
  ];


  /**
   * All steps which should be displayed.
   */
  get steps(): Step[] {
    return this.#steps;
  }

}
