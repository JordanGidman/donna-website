import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

function Admin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    //select all form values
    const heroName = e.target[0].value;
    const heroFile = e.target[1].files[0];
    const heroText = e.target[2].value;
    const galleryName = e.target[3].value;
    const galleryFile = e.target[4].files[0];
    const galleryPos = e.target[5].value;

    try {
      //upload images to cloud storage if all the data needed is given

      const heroRef = ref(storage, "heroImages/" + heroName);
      const galleryRef = ref(storage, "galleryImages/" + galleryName);
      const uploadTask =
        heroName &&
        heroFile &&
        heroText &&
        uploadBytesResumable(heroRef, heroFile);

      const uploadGalleryTask =
        galleryName &&
        galleryFile &&
        uploadBytesResumable(galleryRef, galleryFile);

      heroName &&
        heroFile &&
        heroText &&
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            //handle errors
            console.log(error);
          },
          () => {
            //after successful image upload get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                //save image data e.g name and message to a seperate database for access in the hero
                //I have the idea i could probably put this text in the metadata. But to me this feels more robust
                await setDoc(doc(db, "heroImageData", heroName), {
                  imageName: heroName,
                  imageText: heroText,
                  photoURL: downloadURL,
                });
              }
            );
          }
        );

      uploadGalleryTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          //after successful gallery upload get the downloadUrl
          getDownloadURL(uploadGalleryTask.snapshot.ref).then(
            async (downloadURL) => {
              //pull all imageData where the new position is equal or greater and shift by 1
              //this makes room for the new image
              const q = query(
                collection(db, "galleryImageData"),
                where("position", ">=", Number(galleryPos))
              );
              const querySnapshot = await getDocs(q);

              let isRoom = true;
              querySnapshot.forEach((document) => {
                if (document.data().position === galleryPos) isRoom = false;
              });

              //update all other image positions
              isRoom &&
                querySnapshot.forEach((document) => {
                  updateDoc(
                    doc(db, "galleryImageData", document.data().imageName),
                    {
                      position: document.data().position + 1,
                    }
                  );
                });

              //save the new image data to a database
              await setDoc(doc(db, "galleryImageData", galleryName), {
                imageName: galleryName,
                photoURL: downloadURL,
                position: Number(galleryPos),
                path: uploadGalleryTask.snapshot.metadata.fullPath,
              });
            }
          );
        }
      );

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="admin">
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-hero-name admin-input"
          placeholder="Homepage Image Name"
        ></input>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          className="input-hero admin-input"
        ></input>
        <label htmlFor="file" className={`form-add-image-label`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="upload-img-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span>Add a Homepage image</span>
        </label>
        <textarea
          type="textarea"
          className="input-gallery-text admin-input"
          placeholder="Enter the paragraph you want over the homepage image"
        ></textarea>
        <input
          type="text"
          className="input-gallery-name admin-input"
          placeholder="Gallery Image Name"
        ></input>
        <input
          type="file"
          id="file-gallery"
          style={{ display: "none" }}
          className="input-gallery admin-input"
        ></input>
        <label htmlFor="file-gallery" className="form-add-image-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="upload-img-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span>Add a Gallery image</span>
        </label>
        <input
          type="text"
          className="input-gallery-pos admin-input"
          placeholder="Gallery Image Position"
        ></input>
        {error && <span>Something went wrong...</span>}
        <button className="btn-admin-submit" type="submit" disabled={isLoading}>
          Upload
        </button>
      </form>
      <button className="btn-close-admin" onClick={() => navigate("/")}>
        <ion-icon name="close-outline" size="large"></ion-icon>
      </button>
    </div>
  );
}

export default Admin;
