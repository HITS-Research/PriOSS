import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeMessageComponent } from './welcome.component';
import { By } from '@angular/platform-browser';

describe('WelcomeMessageComponent', () => {
  let component: WelcomeMessageComponent;
  let fixture: ComponentFixture<WelcomeMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct platform in the header for Facebook', () => {
    component.platform = 'Facebook';
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Welcome to the Facebook Dashboard!');
  });

  it('should display the correct platform in the header for Instagram', () => {
    component.platform = 'Instagram';
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Welcome to the Instagram Dashboard!');
  });

  it('should display the correct platform in the header for Spotify', () => {
    component.platform = 'Spotify';
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.textContent).toContain('Welcome to the Spotify Dashboard!');
  });

  it('should display the default description', () => {
    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toBe('Explore your uploaded data on this page. To see a more detailed view about your data, click on the "Explore" button on each card. Your data, your control.');
  });

  it('should display the correct custom description', () => {
    component.description = 'Custom description for testing.';
    fixture.detectChanges();
    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toBe('Custom description for testing.');
  });

  it('should render the list items correctly', () => {
    const listItems = fixture.debugElement.queryAll(By.css('ul li'));
    expect(listItems.length).toBe(4);
    expect(listItems[0].nativeElement.textContent).toContain('Visualization:');
    expect(listItems[1].nativeElement.textContent).toContain('Rectification:');
    expect(listItems[2].nativeElement.textContent).toContain('Privacy Recommendations:');
    expect(listItems[3].nativeElement.textContent).toContain('Purposes:');
  });
});
