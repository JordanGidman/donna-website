import { useEffect, useState } from "react";

import { db, storage } from "../firebase";
import HeroParallaxImg from "./HeroParallaxImg";
import { nanoid } from "nanoid";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

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
          .map((doc) => {
            return (
              <HeroParallaxImg
                url={doc.data().photoURL}
                contentHead={doc.data().imageName}
                text={doc.data().imageText}
                key={nanoid()}
                lazy={doc.data().position === 1 ? false : true}
                deleteImage={deleteImage}
                path={doc.data().path}
              />
            );
          });

        setImages(updatedImages);
        setIsLoading(false);
      }
    );

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  async function deleteImage(path) {
    // delete the image from storage + state
    console.log(path);
    const deleteRef = ref(storage, path);
    await deleteObject(deleteRef)
      .then(() => {
        setImages((prevImgs) =>
          prevImgs.filter((img) => {
            //filter out the image the user chose to delete
            return path !== img.path;
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });

    //delete the imageData from db
    const name = path.split("/")[1];
    const galleryPos = (await getDoc(doc(db, "heroImageData", name))).data()
      .position;

    //delete the selected document
    await deleteDoc(doc(db, "heroImageData", name));

    //get all other images that have > or == position as galleryPos
    const q = query(
      collection(db, "heroImageData"),
      where("position", ">=", galleryPos)
    );
    const querySnapshot = await getDocs(q);

    //update all other image positions
    querySnapshot.forEach(async (document) => {
      console.log(document.data());
      await updateDoc(doc(db, "heroImageData", document.data().imageName), {
        position: Number(document.data().position) - 1,
      });
    });
  }

  return (
    <div className="hero">
      {isLoading && <div className="hero-loading">Loading...</div>}
      <div className="hero-image-box">{...images}</div>
    </div>
  );
}

export default Hero;
