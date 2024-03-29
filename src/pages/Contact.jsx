import { Parallax } from "react-parallax";
import Navbar from "../components/Navbar";
import emailjs from "emailjs-com";
import Footer from "../components/Footer";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";

function Contact() {
  const [image, setImage] = useState("");
  const imgRef = ref(storage, "donna-contact-image.webp");
  //get the url from the reference
  getDownloadURL(imgRef).then((url) => {
    setImage(url);
  });

  function sendEmail(e) {
    e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it

    //automated emails with the users inputted data we give it our access keys and the entire form element
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
        {!image && <p className="loading">Loading...</p>}
        {image && (
          <Parallax
            strength={400}
            bgImage={image}
            bgImageAlt="Loading Image"
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
        )}
        <div className="contact-info">
          <div className="contact-parallax-info">
            <h2 className="contact-heading">GET IN TOUCH</h2>
            <form
              className="contact-form"
              onSubmit={console.log(
                "This feature is disabled by admin as this is a test version you can check the code to see that it would work but the service this feature uses is limited or paid only so to avoid issues or charges it has been disabled"
              )}
            >
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
