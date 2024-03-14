import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Journey } from '../../models/journey,model';
import { JourneyService } from '../../services/journey/journey.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let journeyService: jasmine.SpyObj<JourneyService>;

  beforeEach(async () => {
    const journeyServiceSpy = jasmine.createSpyObj('JourneyService', ['getData']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DashboardComponent],
      providers: [{ provide: JourneyService, useValue: journeyServiceSpy }]
    })
      .compileComponents();

    journeyService = TestBed.inject(JourneyService) as jasmine.SpyObj<JourneyService>;
    journeyService.getData.and.returnValue(of(new Journey()));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call journey service on search', () => {
    component.formSearch.setValue({ origin: 'ABC', destination: 'XYZ' });

    component.searchJourney();

    expect(journeyService.getData).toHaveBeenCalledWith('ABC', 'XYZ');
  });

  it('should handle successful journey data retrieval', () => {
    const testData = new Journey();
    journeyService.getData.and.returnValue(of(testData));
    component.formSearch.setValue({ origin: 'ABC', destination: 'XYZ' });

    component.searchJourney();

    expect(component.journey).toEqual(testData);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error during journey data retrieval', () => {
    const testError = 'Test error';
    journeyService.getData.and.returnValue(throwError({ error: testError }));
    component.formSearch.setValue({ origin: 'ABC', destination: 'XYZ' });

    component.searchJourney();

    expect(component.journey).toEqual(new Journey());
    expect(component.isLoading).toBeFalse();
    expect(component.errorJourney).toEqual(testError);
  });

  it('should validate input fields correctly', () => {
    component.formSearch.setValue({ origin: 'AB', destination: 'XYZ' });

    component.validateInput();

    expect(component.messageErrors.origin).toEqual('The origin must have exactly 3 letters');
    expect(component.messageErrors.destination).toEqual('');
  });

  it('should open and close error modal', () => {
    component.openModal();
    expect(component.modalError.nativeElement.style.display).toEqual('block');

    component.closeModal();
    expect(component.modalError.nativeElement.style.display).toEqual('none');
  });
});
