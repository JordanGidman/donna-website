import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import Admin from "../components/Admin";

function Home() {
  const [showAdmin, setShowAdmin] = useState(true);

  return (
    <div className="home">
      {showAdmin ? (
        <Admin setShowAdmin={setShowAdmin} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;
