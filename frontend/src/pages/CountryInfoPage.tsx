import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { envs } from "../helpers";
import { CountryDetail } from "../interfaces";
import { PopulationChart } from "../components";

export const CountryInfoPage = () => {
  const navigate = useNavigate();

  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${envs.BACKEND_URL}/countries/${code}`)
      .then((response) => response.json())
      .then((data) => setCountry(data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [code]);

  const handleRowClick = (newCountryCode: string) => {
    navigate(`/country/${newCountryCode}`);
    setIsLoading(true);
    setError(null);
  };

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
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center">
      {country && (
        <>
          <h2 className="text-4xl font-bold mb-4">
            {country.population.country}
          </h2>
          <img
            src={country.flag}
            alt={`${country.population.country} flag`}
            className="w-32 mb-8"
          />

          <h3 className="text-2xl font-semibold mt-6 mb-2">Border Countries</h3>
          <table className="w-full max-w-lg text-left border border-gray-700 mt-4">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-700">Common Name</th>
                <th className="p-2 border-b border-gray-700">Official Name</th>
                <th className="p-2 border-b border-gray-700">Country Code</th>
                <th className="p-2 border-b border-gray-700">Region</th>
              </tr>
            </thead>
            <tbody>
              {country.borders.map((border) => (
                <tr
                  key={border.countryCode}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(border.countryCode)}
                >
                  <td className="p-2 border-b border-gray-700">
                    <Link
                      to={`/country/${border.countryCode}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {border.commonName}
                    </Link>
                  </td>
                  <td className="p-2 border-b border-gray-700">
                    {border.officialName}
                  </td>
                  <td className="p-2 border-b border-gray-700">
                    {border.countryCode}
                  </td>
                  <td className="p-2 border-b border-gray-700">
                    {border.region}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {<PopulationChart country={country} />}
        </>
      )}
    </div>
  );
};
