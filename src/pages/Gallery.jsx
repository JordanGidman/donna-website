import Navbar from "../components/Navbar";
import GalleryImage from "../components/GalleryImage";
import Footer from "../components/Footer";
import { nanoid } from "nanoid";
// import { getDownloadURL, listAll, ref } from "firebase/storage";
import { db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

//need a way to order the images from a given value
//lets say we save the images to a database as well as storage similar to the hero image
//then we can access the download url and the position from there and order using it
//issue #1 we would need to update every single image's position at or after the postion
//the new image was given.

function Gallery() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    async function getImages() {
      //get a snapshot of the entire heroImageData collection
      const querySnapshot = await getDocs(collection(db, "galleryImageData"));

      querySnapshot.forEach((doc) => {
        //set images to be an array of these objects
        setImageUrls((prevImages) => [...prevImages, doc.data()]);
      });
    }

    getImages();
  }, []);

  // useEffect(() => {
  //   const storageRef = ref(storage, "galleryImages/");

  //   //list all items in the folder
  //   listAll(storageRef).then((result) => {
  //     //then get all the download URL's
  //     const promises = result.items.map((item) => {
  //       return getDownloadURL(item);
  //     });

  //     const paths = result.items.map((item) => {
  //       console.log(item.name);
  //       return item.fullPath;
  //     });

  //     const names = result.items.map((item) => {
  //       console.log(item);
  //       return item.fullPath.split("/")[1];
  //     });

  //     const positions = names.map((name) => {
  //       return getDoc(doc(db, "galleryImageData", name)).data().position;
  //     });

  //     Promise.all([promises, positions]).then((urls) => {
  //       console.log(urls);
  //       const imageObjects = urls[0].map((url, i) => {
  //         return {
  //           path: paths[i],
  //           photoURL: url,
  //           pos: urls[1][i],
  //         };
  //       });
  //       setImageUrls(imageObjects);
  //     });
  //   });
  // }, []);

  return (
    <div>
      <Navbar />
      <section className="gallery">
        <h1 className="gallery-title">Gallery</h1>
        <div className="gallery-images-container">
          {imageUrls
            .sort((a, b) => {
              return a.position > b.position ? 1 : -1;
            })
            .map((img) => {
              return (
                <GalleryImage
                  source={img.photoURL}
                  path={img.path}
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
