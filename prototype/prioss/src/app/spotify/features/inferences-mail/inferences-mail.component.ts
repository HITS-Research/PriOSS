import { Component } from '@angular/core';


/**
  * This component presents a modal dialog via which the user can send a rectification Email for Spotify Inferences.
  * The list of inferences to be inserted in the email has to be passed as a parameter in the showModal-method.
  * The user needs to copy this list into the email manually via the two buttons that are in the dialog because 
  * large amounts of text cannot be inserted into an mail only from Typescript.
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
@Component({
  selector: 'app-inferences-mail',
  templateUrl: './inferences-mail.component.html',
  styleUrls: ['./inferences-mail.component.less']
})
export class InferencesMailComponent {
  isVisible = false;

  /**
   * The text that contains all inferences that are to be rectified
   */
  inferencesList : string;

  /**
   * 
   * Makes this dialog visible and saves the inferences that are to be recitfied in a member variable.
   * 
   * @param inferencesList the inferences that should be rectified
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  showModal(inferencesList: string): void {
    this.isVisible = true;
    this.inferencesList = inferencesList;
  }

  /**
   * Closes the dialog
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  handleOk(): void {
    this.isVisible = false;
  }

  /**
   * Closes the dialog
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  handleCancel(): void {
    this.isVisible = false;
  }

  /**
   * Copies the inferences list to the users clipboard and changes the icon of the copy button to give the user feedback that the copying was successful
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  copyInferencesToClipboard() : void {
    navigator.clipboard.writeText(this.inferencesList + '\nKind Regards.').then(function() {
      // TODO: Toast : show the below message as Toast,
      console.log('Copying to clipboard was successful!');
        const copyIcon = document.getElementById("copy-icon");
        const copiedIcon = document.getElementById("copied-icon");

        if(copyIcon) {
          copyIcon.style.display = "none";
        }

        if(copiedIcon) {
          copiedIcon.style.display = "inline-block";
        }
        
    }, function(err) {
        // TODO: Toast : show the below message as Toast,
        console.error('Could not copy text: ', err);
    });

  }

  /**
   * Opens the users Email programm and inserts the mail template (without the selected inferences).
   * The user has to insert the inferences themselves from their clipboard because otherwise one can't insert larger amounts of text into an email.
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  writeEmail() : void {
    window.open('mailto:privacy@spotify.com?subject=Rectification of Spotify Inferences according to GDPR&body=Dear Spotify Data Protection Team, %0D%0A%0D%0AI want to rectify the following inferences as I deem them wrong. I am exercising my rights as granted in GDPR Article 16. %0D%0A%0D%0A', '_self');
  }
}
