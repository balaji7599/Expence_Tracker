import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      toast.success("Registration successful");
      navigate("/");

      // Optional: clear form
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
      });
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg rounded-4">
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Register</h3>

                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label">Full Name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label">Password</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control form-control-lg"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label">Confirm Password</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="mobile"
                      className="form-control form-control-lg"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label">Mobile Number</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
