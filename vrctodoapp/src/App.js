import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import FallBackPage from './pages/FallBackPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<FallBackPage />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
