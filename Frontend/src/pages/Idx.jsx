import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 text-center"
      style={{
        background: "linear-gradient(135deg, #0f172a, #4c1d95, #0f172a)",
      }}
    >
      <div className="container">
        {/* App Title */}
        <h1
          className="fw-bold display-1 mb-5"
          style={{
            background: "linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Expense Tracker
        </h1>

        {/* Buttons */}
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="btn btn-lg text-white px-5 py-3"
            style={{
              background: "linear-gradient(90deg, #06b6d4, #7c3aed)",
              border: "none",
            }}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="btn btn-lg btn-outline-light px-5 py-3"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
