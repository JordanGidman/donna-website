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
        setImages((prevImages) => [...prevImages, doc.data()]);
      });
    }

    getImages();
  }, []);

  return (
    <div className="hero">
      {images.reverse().map((img) => {
        return (
          <HeroParallaxImg
            url={img.photoURL}
            contentHead={img.imageName}
            text={img.imageText}
            key={nanoid()}
          />
        );
      })}
    </div>
  );
}

export default Hero;
