// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Ml } from "./pages/Ml";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="container content">
        <Ml />
      </main>
      <Footer />
    </>
  );
}

export default App;
