import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/blogs" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
