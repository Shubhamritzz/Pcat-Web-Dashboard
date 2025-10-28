
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayou from "./components/MainLayou";
import Das from "./Pages/das";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
    path="/"
    element={
      <ProtectedRoute>
        <MainLayou />
      </ProtectedRoute>
    }
  >
    <Route index element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="das" element={<Das />} />
    
  </Route>
    </Routes>
  );
}

export default App;
