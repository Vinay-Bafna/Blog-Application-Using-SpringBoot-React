import React from "react";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../Service/AuthService";
import { toast } from "react-toastify";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const ResetForm = () => {
    setLoginDetails({
      username: "",
      password: "",
    });
  };

  useEffect(() => {}, [loginDetails]);

  const handleForm = (event, property) => {
    setLoginDetails({ ...loginDetails, [property]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    //console.log(loginDetails);

    if (
      loginDetails.username.trim() === "" ||
      loginDetails.password.trim() === ""
    ) {
      toast.error("Username & password Required!");
    } else {
      login(loginDetails)
        .then((response) => {
          //console.log(response);
          doLogin(response, () => {
            console.log("Login Details Saved to LocalStorage!");
          });
          toast.success("Welcome to Blog Application.");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400 || error.response.status === 404) {
            toast.error(error.response.data.messeage);
          } else {
            toast.error("Went Wrong!");
          }
        });
    }
  };

  return (
    <>
      <Row>
        <Container>
          <Col md={{ offset: 4, size: 4 }} sm="12">
            <Form
              className="shadow-lg p-3 mb-5 bg-light rounded"
              onSubmit={submitForm}
            >
              <h2 className="text-primary">Blog Application Login-Form</h2>
              <Label className="mt-2">
                Stay updated on your professional world
              </Label>
              <FormGroup row>
                <Col sm={12} className="mt-2">
                  <Input
                    id="username"
                    placeholder="Enter E-mail Address Here."
                    type="email"
                    onChange={(event) => handleForm(event, "username")}
                    value={loginDetails.username}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={12} className="mt-2">
                  <Input
                    id="password"
                    placeholder="Enter password Here."
                    type="password"
                    onChange={(e) => handleForm(e, "password")}
                    value={loginDetails.password}
                  />
                  <Label className="ms-1 mt-1" tag={Link} to="/forgotpass">
                    Forgot Password?
                  </Label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={12}>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="fw-bold col-5 float-start"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={ResetForm}
                    variant="outline-danger"
                    className="fw-bold col-5 float-end"
                  >
                    Reset
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={12} className="mt-1">
                  <Button
                    as={Link}
                    to="/register"
                    variant="outline-secondary"
                    className="fw-bold col-12 float-start"
                  >
                    Register Here
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Container>
      </Row>
    </>
  );
};

export default Login;
