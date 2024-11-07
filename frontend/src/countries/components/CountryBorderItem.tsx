import { BorderDetail } from "..";

interface Props {
  border: BorderDetail;
  handleNavigation: (countryCode: string) => void;
}

export const CountryBorderItem = ({ border, handleNavigation }: Props) => {
  return (
    <tr
      key={border.countryCode}
      className="cursor-pointer hover:opacity-70"
      onClick={() => handleNavigation(border.countryCode)}
    >
      <td className="p-2 border-b border-gray-700">{border.commonName}</td>
      <td className="p-2 border-b border-gray-700">{border.officialName}</td>
      <td className="p-2 border-b border-gray-700">{border.countryCode}</td>
      <td className="p-2 border-b border-gray-700">{border.region}</td>
    </tr>
  );
};
