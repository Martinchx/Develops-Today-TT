import { Country, CountryItem } from "..";

interface Props {
  countries: Country[];
}

export const CountriesTable = ({ countries }: Props) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-700">
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Country Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Country Code
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-600">
        {countries.map((country) => (
          <CountryItem key={country.countryCode} country={country} />
        ))}
      </tbody>
    </table>
  );
};
