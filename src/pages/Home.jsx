import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import Admin from "./Admin";

function Home() {
  return (
    <div className="home">
      <Navbar />

      <Hero />
      <Footer />
    </div>
  );
}

export default Home;
