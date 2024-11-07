import { MainLayout } from "../../countries";

interface Props {
  error: string;
}

export const ErrorMessage = ({ error }: Props) => {
  return (
    <MainLayout>
      <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
        Error: {error}
      </div>
    </MainLayout>
  );
};
