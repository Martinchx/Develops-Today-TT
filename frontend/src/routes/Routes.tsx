import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { CountriesPage, CountryInfoPage } from "../countries";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/countries" replace />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/country/:code" element={<CountryInfoPage />} />
      </Routes>
    </Router>
  );
};
