import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseapi } from "../confic";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Baseapi.post("/login", {
        email,
        password,
      });

      console.log("Response:", res.data);
      localStorage.setItem("token", "Bearer " + res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful");
      navigate("/home");
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed. Please try again");
      }
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white rounded-4">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your Email and password to login
                  </p>

                  {/* FORM */}
                  <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label className="form-label">Email</label>
                    </div>

                    {/* Password */}
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-outline-light btn-lg px-5"
                    >
                      Login
                    </button>
                  </form>
                </div>

                <div>
                  <p className="mb-0">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-white-50 fw-bold">
                      Register
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
