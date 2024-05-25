import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="page-footer footer-style font-small  pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-3 mt-md-0 mt-3">
              <h3>About us</h3>
              <p>ADA is a CRUD Application </p>
              <p>
                It basically implements the basic React CRUD with login and
                Signup.
              </p>
            </div>

            <div className="col-md-2 mb-md-0 mb-3">
              <h3>Links</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="a-style">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/create/post" className="a-style">
                    Create Post
                  </Link>
                </li>
                <li>
                  <Link to="/create/profile" className="a-style">
                    Create Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mb-md-0 mb-3">
              <h3>Contact Information</h3>
              <h6>Phone</h6>
              <p className="text-muted">+92-3242462</p>
              <h6>Email</h6>
              <p className="text-muted">adulmanan222111@gmail.com</p>
            </div>
            <div className="col-md-4 mt-md-0 mt-3">
              <h3>Address</h3>
              <p>7-C-1, Moon Market Civic Center,</p>
              <p> Commercial Area Faisal Town, Lahore, Punjab</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>&copy; 2020 ADA.All Copywrights are Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
