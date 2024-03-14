import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { JourneyService } from './journey.service';
import { DataState } from '../../store/reducersRedux/reducers';

describe('JourneyService', () => {
  let service: JourneyService;
  let httpMock: HttpTestingController;
  let store: Store<DataState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [JourneyService]
    });
    service = TestBed.inject(JourneyService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});