import { Route, Routes } from "react-router-dom";
import RankingPage from "../../pages/RankingPage";
import ExchangePage from "../../pages/ExchangePage";
import ActionPage from "../../pages/ActionPage";
import RegisterPage from "../../pages/RegisterPage";
const Router = () => {
  return (
    <Routes>
      <Route path="/exchange" element={<ExchangePage />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/action" element={<ActionPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default Router;
