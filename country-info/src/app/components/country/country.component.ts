import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CountryInfo } from '../../models/county-info';
import { Holiday } from '../../models/holiday';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private countryService = inject(CountryService);

  countryCode = '';
  countryInfo: CountryInfo | null = null;
  holidays: Holiday[] = [];
  selectedYear: number = new Date().getFullYear();
  availableYears: number[] = [];
  loadingHolidays = false;
  private destroy$ = new Subject<void>();

  constructor() {
    for (let year = 2020; year <= 2030; year++) {
      this.availableYears.push(year);
    }
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.countryCode = params['code'];
      if (this.countryCode) {
        this.loadCountryInfo();
        this.loadHolidays();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCountryInfo() {
    this.countryService.getCountryInfo(this.countryCode).subscribe({
      next: (info) => {
        this.countryInfo = info;
      },
      error: (error) => {
        console.error('Error loading country info:', error);
      },
    });
  }

  private loadHolidays() {
    this.loadingHolidays = true;
    this.countryService.getHolidays(this.countryCode, this.selectedYear).subscribe({
      next: (holidays) => {
        this.holidays = holidays.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        this.loadingHolidays = false;
      },
      error: (error) => {
        console.error('Error loading holidays:', error);
        this.holidays = [];
        this.loadingHolidays = false;
      },
    });
  }

  selectYear(year: number) {
    this.selectedYear = year;
    this.loadHolidays();
  }

  navigateToCountry(countryCode: string) {
    this.router.navigate(['/country', countryCode]);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
