import { useEffect, useState } from "react";

import { db } from "../firebase";
import HeroParallaxImg from "./HeroParallaxImg";
import { nanoid } from "nanoid";
import { collection, onSnapshot } from "firebase/firestore";

function Hero() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function getImages() {
  //     setIsLoading(true);

  //     try {
  //       const querySnapshot = await getDocs(collection(db, "heroImageData"));

  //       setImages((prevImages) => [
  //         ...prevImages,
  //         ...querySnapshot.docs
  //           .sort((a, b) => (a.data().position > b.data().position ? 1 : -1))
  //           .map((doc) => (
  //             <HeroParallaxImg
  //               url={doc.data().photoURL}
  //               contentHead={doc.data().imageName}
  //               text={doc.data().imageText}
  //               key={nanoid()}
  //               lazy={doc.data().position === 1 ? false : true}
  //             />
  //           )),
  //       ]);

  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //       setIsLoading(false);
  //     }
  //   }

  //   getImages();
  // }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "heroImageData"),
      (snapshot) => {
        const updatedImages = snapshot.docs
          .sort((a, b) => (a.data().position > b.data().position ? 1 : -1))
          .map((doc) => (
            <HeroParallaxImg
              url={doc.data().photoURL}
              contentHead={doc.data().imageName}
              text={doc.data().imageText}
              key={nanoid()}
              lazy={doc.data().position === 1 ? false : true}
            />
          ));

        setImages(updatedImages);
        setIsLoading(false);
      }
    );

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    <div className="hero">
      {isLoading && <div className="hero-loading">Loading...</div>}
      <div className="hero-image-box">{...images}</div>
    </div>
  );
}

export default Hero;
