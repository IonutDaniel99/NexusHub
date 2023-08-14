import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import RootPage from "./Root/RootPage.Jsx";
import Register from "./Root/Register/Register";
import { ConfigProvider, theme, Button, Card } from "antd";
import DashboardMain from "./Dashboard/DashboardMain";
import { useEffect } from "react";

function App() {
  const { darkAlgorithm } = theme;
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
      }}
    >
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardMain />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
