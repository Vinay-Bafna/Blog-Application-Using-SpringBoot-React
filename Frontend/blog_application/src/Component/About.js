import React, { useState } from "react";
import { createFeedBack } from "./../Service/feedback-service";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardTitle,
  Card,
  CardText,
  CardFooter,
  Form,
  Label,
  Input,
  FormGroup,
  Table,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";

const About = () => {
  const [feedback, setFeedBack] = useState({
    name: "",
    email: "",
    suggestions: "",
  });

  const handleChange = (event, property) => {
    setFeedBack({ ...feedback, [property]: event.target.value });
  };
  const ResetForm = () => {
    setFeedBack({ name: "", email: "", suggestions: "" });
  };
  const submitForm = (event) => {
    event.preventDefault();
    //console.log(feedback);
    if (
      feedback.name === "" ||
      feedback.email === "" ||
      feedback.suggestions === ""
    ) {
      toast.error("All Field Required!");
    } else {
      createFeedBack(feedback)
        .then((response) => {
          console.log(response);
          ResetForm();
        })
        .catch((Error) => {
          console.log(Error);
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ offset: 1, size: 10 }} className="mt-3">
          <Card>
            <CardBody>
              <CardTitle className="h3">About us:-</CardTitle>
              <CardText className="mt-1 h6 mb-3">
                This Website is Designed by Vinay-Bafna
              </CardText>
              <CardFooter>
                <Label className="h3">FeedBack :-</Label>
                <Form className="mt-1" onSubmit={submitForm}>
                  <FormGroup row>
                    <Label className="h5" for="name" sm={2}>
                      Name :-
                    </Label>
                    <Col sm={10}>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your Name!"
                        type="text"
                        value={feedback.name}
                        onChange={(event) => handleChange(event, "name")}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="h5" for="email" sm={2}>
                      Email :-
                    </Label>
                    <Col sm={10}>
                      <Input
                        id="email"
                        name="email"
                        placeholder="Your Email-ID!"
                        type="email"
                        onChange={(event) => handleChange(event, "email")}
                        value={feedback.email}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label className="h5" for="suggestions">
                      Suggestions :-
                    </Label>
                    <Input
                      id="suggestions"
                      name="suggestions"
                      type="textarea"
                      placeholder="Share Your Throughts Here!"
                      onChange={(event) => handleChange(event, "suggestions")}
                      value={feedback.suggestions}
                    />
                  </FormGroup>
                  <FormGroup row>
                    <Col sm={12}>
                      <Button
                        type="submit"
                        color="primary"
                        className="fw-bold col-5 float-start" outline
                      >
                        Submit
                      </Button>
                      <Button
                        onClick={ResetForm}
                        color="danger"
                        className="fw-bold col-5 float-end"
                        outline
                      >
                        Reset
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardFooter>
              <CardFooter className="">
                <Label className="h3">Contact Us :-</Label>

                <Card>
                  <CardBody>
                    <Row className="mt-1">
                      <Col md={{ size: 2, offset: 0 }}>
                        <img
                          alt="profile.png"
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          height="190px"
                          width="200px"
                        />
                      </Col>
                      <Col md={{ size: 6, offset: 1 }} className="mb-3">
                        <Table>
                          <tbody>
                            <tr>
                              <th scope="row">Name:-</th>
                              <td>Vinay-Bafna</td>
                            </tr>
                            <tr>
                              <th scope="row">Email:-</th>
                              <td>vbcode@</td>
                            </tr>
                            <tr>
                              <th scope="row">Phone No:-</th>
                              <td>0123456789</td>
                            </tr>
                            <tr>
                              <th scope="row">About:-</th>
                              <td>Website Builder!</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>{" "}
                    </Row>
                  </CardBody>
                </Card>
              </CardFooter>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
