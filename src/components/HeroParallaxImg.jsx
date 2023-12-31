import { Parallax } from "react-parallax";
import ButtonCta from "./ButtonCta";

function HeroParallaxImg({ url, contentHead, text }) {
  return (
    <Parallax
      strength={400}
      bgImage={url}
      bgClassName="parallax-img"
      className="parallax"
      bgImageStyle={{
        filter: "brightness(80%)",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="parallax-content">
        <div className="parallax-text-content">
          <h2 className="parallax-title">{contentHead}</h2>
          <p className="parallax-text">{text}</p>
          <ButtonCta />
        </div>
      </div>
    </Parallax>
  );
}

export default HeroParallaxImg;
