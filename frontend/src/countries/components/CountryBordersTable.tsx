import { BorderDetail, CountryBorderItem } from "..";

interface Props {
  borders: BorderDetail[];
  handleNavigation: (countryCode: string) => void;
}

export const CountryBordersTable = ({ borders, handleNavigation }: Props) => {
  return (
    <div>
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
          {borders.map((border) => (
            <CountryBorderItem
              key={border.countryCode}
              border={border}
              handleNavigation={handleNavigation}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
