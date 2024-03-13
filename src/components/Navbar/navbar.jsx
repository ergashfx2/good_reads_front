import React, {useContext} from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import './Navbar.css';
import AuthContext from "../../context/AuthProvider";
function AppNavbar() {
  const {auth} = useContext(AuthContext)
  return (
    <Navbar expand="md" className="navbar-custom">
      <Container>
        <Navbar.Brand className="col-2">
          <h3 className="nav-item mt-3">Readopia</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="col-8">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
              <span className="navbar-toggler-icon" style={{color: 'saddlebrown'}}></span>
            </button>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Menu</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav ml-auto d-flex flex-column">
                  <li className="nav-item "><a className="nav-link" href="/">Home</a></li>
                  <li className="nav-item"><a className="nav-link" href="/mybooks">My Books</a></li>
                  <li className="nav-item"><a className="nav-link" href="/browse">Browse</a></li>
                </ul>
              </div>
            </div>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item "><a className="nav-link" href="/">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="/mybooks">My Books</a></li>
                <li className="nav-item"><a className="nav-link" href="/browse">Browse</a></li>
              </ul>
            </div>
          </Nav>
        </Navbar.Collapse>
        <Dropdown className="col-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="mt-3">
            Profile
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {auth ? (
                <div>
                <Dropdown.Item href="/my-collections ">My collections</Dropdown.Item>
            <Dropdown.Item href="/sign-up">Profile</Dropdown.Item>
                  <Dropdown.Item ><button className={"btn"}>Log out</button></Dropdown.Item>
                              </div>
            ):(<div>
                <Dropdown.Item href="/sign-in">Sign in</Dropdown.Item>
            <Dropdown.Item href="/sign-up">Sign up</Dropdown.Item>
              </div>
              )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
