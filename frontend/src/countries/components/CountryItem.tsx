import { useNavigate } from "react-router-dom";

import { Country } from "..";

interface Props {
  country: Country;
}

export const CountryItem = ({ country }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <tr
        className="hover:bg-gray-700 cursor-pointer"
        onClick={() => navigate(`/country/${country.countryCode}`)}
      >
        <td className="px-6 py-4 whitespace-nowrap text-blue-400 hover:text-blue-300 transition-colors">
          {country.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{country.countryCode}</td>
      </tr>
    </>
  );
};
