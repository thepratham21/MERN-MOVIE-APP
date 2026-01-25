import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>

    <Navbar />
    
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
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

      <Route
        path="/admin/movies/edit/:id"
        element={
          <ProtectedRoute adminOnly>
            <EditMovie />
          </ProtectedRoute>
        }
      />
    </Routes>
    
    
    
    </>
    
  );
}

export default App;
