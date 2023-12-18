import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

function SignIn() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    //capture all details at once. Not using controlled components in this case due to file upload

    const email = e.target[0].value;
    const password = e.target[1].value;

    //sign the user up through firebase authentication
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // navigate("/");
      setIsLoading(false);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  }
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="logo">Giddy Chat</h1>
        <span className="subheading">Sign In</span>
        <form className="signup-form" onSubmit={handleSubmit}>
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
            Sign in
          </button>
          {error && <span>Something went wrong..</span>}
        </form>
        {/* <p className="signup-footer">
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </p> */}
      </div>
    </div>
  );
}

export default SignIn;
