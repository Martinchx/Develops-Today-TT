import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { envs } from "../helpers";

export interface Country {
  countryCode: string;
  name: string;
}

export const CountriesPage = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${envs.BACKEND_URL}/countries`)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="p-8 bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center">
        <div className="text-center">
          <p className="text-xl">Loading country data...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-8 bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center">
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          Error: {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Country List</h1>
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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
                <tr
                  key={country.countryCode}
                  className="hover:bg-gray-700 cursor-pointer"
                  onClick={() => navigate(`/country/${country.countryCode}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-blue-400 hover:text-blue-300 transition-colors">
                    {country.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {country.countryCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
