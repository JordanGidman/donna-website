import { Parallax } from "react-parallax";
import Navbar from "../components/Navbar";
import emailjs from "emailjs-com";
import Footer from "../components/Footer";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";

function Contact() {
  // const image = `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7a44568c-c496-43c2-8781-2c0a3b56cce7/d9mcpdj-ddce6188-0332-4bfe-bfd7-5dae55b86986.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdhNDQ1NjhjLWM0OTYtNDNjMi04NzgxLTJjMGEzYjU2Y2NlN1wvZDltY3Bkai1kZGNlNjE4OC0wMzMyLTRiZmUtYmZkNy01ZGFlNTViODY5ODYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.oekMSOhkKHwfiavYQkrdv-lbjjyb38UAZ6CFlB1lyfM`;
  const [image, setImage] = useState("");
  const imgRef = ref(storage, "donna-contact-image.jpg");
  getDownloadURL(imgRef).then((url) => {
    console.log(url);
    setImage(url);
  });

  function sendEmail(e) {
    e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it

    console.log(e.target);
    emailjs
      .sendForm(
        "service_ctsrekp",
        "template_tks29fb",
        e.target,
        "IeTS-JmFK-cF3yRo9"
      )
      .then(
        (result) => {
          console.log("success");
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <div className="contact">
      <Navbar />
      <section className="contact-hero">
        <Parallax
          strength={400}
          bgImage={image}
          className="contact-parallax"
          style={{
            height: "70vh",
            marginBottom: "4rem",
          }}
          bgClassName="contact-parallax-bg"
          bgImageStyle={{
            objectFit: "cover",
            height: "70vh",
            width: "100vw",
          }}
        >
          <div className="parallax-content">
            <div className="parallax-text-content contact-parallax-content">
              <div className="parallax-title">Contact Me</div>
              <p className="parallax-text contact-parallax-text">
                Reach me via email
              </p>
            </div>
          </div>
        </Parallax>
        <div className="contact-info">
          <div className="contact-parallax-info">
            <h2 className="contact-heading">GET IN TOUCH</h2>
            <form className="contact-form" onSubmit={sendEmail}>
              <input
                type="text"
                placeholder="Name"
                name="user_name"
                className="contact-name"
                //   onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                name="user_email"
                className="contact-email"
                //   onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone number"
                name="contact_number"
                className="contact-number"
                //   onChange={(e) => setNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Additional Comments"
                name="message"
                className="contact-comments"
                //   onChange={(e) => setComments(e.target.value)}
              />
              <button className="contact-form-submit">Send</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
