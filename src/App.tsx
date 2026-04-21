import "./styles/globals.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./sections/Navbar/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About/About";
import Talents from "./sections/Talents/Talents";
import TalentDetail from "./sections/Talents/TalentDetail";
import Service from "./sections/Service/Services";
import Works from "./sections/Works/works";
import Clients from "./sections/Clients/Clients";
import Whyme from "./sections/Whyme/Whyme";
import Contact from "./sections/Contact/Contact";
import { useLayoutEffect } from "react";


function Home() {

  const location = useLocation();
  useLayoutEffect(() => {
    if (location.hash === "#talents") {
      const el = document.getElementById("talents");
      if (el) {
        el.scrollIntoView({ behavior: "auto" });
        window.history.replaceState(null, "", location.pathname);
      }
    }
  }, [location]);


  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Talents />
        <Service />
        <Works />
        <Clients />
        <Whyme />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talent/:id" element={<TalentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}