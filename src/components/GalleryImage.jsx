import { Parallax } from "react-parallax";

function GalleryImage({ source }) {
  return (
    <div className="gallery-card">
      <img src={source} className="gallery-img" alt="" />
    </div>
  );
}

export default GalleryImage;
