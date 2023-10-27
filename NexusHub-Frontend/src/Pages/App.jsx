import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "./Root/RootPage.Jsx";
import Register from "./Root/Register/Register";
import { ConfigProvider, theme } from "antd";
import DashboardMain from "./Dashboard/DashboardMain";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

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
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardMain />} />
            {/* <Route path="/xyz" element={<XYZ />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
