import { useEffect, useState } from "react";

import { db } from "../firebase";
import HeroParallaxImg from "./HeroParallaxImg";
import { nanoid } from "nanoid";
import { collection, getDocs } from "firebase/firestore";

function Hero() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getImages() {
      //get a snapshot of the entire heroImageData collection
      const querySnapshot = await getDocs(collection(db, "heroImageData"));

      querySnapshot.forEach((doc) => {
        //set images to be an array of these objects
        setImages((prevImages) => [
          ...prevImages,
          <HeroParallaxImg
            url={doc.data().photoURL}
            contentHead={doc.data().imageName}
            text={doc.data().imageText}
            key={nanoid()}
          />,
        ]);
      });
    }

    getImages();
  }, []);

  return (
    <div className="hero">
      {...images.sort((a, b) => (a.position > b.position ? 1 : -1))}
    </div>
  );
}

export default Hero;
