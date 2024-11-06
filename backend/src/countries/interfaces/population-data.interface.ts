export interface PopulationData {
  error: boolean;
  msg: string;
  data: Datum[];
}

export interface Datum {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCount[];
}

export interface PopulationCount {
  year: number;
  value: number;
}
