import React from 'react';
import "../Navbar/Navbar.css"

function Navbar() {
  return (
    <nav className="navbar navbar-custom navbar-expand-md navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand text-custom" href="/home">Readopia</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ color: 'saddlebrown' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item "><a className="nav-link" href="/home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/mybooks">My Books</a></li>
            <li className="nav-item"><a className="nav-link" href="/browse">Browse</a></li>
          </ul>
          <input className="search form-control mr-sm-2" name="search" placeholder="Search book..." />
        </div>
      </div>
    </nav>
    );
}

export default Navbar;