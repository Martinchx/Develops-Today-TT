import { useState, useEffect } from "react";

import { envs, ErrorMessage, Loader } from "../../shared";
import { CountriesTable, Country, MainLayout } from "..";

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
            <CountriesTable countries={countries} />
          </div>
        </>
      )}
    </MainLayout>
  );
};
