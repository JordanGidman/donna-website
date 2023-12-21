import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import Admin from "./Admin";

function Home() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="home">
      {showAdmin ? (
        <Admin setShowAdmin={setShowAdmin} />
      ) : (
        <>
          <Navbar setShowAdmin={setShowAdmin} />
          <Hero />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;
