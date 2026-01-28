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
  const [error, setError] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (error[n]) {
      setError({ ...error, [n]: "" });
    }
  };

  const validateForm = () => {
    const newError = {};

    if (!form.name.trim()) {
      newError.name = "Name is required";
    } else if (form.name.length < 3) {
      newError.name = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newError.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newError.email = "Invalid email format";
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!form.mobile) {
      newError.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(form.mobile)) {
      newError.mobile = "Mobile number must be 10 digits";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

    if (!form.password) {
      newError.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      newError.password =
        "Password must be 8–12 chars, 1 uppercase, 1 number & 1 special char";
    }

    if (form.password !== form.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      /*(if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }*/
    }
    if (!validateForm()) {
      toast.error("Filling all fields are mandotary");
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
        },
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
      if (error.response?.status === 400) {
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
                    />
                    <label className="form-label">Full Name</label>
                    <br />
                    {error.name && (
                      <small className="text-danger">{error.name}</small>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="email"
                      className="form-control form-control-lg"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <label className="form-label">Email</label>
                    <br />
                    {error.email && (
                      <small className="text-danger">{error.email}</small>
                    )}
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="mobile"
                      className="form-control form-control-lg"
                      value={form.mobile}
                      onChange={handleChange}
                    />
                    <label className="form-label">Mobile Number</label>
                    <br />
                    {error.mobile && (
                      <small className="text-danger">{error.mobile}</small>
                    )}
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <label className="form-label">Password</label>
                    <br />
                    {error.password && (
                      <small className="text-danger">{error.password}</small>
                    )}
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control form-control-lg"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                    <label className="form-label">Confirm Password</label>
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
