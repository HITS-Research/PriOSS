import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.less'],
  animations: [
    trigger('accordionAnimation', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AccordionComponent {
  @Input() title: string = '';
  triangleClass: string = 'collapsed';
  isOpen: boolean = true;

  toggleAccordion(): void {
    this.triangleClass = (this.triangleClass === 'collapsed') ? 'expanded' : 'collapsed';
    this.isOpen = !this.isOpen;
  }
}

