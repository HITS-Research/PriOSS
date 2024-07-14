import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DarkPatternsComponent } from './dark_patterns.component';
import { NzCarouselModule, NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';

describe('DarkPatternsComponent', () => {
  let component: DarkPatternsComponent;
  let fixture: ComponentFixture<DarkPatternsComponent>;
  let carouselDebugElement: DebugElement;
  let carouselComponent: NzCarouselComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzCarouselModule, CommonModule],
      declarations: [DarkPatternsComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkPatternsComponent);
    component = fixture.componentInstance;
    carouselDebugElement = fixture.debugElement.query(By.directive(NzCarouselComponent));
    carouselComponent = carouselDebugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial index set to 0', () => {
    expect(component.initialIndex).toBe(0);
  });

  it('should have steps defined', () => {
    expect(component.steps.length).toBe(6);
  });

  it('should call goToPrevious and navigate carousel', () => {
    spyOn(carouselComponent, 'pre');
    component.goToPrevious();
    expect(carouselComponent.pre).toHaveBeenCalled();
  });

  it('should call goToNext and navigate carousel', () => {
    spyOn(carouselComponent, 'next');
    component.goToNext();
    expect(carouselComponent.next).toHaveBeenCalled();
  });

  it('should disable previous button when active index is 0', () => {
    carouselComponent.activeIndex = 0;
    fixture.detectChanges();
    const prevButton = fixture.debugElement.query(By.css('.prev-btn')).nativeElement;
    expect(prevButton.disabled).toBeTruthy();
  });

  it('should disable next button when active index is last step', () => {
    carouselComponent.activeIndex = component.steps.length - 1;
    fixture.detectChanges();
    const nextButton = fixture.debugElement.query(By.css('.next-btn')).nativeElement;
    expect(nextButton.disabled).toBeTruthy();
  });
});
