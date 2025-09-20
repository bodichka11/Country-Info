import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../models/country';
import { Holiday } from '../models/holiday';
import { CountryInfo } from '../models/county-info';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly baseUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);

  getAvailableCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/AvailableCountries`).pipe(
      catchError((error) => {
        console.error('Error fetching countries:', error);
        return of([]);
      }),
    );
  }

  getHolidays(countryCode: string, year: number): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.baseUrl}/PublicHolidays/${year}/${countryCode}`).pipe(
      catchError((error) => {
        console.error('Error fetching holidays:', error);
        return of([]);
      }),
    );
  }

  getNextHoliday(countryCode: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.baseUrl}/NextPublicHolidays/${countryCode}`).pipe(
      catchError((error) => {
        console.error('Error fetching next holiday:', error);
        return of([]);
      }),
    );
  }

  getCountryInfo(countryCode: string): Observable<CountryInfo> {
    return this.http.get<CountryInfo>(`${this.baseUrl}/CountryInfo/${countryCode}`).pipe(
      catchError((error) => {
        console.error('Error fetching country info:', error);
        return of({} as CountryInfo);
      }),
    );
  }

  searchCountries(countries: Country[], searchTerm: string): Country[] {
    if (!searchTerm.trim()) {
      return countries;
    }

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.countryCode.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  getRandomCountries(countries: Country[], count = 3): Country[] {
    const shuffled = [...countries].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
