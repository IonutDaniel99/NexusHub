import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "./Root/RootPage.Jsx";
import Register from "./Root/Register/Register";
import DashboardMain from "./Dashboard/DashboardMain";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
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
  );
}

export default App;
