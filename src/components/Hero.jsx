import { useEffect, useState } from "react";

import { db } from "../firebase";
import HeroParallaxImg from "./HeroParallaxImg";
import { nanoid } from "nanoid";
import { collection, getDocs } from "firebase/firestore";

function Hero() {
  // const imageURL = `https://www.nois7.com/cdn/shop/files/PolarBearAurora_wide.jpg?crop=center&v=1697548203&width=1600`;
  // const imageURL2 = `https://www.nois7.com/cdn/shop/files/HeavenReflection.jpg?crop=center&v=1697548203&width=1600`;
  // const imageURL3 = `https://www.nois7.com/cdn/shop/files/VeniceLanterns.jpg?crop=center&v=1697548203&width=1600`;
  // const imageURL4 = `https://www.nois7.com/cdn/shop/files/Nois7_EnchantedVenice_AdobeRGB.jpg?crop=center&v=1697548203&width=1600`;
  // const imageURL5 = `https://www.nois7.com/cdn/shop/files/centralparkpenugins2.jpg?crop=center&v=1697548203&width=1600`;
  // const imageURL4 = `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7a44568c-c496-43c2-8781-2c0a3b56cce7/d9mcpdj-ddce6188-0332-4bfe-bfd7-5dae55b86986.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdhNDQ1NjhjLWM0OTYtNDNjMi04NzgxLTJjMGEzYjU2Y2NlN1wvZDltY3Bkai1kZGNlNjE4OC0wMzMyLTRiZmUtYmZkNy01ZGFlNTViODY5ODYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.oekMSOhkKHwfiavYQkrdv-lbjjyb38UAZ6CFlB1lyfM`;

  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getImages() {
      const querySnapshot = await getDocs(collection(db, "heroImageData"));

      querySnapshot.forEach((doc) => {
        setImages((prevImages) => [...prevImages, doc.data()]);
      });
    }

    getImages();
  }, []);

  return (
    <div className="hero">
      {images.reverse().map((img) => {
        console.log(images);
        return (
          <HeroParallaxImg
            url={img.photoURL}
            contentHead={img.imageName}
            text={img.imageText}
            key={nanoid()}
          />
        );
      })}
      {/* <Parallax
        strength={400}
        bgImage={imageURL}
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
            <h2 className="parallax-title">POLAR ARORA</h2>
            <p className="parallax-text">
              Beneath the dancing aurora, a polar bear roamed, its white fur
              shimmering like the celestial lights above. Amidst the frozen
              tundra, nature's wonders converged, painting a scene of ethereal
              beauty that whispered tales of the wild and the cosmos to the
              silent Arctic night.
            </p>
            <ButtonCta />
          </div>
        </div>
      </Parallax>

      <Parallax
        strength={300}
        bgImage={imageURL2}
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
            <h2 className="parallax-title">REFLECTION OF HEAVEN</h2>
            <p className="parallax-text">
              In his canoe, the fisherman glided toward the sunrise, a golden
              path on tranquil waters. Dreams and hopes illuminated his journey,
              as the world awakened with the promise of a new day's catch and
              the endless horizon ahead.
            </p>
            <ButtonCta />
          </div>
        </div>
      </Parallax>
      <Parallax
        strength={300}
        bgImage={imageURL3}
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
            <h2 className="parallax-title">LANTERNS OF VENICE</h2>
            <p className="parallax-text">
              Beneath Venice's starlit sky, the Grand Canal shimmered like
              liquid moonlight. Gondolas glided through reflections, lanterns
              painting ripples of warmth. Love's whispers intertwined with the
              water's gentle lapping, as centuries of romance wove a tapestry of
              enchantment, where every ripple held a tale of amore.
            </p>
            <ButtonCta />
          </div>
        </div>
      </Parallax>
      <Parallax
        strength={300}
        bgImage={imageURL4}
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
            <h2 className="parallax-title">ENCHANTED VENICE</h2>
            <p className="parallax-text">
              Dawn unveiled a frozen Venice, Grand Canals embraced by a
              glistening hush. Sunrise painted ice in hues of pink and gold.
              Silence surrendered to hope, as the city thawed in the warmth of a
              new day, promising rebirth and the resilience of beauty in every
              season.
            </p>
            <ButtonCta />
          </div>
        </div>
      </Parallax>
      <Parallax
        strength={300}
        bgImage={imageURL5}
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
            <h2 className="parallax-title">CENTRAL PARK PENGUINS II</h2>
            <p className="parallax-text">
              Central Park in New York has always been a favorite place for
              Nois7 and he loves the symmetry of The Mall - still one of the
              best gathering places, occupied by skateboarders, rollerbladers,
              and street performers. Now Nois7 created what he always had
              imagined, some penguins walking at The Mall.
            </p>
            <ButtonCta />
          </div>
        </div>
      </Parallax> */}
    </div>
  );
}

export default Hero;
