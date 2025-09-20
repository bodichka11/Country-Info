import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryComponent } from './country.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CountryInfo } from '../../models/county-info';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let countryService: jasmine.SpyObj<CountryService>;

  const mockCountryInfo: CountryInfo = {
    commonName: 'Ukraine',
    officialName: 'Ukraine',
    countryCode: 'UA',
    region: 'Europe',
    borders: [],
    alternativeSpellings: [],
  };

  beforeEach(async () => {
    const countryServiceSpy = jasmine.createSpyObj('CountryService', [
      'getCountryInfo',
      'getHolidays',
    ]);

    await TestBed.configureTestingModule({
      imports: [CountryComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ code: 'UA' }),
            snapshot: { params: { code: 'UA' } },
          },
        },
      ],
    }).compileComponents();

    countryService = TestBed.inject(CountryService) as jasmine.SpyObj<CountryService>;

    countryService.getCountryInfo.and.returnValue(of(mockCountryInfo));
    countryService.getHolidays.and.returnValue(of([]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
