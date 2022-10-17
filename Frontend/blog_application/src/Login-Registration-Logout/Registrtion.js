
import React, { useEffect, useState } from "react";
import { Row, Col, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {signUp} from '../Service/AuthService';

const Registrtion = () => {
  const navigate = useNavigate();
  const [data, SetData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const[error,setError]=useState({
    errors: {},
    isError: false,
  });

  useEffect(() => {
    
  }, [data]);
  
  const handleChange = (event, property) => {
    SetData({ ...data, [property]: event.target.value });
  };

  const ResetForm=()=>{
    SetData({
      name: "",
      email: "",
      password: "",
      about: ""
    });
  };

  const submitForm=((event)=>{
    event.preventDefault();
    signUp(data).then((resp)=>{
        toast.success("User "+data.name+" Register Successfully!!")
        SetData({
          name: "",
          email: "",
          password: "",
          about: ""
        });
        navigate("/");
      
        
    }).catch((error)=>{
        console.log(error);
        toast.error("Invalid Data Entered!");
        setError({
          errors:error,
          isError:true,
        })

    });
    

  });

  return (
    <div>
      <Row>
        <Container>
          <Col className="mt-2" md={{ offset: 4, size: 4 }} sm="12">
            <Form
              className="shadow-lg p-3 mb-5 bg-light rounded"
              onSubmit={submitForm}>
              <h2 className="text-primary">
                Blog Application
                <br /> Sign-up-Form
              </h2>
              <Label className="mt-2">Your Details is Safe with us.</Label>
              <FormGroup row>
                <Col sm={12} className="mt-2">
                  <Input
                    name="name"
                    placeholder="Enter User Name Here."
                    type="text"
                    onChange={(event) => handleChange(event, "name")}
                    value={data.name}
                    invalid = { error.errors?.response?.data?.name ? true: false }
                    
                  />
                  <FormFeedback>{error.errors?.response?.data?.name}</FormFeedback>
                </Col>
                
              </FormGroup>
             
              <FormGroup row>
                <Col sm={12} className="mt-2">
                  <Input
                    id="useremail"
                    
                    placeholder="Enter E-mail Address Here."
                    type="email"
                    onChange={(event) => handleChange(event, "email")}
                    value={data.email}
                    invalid = { error.errors?.response?.data?.email ? true: false }
                  />
                   <FormFeedback>{error.errors?.response?.data?.email}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={12} className="mt-2">
                  <Input
                    id="password"
                    placeholder="Enter Password Here."
                    type="password"
                    onChange={(event) => handleChange(event, "password")}
                    value={data.password}
                    invalid = { error.errors?.response?.data?.password ? true: false }
                  />
                   <FormFeedback>{error.errors?.response?.data?.password}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={12} className="mt-2">
                  <Input
                    id="about"
                    type="textarea"
                    placeholder="Tell us Sometthing About Your Self."
                    onChange={(event) => handleChange(event, "about")}
                    value={data.about}
                    invalid = { error.errors?.response?.data?.about ? true: false }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={12}>
                    <Button type="submit" variant="outline-primary" className="fw-bold col-5 float-start">
                      Register
                    </Button>
                    <Button onClick={ResetForm} variant="outline-danger" className="fw-bold col-5 float-end">
                      Reset
                    </Button>          
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Container>
      </Row>
    </div>
  );
};

export default Registrtion;

