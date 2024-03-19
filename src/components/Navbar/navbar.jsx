import React, {useContext} from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import './Navbar.css';
import AuthContext from "../../context/AuthProvider";
import {Link} from "react-router-dom";
function AppNavbar() {
  const {auth,logout} = useContext(AuthContext)
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
                  <li className="nav-item "><Link className={'nav-link'} to={"/"}>Home</Link></li>
                  <li className="nav-item"><Link className={'nav-link'} to={"/"}>My Books</Link></li>
                  <li className="nav-item"><Link className={'nav-link'} to={"/"}>Browse</Link></li>
                </ul>
              </div>
            </div>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item "><Link className={'nav-link'} to={"/"}>Home</Link></li>
                <li className="nav-item"><Link className={'nav-link'} to={"/mybooks"}>My Books</Link></li>
                <li className="nav-item"><Link className={'nav-link'} to={"/browse"}>Browse</Link></li>
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
                  <Dropdown.Item><Link className={'plain-text'} to={"/my-collections/"}>My collections</Link></Dropdown.Item>
                  <Dropdown.Item><Link className={'plain-text'} to={"/profile/"}>Profile</Link></Dropdown.Item>
                  <Dropdown.Item ><div onClick={logout}><Link className={'plain-text'} to={"/"}>Log out</Link> </div></Dropdown.Item>
                              </div>
            ):(<div>
                  <Dropdown.Item><Link className={'plain-text'} to={"/sign-in/"}>Sign in</Link></Dropdown.Item>
                  <Dropdown.Item><Link className={'plain-text'} to={"/sign-up/"}>Sign up</Link></Dropdown.Item>
              </div>
              )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
