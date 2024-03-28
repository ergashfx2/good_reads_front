import React, { useContext } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import "./Navbar.css";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";
function AppNavbar() {
  const { auth, logout } = useContext(AuthContext);
  return (
    <Navbar expand="md" className="navbar-custom z-n1">
      <Container>
        <Navbar.Brand>
          <h3 className="nav-item mt-3">Readopia</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse className={"z-n1"} id="navbarNav">
          <Nav className="col-12 col-md-8 d-lg-flex">
            <ul className="justify-content-end mx-5 navbar-nav w-100">
              <li className="nav-item">
                <Link className={"nav-link"} to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to={"/myitems/"}>
                  Favourite
                </Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to={"/browse"}>
                  Browse
                </Link>
              </li>
            </ul>
            <Dropdown className="col-md-2">
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="mt-3"
              >
                Profile
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {auth ? (
                  <div>
                    <Dropdown.Item>
                      <Link className={"plain-text"} to={"/my-collections/"}>
                        My collections
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link className={"plain-text"} to={"/my-profile/"}>
                        Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div onClick={logout}>
                        <Link className={"plain-text"} to={"/"}>
                          Log out
                        </Link>{" "}
                      </div>
                    </Dropdown.Item>
                  </div>
                ) : (
                  <div>
                    <Dropdown.Item>
                      <Link className={"plain-text"} to={"/sign-in/"}>
                        Sign in
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link className={"plain-text"} to={"/sign-up/"}>
                        Sign up
                      </Link>
                    </Dropdown.Item>
                  </div>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default AppNavbar;
