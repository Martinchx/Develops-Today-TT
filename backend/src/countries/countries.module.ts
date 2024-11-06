import { Module } from '@nestjs/common';

import { CountriesController, CountriesService } from '.';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
