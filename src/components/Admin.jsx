import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

function Admin({ setShowAdmin }) {
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target[3].files);
    const heroName = e.target[0].value;
    const heroFile = e.target[1].files[0];
    const galleryName = e.target[2].value;
    const galleryFile = e.target[3].files[0];
    // const
    // console.log(heroFile);

    // if (heroFile === "") return;

    try {
      const heroRef = ref(storage, "heroImages/" + heroName);
      const galleryRef = ref(storage, "galleryImages/" + galleryName);
      uploadBytesResumable(heroRef, heroFile);
      uploadBytesResumable(galleryRef, galleryFile);
      setShowAdmin(false);
    } catch (err) {
      console.log(err);
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
        <label htmlFor="file" className="form-add-image-label">
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

        <button className="btn-admin-submit" type="submit">
          Upload
        </button>
      </form>
      <button className="btn-close-admin" onClick={() => setShowAdmin(false)}>
        <ion-icon name="close-outline" size="large"></ion-icon>
      </button>
    </div>
  );
}

export default Admin;
