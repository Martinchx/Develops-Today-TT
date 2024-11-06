export interface BorderDetail {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
}

export interface PopulationData {
  year: number;
  value: number;
}

export interface CountryDetail {
  borders: BorderDetail[];
  population: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationData[];
  };
  flag: string;
}
