import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";

import { AuthContext } from "../../context/AuthContext.js";

// const navLinks = [
//   {
//     path: "/stocks",
//     display: "Market Watch",
//   },
//   {
//     path: "/predict",
//     display: "Stock Projections",
//   },
//   {
//     path: "/about",
//     display: "About",
//   }
// ];

const navLinks = [
  {
    path: "/stocks",
    display: "Market Watch",
    className: "secondary__btn",
  },
  {
    path: "/predict",
    display: "Stock Projections",
    className: "secondary__btn",
  },
  {
    path: "/about",
    display: "About",
    className: "secondary__btn",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleScroll = () => {
    const isScrolled = window.scrollY > 80;
    headerRef.current.classList.toggle("sticky__header", isScrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkLogin = (item) => {
    if (item.path === "/stocks" || item.path === "/predict") {
      if (!user) {
        navigate("/signin");
      }
    }
  };

  return (
    <div>
      <header className="header" ref={headerRef}>
        <Container fluid>
          <Row className="headerRow align-items-center">
            {/* Logo in the far-left top corner */}
            <Col xs={12} md={4} className="order-md-first logo-container">
              <Link to="/" className="logo">
                <img src={logo} alt="" />
              </Link>
            </Col>

            <Col
              md={8}
              className="d-flex align-items-center justify-content-between"
            >
              {/* Navigation menu */}
              <div className="navigation">
                <ul className="menu d-flex align-items-center gap-5">
                  {navLinks.map((item, index) => (
                    <li key={index} onClick={() => checkLogin(item)}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          `${navClass.isActive ? "active_link" : ""} ${
                            item.className || ""
                          }`
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* User authentication buttons */}
              <div className="nav_right d-flex align-items-center gap-4 loginButtons">
                <div className="nav_btns d-flex align-items-center gap-4">
                  {user ? (
                    <>
                      <h5 className="mb-0">{user.username}</h5>
                      <Button className="btn btn-dark" onClick={logout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <button type="button" class="btn btn-outline-dark">
                        <Link to="/signin" class="white-link">Signin</Link>
                      </button>
                      <button type="button" class="btn btn-outline-dark">
                        <Link to="/signup" class="white-link">Signup</Link>
                      </button>
                    </>
                  )}
                </div>
                <span className="mobile_menu">
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default Header;
