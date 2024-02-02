import { Parallax } from "react-parallax";
import ButtonCta from "./ButtonCta";
import LazyLoad from "react-lazy-load";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function HeroParallaxImg({ url, contentHead, text, lazy, path, deleteImage }) {
  const { currentUser } = useContext(AuthContext);

  console.log(path);

  return (
    <LazyLoad offset={200}>
      <Parallax
        strength={400}
        bgImage={url}
        bgImageAlt={"Not Found"}
        className="parallax"
        bgImageStyle={{
          filter: "brightness(70%)",
          height: "100vh",
          width: "100vw",
          objectFit: "cover",
        }}
        lazy={lazy}
        bgClassName="parallax-img"
      >
        <div className="parallax-content">
          <div className="parallax-text-content">
            <h2 className="parallax-title">{contentHead}</h2>
            <p className="parallax-text">{text}</p>
            <div className="hero-img-btns">
              <ButtonCta />
              {currentUser.uid === "TPrNEyUfJsTLnxqVulhlAKrPfBF2" && (
                <button
                  className="parallax-cta-btn"
                  onClick={() => deleteImage(path)}
                >
                  DELETE
                </button>
              )}
            </div>
          </div>
        </div>
      </Parallax>
    </LazyLoad>
  );
}

export default HeroParallaxImg;
