import { Component, Input } from '@angular/core';

type Inference = { inference: string; checked: boolean };

/**
 * This component presents a modal dialog via which the user can send a rectification Email for Spotify Inferences.
 * The list of inferences to be inserted in the email comes from the inference component.
 */
@Component({
  selector: 'prioss-spotify-inferences-mail',
  templateUrl: './inferences-mail.component.html',
  styleUrls: ['./inferences-mail.component.less'],
})
export class InferencesMailComponent {
  isVisible = false;
  isEmpty = false;
  selectedInferences: string[];

  @Input()
  inferences: Inference[];

  /**
   * Makes this dialog visible and saves the inferences that are to be rectified in a member variable.
   */
  public showModal(): void {
    this.selectedInferences = this.inferences
      .filter(i => i.checked)
      .map(i => i.inference);

    if (this.selectedInferences.length > 0) {
      this.isVisible = true;
    } else {
      this.isEmpty = true;
    }
  }

  /**
   * Closes the dialog
   */
  handleCancel(): void {
    this.isVisible = false;
    this.isEmpty = false;
  }

  /**
   * Opens the users Email program and inserts the mail template.
   */
  writeEmail(): void {
    const inferencesText: string = this.selectedInferences.join('\n');
    const emailBody = `Dear Spotify Data Protection Team,\n\nI want to rectify the following inferences as I deem them wrong. I am exercising my rights as granted in GDPR Article 16.\n\n${inferencesText}`;
    const mailtoLink = `mailto:privacy@spotify.com?subject=Rectification of Spotify Inferences according to GDPR&body=${encodeURIComponent(
      emailBody,
    )}`;

    window.open(mailtoLink, '_self');
  }
}
