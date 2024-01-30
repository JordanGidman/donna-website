import "./App.css";
import "./queries.css";
// import Contact from "./pages/Contact";
// import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Admin from "./pages/Admin";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { React, useContext, lazy, Suspense } from "react";
import { AuthContext } from "./context/AuthContext";
// import _PRIVATE from "./firebase";

// const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Admin = lazy(() => import("./pages/Admin"));

//-features-
//Loading component
//Ability to delete hero images
//FEATURE COMPLETE.

//-optimization-
//memoize necessary components
//lighthouse optimizations
//error handling

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (currentUser?.uid !== "TPrNEyUfJsTLnxqVulhlAKrPfBF2") {
      return <Navigate to="/signin" />;
    }

    return children;
  };
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
