
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayou from "./components/MainLayou";
// import Das from "./Pages/das";
import Navbar from "./Pages/Navbar";
import { Das } from "./Pages/Das";



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
    <Route index element={<Navigate to="/navbar" replace />} />
    <Route path="/navbar" element={<Navbar />} />
    <Route path="/das" element={<Das />} />
    <Route path="/dashboard" element={<Dashboard />} />
    
  </Route>
    </Routes>
  );
}

export default App;
