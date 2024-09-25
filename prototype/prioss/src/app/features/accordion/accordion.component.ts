import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

/**
 * @description
 * AccordionComponent is an Angular component that implements an expandable/collapsible accordion.
 * It uses Angular animations to provide smooth transitions when opening and closing the accordion.
 *
 * @example
 * <app-accordion [title]="'Accordion Title'"></app-accordion>
 */
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.less'],
  standalone: true,
  animations: [
    trigger('accordionAnimation', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AccordionComponent {
  @Input() accordionTitle: string = '';
  triangleClass: string = 'collapsed';

  /**
   * @description
   * Indicates whether the accordion is currently open (expanded) or closed (collapsed).
   * @default true
   */
  isOpen: boolean = true;

  /**
   * @description
   * Toggles the accordion's state between expanded and collapsed.
   * This method updates both the triangleClass and isOpen properties.
   */
  toggleAccordion(): void {
    this.triangleClass =
      this.triangleClass === 'collapsed' ? 'expanded' : 'collapsed';
    this.isOpen = !this.isOpen;
  }
}