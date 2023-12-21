import { useNavigate } from "react-router-dom";

function ButtonCta() {
  const navigate = useNavigate();

  return (
    <button className="parallax-cta-btn" onClick={() => navigate("/gallery")}>
      Gallery
    </button>
  );
}

export default ButtonCta;
