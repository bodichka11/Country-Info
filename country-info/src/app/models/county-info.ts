import { Border } from './border';

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  alternativeSpellings: string[];
  region: string;
  borders: Border[] | null;
}
