import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/add"
        element={
          <ProtectedRoute adminOnly>
            <AddMovie />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
