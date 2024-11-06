import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

import { envs } from '../config';
import { Country, CountryInfo, FlagData, PopulationData } from '.';

@Injectable()
export class CountriesService {
  async getCountries() {
    const availableCountries = await this.fetchAvailableCountries();
    return availableCountries;
  }

  async getCountryInfo(code: string) {
    const bordersData = await this.fetchCountryBorders(code);
    const commonName = bordersData.commonName;

    const [populationData, flagData] = await Promise.all([
      this.fetchCountryPopulation(commonName),
      this.fetchCountryFlag(commonName),
    ]);

    return {
      borders: bordersData.borders,
      population: populationData.data,
      flag: flagData.data.flag,
    };
  }

  private async fetchAvailableCountries(): Promise<Country[]> {
    try {
      const response = await axios.get<Country[]>(`${envs.DATE_NAGER_API_BASE_URL}/AvailableCountries`);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error, 'Error fetching available countries data');
    }
  }

  private async fetchCountryBorders(code: string): Promise<CountryInfo> {
    try {
      const response = await axios.get<CountryInfo>(`${envs.DATE_NAGER_API_BASE_URL}/CountryInfo/${code}`);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error, 'Error fetching country borders data');
    }
  }

  private async fetchCountryPopulation(country: string): Promise<PopulationData> {
    try {
      const response = await axios.post<PopulationData>(`${envs.COUNTRIES_NOW_API_BASE_URL}/countries/population`, {
        country,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error, 'Error fetching country population data');
    }
  }

  private async fetchCountryFlag(country: string): Promise<FlagData> {
    try {
      const response = await axios.post<FlagData>(`${envs.COUNTRIES_NOW_API_BASE_URL}/countries/flag/images`, {
        country,
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error, 'Error fetching country flag data');
    }
  }

  private handleAxiosError(error: any, message: string): never {
    const status = error.response?.status;
    const data = error.response?.data;
    const url = error.config?.url;
    const method = error.config?.method;

    console.error({ message: error.message, status, data, url, method });

    throw new InternalServerErrorException(message);
  }
}
