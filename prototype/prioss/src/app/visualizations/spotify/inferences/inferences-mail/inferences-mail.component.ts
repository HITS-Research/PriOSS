import { Component } from '@angular/core';

@Component({
  selector: 'app-inferences-mail',
  templateUrl: './inferences-mail.component.html',
  styleUrls: ['./inferences-mail.component.less']
})
export class InferencesMailComponent {
  isVisible = false;

  inferencesList : string = 'Test';

  constructor() {}

  showModal(inferencesList: string): void {
    this.isVisible = true;
    this.inferencesList = inferencesList;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  copyInferencesToClipboard() : void {
    navigator.clipboard.writeText(this.inferencesList + '\nKind Regards.').then(function() {
        console.log('Copying to clipboard was successful!');
        let copyIcon = document.getElementById("copy-icon");
        let copiedIcon = document.getElementById("copied-icon");

        if(copyIcon) {
          copyIcon.style.display = "none";
        }

        if(copiedIcon) {
          copiedIcon.style.display = "inline-block";
        }
        
    }, function(err) {
        console.error('Could not copy text: ', err);
    });

  }

  writeEmail() : void {
    window.open('mailto:privacy@spotify.com?subject=Rectification of Spotify Inferences according to GDPR&body=Dear Spotify Data Protection Team, %0D%0A%0D%0AI want to rectify the following inferences as I deem them wrong. I am exercising my rights as granted in GDPR Article 16. %0D%0A%0D%0A', '_self');
  }
}
