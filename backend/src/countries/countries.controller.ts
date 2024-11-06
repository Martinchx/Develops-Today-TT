import { Controller, Get, Param } from '@nestjs/common';

import { CountriesService } from '.';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  getCountries() {
    return this.countriesService.getCountries();
  }

  @Get(':code')
  getCountryInfo(@Param('code') code: string) {
    return this.countriesService.getCountryInfo(code);
  }
}
