import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let countryService: jasmine.SpyObj<CountryService>;

  beforeEach(async () => {
    const countryServiceSpy = jasmine.createSpyObj('CountryService', [
      'getAvailableCountries',
      'getNextHoliday',
      'searchCountries',
      'getRandomCountries',
    ]);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: CountryService, useValue: countryServiceSpy }],
    }).compileComponents();

    countryService = TestBed.inject(CountryService) as jasmine.SpyObj<CountryService>;

    countryService.getAvailableCountries.and.returnValue(of([]));
    countryService.getNextHoliday.and.returnValue(of([]));
    countryService.searchCountries.and.returnValue([]);
    countryService.getRandomCountries.and.returnValue([]);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
