import Navbar from "../components/Navbar";
import GalleryImage from "../components/GalleryImage";
import Footer from "../components/Footer";
import { nanoid } from "nanoid";
// import { getDownloadURL, listAll, ref } from "firebase/storage";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    async function getImages() {
      //get a snapshot of the entire heroImageData collection
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "galleryImageData"));

      querySnapshot.forEach((doc) => {
        //set images to be an array of these objects

        setImageUrls((prevImages) => [
          ...prevImages,
          <GalleryImage
            source={doc.data().photoURL}
            path={doc.data().path}
            key={nanoid()}
            setImageUrls={setImageUrls}
          />,
        ]);
      });
      setIsLoading(false);
    }

    getImages();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="gallery">
        <h1 className="gallery-title">Gallery</h1>
        <div className="gallery-images-container">
          {isLoading && <p>Loading</p>}
          {...imageUrls.sort((a, b) => {
            return a.position > b.position ? 1 : -1;
          })}
        </div>
      </section>
      )
      <Footer />
    </div>
  );
}

export default Gallery;
