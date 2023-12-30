import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import _PRIVATE, { storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

function GalleryImage({ source, path, setImageUrls }) {
  const { currentUser } = useContext(AuthContext);

  const deleteRef = ref(storage, path);

  function deleteImage() {
    deleteObject(deleteRef)
      .then(() => {
        setImageUrls((prevImgs) =>
          prevImgs.filter((img) => {
            console.log(img);
            return path !== Object.keys(img)[0];
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="gallery-card">
      <img src={source} className="gallery-img" alt="" />
      {currentUser.uid === _PRIVATE && (
        <button className="delete-btn" onClick={deleteImage}>
          Delete
        </button>
      )}
    </div>
  );
}

export default GalleryImage;
