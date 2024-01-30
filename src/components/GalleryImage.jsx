import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import "react-lazy-load-image-component/src/effects/blur.css";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { LazyLoadImage } from "react-lazy-load-image-component";

function GalleryImage({ source, path, setImageUrls }) {
  const { currentUser } = useContext(AuthContext);

  const deleteRef = ref(storage, path);

  async function deleteImage() {
    // delete the image from storage + state
    await deleteObject(deleteRef)
      .then(() => {
        setImageUrls((prevImgs) =>
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
    const galleryPos = (await getDoc(doc(db, "galleryImageData", name))).data()
      .position;

    //delete the selected document
    await deleteDoc(doc(db, "galleryImageData", name));

    //get all other images that have > or == position as galleryPos
    const q = query(
      collection(db, "galleryImageData"),
      where("position", ">=", galleryPos)
    );
    const querySnapshot = await getDocs(q);

    //update all other image positions
    querySnapshot.forEach(async (document) => {
      console.log(document.data());
      await updateDoc(doc(db, "galleryImageData", document.data().imageName), {
        position: Number(document.data().position) - 1,
      });
    });
  }

  return (
    <div className="gallery-card">
      <LazyLoadImage
        src={source}
        className="gallery-img lazy-load"
        alt=""
        effect="blur"
      />

      {currentUser?.uid === "TPrNEyUfJsTLnxqVulhlAKrPfBF2" && (
        <button className="gallery-delete-btn" onClick={deleteImage}>
          Delete
        </button>
      )}
    </div>
  );
}

export default GalleryImage;
