import React, { useContext, useState } from "react";
import "../RegisterForm/RegisterForm.css";
import api from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { Asterisk } from "react-bootstrap-icons";
function RegisterForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const success_message = "Registration was successfully";
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/create/", formData);
      if (res.status === 400) {
        setError(res.data.message);
      } else {
        navigate("/", { state: { success_message } });
        const token = res.data.token;
        login(token);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee;" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px;" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          {error ? (
                            <div className={"alert alert-danger"}>{error}</div>
                          ) : (
                            <p></p>
                          )}
                          <input
                            type="text"
                            name={"name"}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <label className="form-label">
                            <Asterisk color={"red"} size={5} /> Your Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            name={"email"}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <label className="form-label">
                            <Asterisk color={"red"} size={5} /> Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            onChange={handleChange}
                            name={"password"}
                            className="form-control"
                          />
                          <label className="form-label mb-4">
                            <Asterisk color={"red"} size={5} /> Password
                          </label>
                          <small>
                            <li>
                              Your password can't be too similar to your other
                              personal information.
                            </li>
                            <li>
                              Your password must contain at least 8 characters
                            </li>
                            <li>
                              Your password can't be a commonly used password.
                            </li>
                            <li>Your password can't be entirely numeric</li>
                          </small>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" className="form-control" />
                          <label className="form-label">
                            <Asterisk color={"red"} size={5} /> Repeat your
                            password
                          </label>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          required={true}
                        />
                        <label className="form-check-label">
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
