import Navbar from "../components/Navbar";
import GalleryImage from "../components/GalleryImage";
import Footer from "../components/Footer";
import { nanoid } from "nanoid";
// import { getDownloadURL, listAll, ref } from "firebase/storage";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  // useEffect(() => {
  //   async function getImages() {
  //     //get a snapshot of the entire heroImageData collection
  //     setIsLoading(true);
  //     const querySnapshot = await getDocs(collection(db, "galleryImageData"));

  //     querySnapshot.forEach((doc) => {
  //       //set images to be an array of these objects

  //       setImageUrls((prevImages) => [
  //         ...prevImages,
  //         <GalleryImage
  //           source={doc.data().photoURL}
  //           path={doc.data().path}
  //           key={nanoid()}
  //           setImageUrls={setImageUrls}
  //         />,
  //       ]);
  //     });
  //     setIsLoading(false);
  //   }

  //   getImages();
  // }, []);

  useEffect(() => {
    //get a live snapshot of the data
    const unsubscribe = onSnapshot(
      collection(db, "galleryImageData"),
      (snapshot) => {
        const updatedImages = snapshot.docs
          .sort((a, b) => (a.data().position > b.data().position ? 1 : -1))
          .map((doc) => (
            <GalleryImage
              source={doc.data().photoURL}
              path={doc.data().path}
              key={nanoid()}
              setImageUrls={setImageUrls}
            />
          ));

        setImageUrls(updatedImages);
        setIsLoading(false);
      }
    );

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="gallery-container">
        <section className="gallery">
          <h1 className="gallery-title">Gallery</h1>
          <div className="gallery-images-container">
            {isLoading && <p className="loading">Loading</p>}
            {...imageUrls}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Gallery;
