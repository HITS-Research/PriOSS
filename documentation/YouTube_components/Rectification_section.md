YouTube Dashboard - Rectification Section

Overview:

The Rectification Section is a part of the YouTube Dashboard that allows users to rectify any errors or omissions in their YouTube data. It provides a step-by-step guide to help users navigate through the rectification process effectively.

Features:

Step-by-Step Guidance: Guides users through each step of the rectification process using an interactive nz-steps component.

Helpful Resources: Links to the YouTube Help Center for additional assistance.

Interactive Navigation: Users can navigate through different steps using 'Previous' and 'Next' buttons.

HTML Structure:

<div class="dashboard-page dashboard-container">
  <app-accordion id="rectification" title="Rectification">
    <p nz-typography>
      This section helps you rectify any errors or omissions in your YouTube data. For more detailed assistance, please visit <a target="_blank" rel="noopener" href='https://support.google.com/youtube/troubleshooter/13572679?hl=en-GB&sjid=15082473677397114271-EU'>YouTube Help Center</a>
    </p>
    <nz-steps [nzCurrent]="currentStep">
      <nz-step nzTitle="Step 1"></nz-step>
      <nz-step nzTitle="Step 2"></nz-step>
      <nz-step nzTitle="Step 3"></nz-step>
      <nz-step nzTitle="Step 4"></nz-step>
      <nz-step nzTitle="Step 5"></nz-step>
    </nz-steps>
    <div class="steps-content">
      <img [src]="rectificationInstructionPicture" alt="Rectification Step Image"/>
      <p nz-typography>{{ rectificationInstructionText }}</p>
    </div>
    <div class="steps-action">
      <button nz-button nzType="default" (click)="previousStep()" [disabled]="currentStep <= 0">Previous</button>
      <button nz-button nzType="default" (click)="nextStep()" [disabled]="currentStep >= 4">Next</button>
    </div>
  </app-accordion>
</div>

Navigation Actions:

Previous Button: Moves to the previous step in the rectification process.

Next Button: Advances to the next step in the rectification process.
