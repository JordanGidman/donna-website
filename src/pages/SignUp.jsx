import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";

import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SignUp() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    //capture all details at once. Not using controlled components in this case due to file upload
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      //sign the user up through firebase authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //Store the user in a database as well without password so we can access later

      await updateProfile(res.user, {
        displayName,
        admin: false,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        admin: false,
      });

      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  }

  return (
    <div className="form-container">
      <Navbar />
      <div className="form-wrapper">
        <h1 className="logo">Donna Marie Artwork</h1>
        <span className="subheading">Sign up</span>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="signup-inputs"
            placeholder="Dispaly Name"
          ></input>
          <input
            type="email"
            className="signup-inputs"
            placeholder="Email"
          ></input>
          <input
            type="password"
            className="signup-inputs"
            placeholder="password"
          ></input>

          <button className="sign-up-form-btn" disabled={isLoading}>
            Sign Up
          </button>
          {error && <span>Something went wrong..</span>}
        </form>
        {/* <p className="signup-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p> */}
      </div>
    </div>
  );
}

export default SignUp;
