import { useState, useEffect } from "react";

import { envs, ErrorMessage, Loader } from "../../shared";
import { Country, CountryItem, MainLayout } from "..";

export const CountriesPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${envs.BACKEND_URL}/countries`)
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching data");
        return response.json();
      })
      .then((data) => setCountries(data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (error) return <ErrorMessage error={error} />;

  return (
    <MainLayout>
      {isLoading && <Loader />}
      {countries.length > 0 && (
        <>
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
                  <CountryItem key={country.countryCode} country={country} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </MainLayout>
  );
};
