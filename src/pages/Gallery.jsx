import Navbar from "../components/Navbar";
import GalleryImage from "../components/GalleryImage";
import Footer from "../components/Footer";
import { nanoid } from "nanoid";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";
import { useEffect, useState } from "react";

function Gallery() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const storageRef = ref(storage, "galleryImages/");

    //list all items in the folder
    listAll(storageRef).then((result) => {
      //then get all the download URL's
      const promises = result.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImageUrls(urls);
      });
    });
  }, []);

  return (
    <div>
      <Navbar />
      <section className="gallery">
        <h1 className="gallery-title">Gallery</h1>
        <div className="gallery-images-container">
          {imageUrls.map((img) => {
            return <GalleryImage source={img} key={nanoid()} />;
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Gallery;
