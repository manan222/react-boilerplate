import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.scss";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <div>
      <div>
        <Navbar collapseOnSelect expand="md" className="nav-bg">
          <Navbar.Brand to="#home">
            <img
              src="/assets/images/LogoIconGold.png"
              className="logo-style"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="link-style">
                Home
              </Link>
              <Link to="/create/profile" className="link-style">
                Profile
              </Link>
              <Link to="/view/map" className="link-style">
                Map
              </Link>
              <Link to="/calculator" className="link-style">
                Calculator
              </Link>
              <Link to="/drag" className="link-style">
                Drag
              </Link>
              <Link to="/web/camera" className="link-style">
                Camera
              </Link>
              <Link to="/weather" className="link-style">
                Weather
              </Link>
            </Nav>
            <Nav>
              <Link to="/login">
                <Button
                  type="button"
                  className="btn logout-button border-radius"
                  onClick={logoutHandler}
                >
                  Log Out
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
