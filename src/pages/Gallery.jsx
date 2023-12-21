import Navbar from "../components/Navbar";
import GalleryImage from "../components/GalleryImage";
import Footer from "../components/Footer";
import { nanoid } from "nanoid";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";
import { useEffect, useState } from "react";

//temp until i pull the images from cloud storage
// const images = [
//   `https://www.nois7.com/cdn/shop/files/PolarBearAurora_wide.jpg?crop=center&v=1697548203&width=1600`,
//   `https://www.nois7.com/cdn/shop/files/HeavenReflection.jpg?crop=center&v=1697548203&width=1600`,
//   `https://www.nois7.com/cdn/shop/files/VeniceLanterns.jpg?crop=center&v=1697548203&width=1600`,
//   `https://www.nois7.com/cdn/shop/files/Nois7_EnchantedVenice_AdobeRGB.jpg?crop=center&v=1697548203&width=1600`,
//   `https://www.nois7.com/cdn/shop/files/centralparkpenugins2.jpg?crop=center&v=1697548203&width=1600`,
//   `https://www.nois7.com/cdn/shop/files/PolarBearAurora_wide.jpg?crop=center&v=1697548203&width=1600`,
//   `https://www.nois7.com/cdn/shop/files/HeavenReflection.jpg?crop=center&v=1697548203&width=1600`,
//   `https://www.nois7.com/cdn/shop/files/VeniceLanterns.jpg?crop=center&v=1697548203&width=1600`,
//   `https://www.nois7.com/cdn/shop/files/Nois7_EnchantedVenice_AdobeRGB.jpg?crop=center&v=1697548203&width=1600`,
//   `https://www.nois7.com/cdn/shop/files/centralparkpenugins2.jpg?crop=center&v=1697548203&width=1600`,
// ];

function Gallery() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const storageRef = ref(storage, "galleryImages/");

    // List all items in the folder
    listAll(storageRef).then((result) => {
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
