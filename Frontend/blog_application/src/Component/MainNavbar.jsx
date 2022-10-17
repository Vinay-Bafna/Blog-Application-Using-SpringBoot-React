import { Nav, NavDropdown, Navbar, Button, NavItem } from "react-bootstrap";
import { NavbarBrand } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doLogout, getCurrentUserDetails, isLoggedIn } from "../auth/index";
import Avatar from "react-avatar";

const MainNavbar = () => {
  //Login Feature
  const [userlogin, setUserLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    setUserLogin(isLoggedIn());
    setUser(getCurrentUserDetails());
  }, [userlogin]);

  //After Clicking on Logout Button
  let navigate = useNavigate();
  const LogoutHandle = () => {
    setUser(null);
    doLogout();
    navigate("/");
    toast.success("User Logged Out Successfull!");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="px-5"
    >
      <NavbarBrand tag={Link} to="/">
        Blog Application
      </NavbarBrand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" navbar>

          <Nav.Link as={Link} to="/user/CreatePost">
            Create-Post
          </Nav.Link>

          <Nav.Link as={Link} to="/user/myposts">
            My-Post
          </Nav.Link>
          <Nav.Link as={Link} to="/user/mycomment">
            My-Comment
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            Contact
          </Nav.Link>
        </Nav>
        <Nav navbar>
          {!getCurrentUserDetails() && (
            <NavItem>
              <Nav.Link className="fw-bold " as={Link} to="/login">
                Login
              </Nav.Link>
            </NavItem>
          )}
          {getCurrentUserDetails() && (
            <>
              <Avatar
                alt={user?.name}
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                size="45px"
                round="40px"
                className="border border-white"
              />
              <NavDropdown
                title={getCurrentUserDetails()?.name}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/user/UserProfile"
                  className="sm-2"
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/user/CreateCategory"
                  className="sm-2"
                >
                  Create-Category
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about" className="sm-2">
                  Contact
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Button}
                  className="sm-2 "
                  onClick={LogoutHandle}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
