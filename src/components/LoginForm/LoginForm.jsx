import React, { useContext, useState } from "react";
import api from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

function LoginForm(props) {
  let [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const success_message = "Login was successfully";
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login/", loginData);
      if (res.status === 400) {
        setError(res.data.message);
      } else {
        navigate("/", { state: { success_message } });
        const token = res.data.token;
        login();
        localStorage.setItem("token", token);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response.data.message);
    }
  };
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            {error ? <div className={"alert alert-danger"}>{error}</div> : null}
            <form onSubmit={handleSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <h2 className="text-center fw-bold mb-0">Sign in</h2>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  name={"email"}
                  onChange={handleChange}
                  placeholder="Enter a valid email address"
                />
                <label className="form-label">Email address</label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  name={"password"}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                    required={true}
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a href="/sign-up" className="link-danger">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
