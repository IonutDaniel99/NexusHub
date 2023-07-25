
import { BrowserRouter, Route, Routes } from "react-router-dom"
import RootPage from "./Root/RootPage.Jsx"
import Register from "./Root/Register/Register"
import { ConfigProvider, theme, Button, Card } from "antd";

function App() {
  const { darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
      }}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<p>TBI</p>} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
