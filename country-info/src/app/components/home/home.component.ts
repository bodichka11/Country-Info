import { Component, inject, OnInit } from '@angular/core';
import { Country } from '../../models/country';
import { Holiday } from '../../models/holiday';
import { CountryService } from '../../services/country.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private countryService = inject(CountryService);
  private router = inject(Router);

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm = '';
  randomCountriesData: { country: Country; nextHoliday: Holiday | null }[] = [];
  loading = false;

  ngOnInit() {
    this.loadCountries();
  }

  private loadCountries() {
    this.countryService.getAvailableCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.filteredCountries = countries;
        this.loadRandomCountries();
      },
      error: (error) => {
        console.error('Error loading countries:', error);
      },
    });
  }

  onSearch() {
    this.filteredCountries = this.countryService.searchCountries(this.countries, this.searchTerm);
  }

  navigateToCountry(countryCode: string) {
    this.router.navigate(['/country', countryCode]);
  }

  loadRandomCountries() {
    if (this.countries.length === 0) return;

    this.loading = true;
    this.randomCountriesData = [];

    const randomCountries = this.countryService.getRandomCountries(this.countries, 3);
    let loadedCount = 0;

    randomCountries.forEach((country) => {
      this.countryService.getNextHoliday(country.countryCode).subscribe({
        next: (holidays) => {
          this.randomCountriesData.push({
            country: country,
            nextHoliday: holidays.length > 0 ? holidays[0] : null,
          });
          loadedCount++;
          if (loadedCount === randomCountries.length) {
            this.loading = false;
          }
        },
        error: (error) => {
          console.error(`Error loading holiday for ${country.name}:`, error);
          this.randomCountriesData.push({
            country: country,
            nextHoliday: null,
          });
          loadedCount++;
          if (loadedCount === randomCountries.length) {
            this.loading = false;
          }
        },
      });
    });
  }
}
