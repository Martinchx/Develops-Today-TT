export interface FlagData {
  error: boolean;
  msg: string;
  data: Data;
}

export interface Data {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}
