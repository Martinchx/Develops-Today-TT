import { BorderDetail } from "..";

interface Props {
  border: BorderDetail;
}

export const CountryBorderItem = ({ border }: Props) => {
  return (
    <tr key={border.countryCode} className="cursor-pointer">
      <td className="p-2 border-b border-gray-700">{border.commonName}</td>
      <td className="p-2 border-b border-gray-700">{border.officialName}</td>
      <td className="p-2 border-b border-gray-700">{border.countryCode}</td>
      <td className="p-2 border-b border-gray-700">{border.region}</td>
    </tr>
  );
};
