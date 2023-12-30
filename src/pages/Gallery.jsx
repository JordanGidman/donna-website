import Navbar from "../components/Navbar";
import GalleryImage from "../components/GalleryImage";
import Footer from "../components/Footer";
import { nanoid } from "nanoid";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";
import { useEffect, useState } from "react";

function Gallery() {
  const [imageUrls, setImageUrls] = useState([]);
  console.log(imageUrls);

  useEffect(() => {
    const storageRef = ref(storage, "galleryImages/");

    //list all items in the folder
    listAll(storageRef).then((result) => {
      //then get all the download URL's

      const promises = result.items.map((item) => {
        console.log(item.fullPath);
        return getDownloadURL(item);
      });

      const paths = result.items.map((item) => {
        return item.fullPath;
      });

      Promise.all(promises).then((urls) => {
        const imageObjects = urls.map((url, i) => {
          return {
            [paths[i]]: url,
          };
        });
        setImageUrls(imageObjects);
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
            console.log(Object.keys(img)[0]);
            return (
              <GalleryImage
                source={Object.values(img)[0]}
                path={Object.keys(img)[0]}
                key={nanoid()}
                setImageUrls={setImageUrls}
              />
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Gallery;
