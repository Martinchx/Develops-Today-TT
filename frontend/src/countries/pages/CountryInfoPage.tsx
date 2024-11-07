import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { envs, ErrorMessage, Loader } from "../../shared";
import {
  CountryBordersTable,
  CountryDetail,
  MainLayout,
  PopulationChart,
} from "..";

export const CountryInfoPage = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();

  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${envs.BACKEND_URL}/countries/${code}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching data");
        return response.json();
      })
      .then((data) => setCountry(data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [code]);

  const handleNavigation = (countryCode: string) => {
    navigate(`/country/${countryCode}`);
    setCountry(null);
    setIsLoading(true);
  };

  if (error) return <ErrorMessage error={error} />;

  return (
    <MainLayout>
      {isLoading && <Loader />}
      {country && (
        <>
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold m-4">
              {country.population.country}
            </h2>
            <img
              src={country.flag}
              alt={`${country.population.country} flag`}
              className="w-32 mb-8"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-20">
            <CountryBordersTable
              borders={country.borders}
              handleNavigation={handleNavigation}
            />
            <PopulationChart country={country} />
          </div>
        </>
      )}
    </MainLayout>
  );
};
