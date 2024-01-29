import { useEffect, useState } from "react";

import { db } from "../firebase";
import HeroParallaxImg from "./HeroParallaxImg";
import { nanoid } from "nanoid";
import { collection, getDocs } from "firebase/firestore";

function Hero() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getImages() {
      setIsLoading(true);
      //get a snapshot of the entire heroImageData collection
      const querySnapshot = await getDocs(collection(db, "heroImageData"));

      querySnapshot.forEach((doc) => {
        //set images to be an array of these parallax components
        setImages((prevImages) => [
          ...prevImages,
          <HeroParallaxImg
            url={doc.data().photoURL}
            contentHead={doc.data().imageName}
            text={doc.data().imageText}
            key={nanoid()}
            lazy={doc.data().position === 1 ? false : true}
          />,
        ]);
      });
      setIsLoading(false);
    }

    getImages();
  }, []);

  return (
    <div className="hero">
      {/* {isLoading && <div className="hero-loading">Loading...</div>} */}
      <div className="hero-image-box">
        {...images.sort((a, b) => (a.position > b.position ? 1 : -1))}
      </div>
    </div>
  );
}

export default Hero;
