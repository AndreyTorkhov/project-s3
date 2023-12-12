import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Ml from "./pages/Ml";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Router basename="/">
        <Header />
        <main className="container content">
          <Routes>
            <Route path="/" element={<Ml />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
