import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Row,
  Form,
  Label,
  Input,
  CardFooter,
} from "reactstrap";
import { createCategories } from "../Service/category-services";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event, property) => {
    setCategory({ ...category, [property]: event.target.value });
  };

  const ResetForm = () => {
    setCategory({
      title: "",
      description: "",
    });
  };

  const submitform = (event) => {
    event.preventDefault();
    console.log(category);
    createCategories(category)
      .then((response) => {
        //console.log(response);
        ResetForm();
        navigate("/user/CreatePost");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <Container className="fluid mt-5">
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <Card className="mt-3">
            <CardBody>
              <CardFooter>
                <CardTitle className="text-center h3 mb-3">
                  Create Category
                </CardTitle>
                <Form className="mt-1" onSubmit={submitform}>
                  <FormGroup row>
                    <Label className="h5" for="name" sm={2}>
                      Title:-
                    </Label>
                    <Col sm={10}>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Category Name!"
                        type="text"
                        value={category.title}
                        onChange={(event) => handleChange(event, "title")}
                        // invalid = { response?.data?.Title ? true: false }
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="h5" for="name" sm={2}>
                      Description:-
                    </Label>
                    <Col sm={10}>
                      <Input
                        id="description"
                        name="description"
                        placeholder="Category Description!"
                        type="textarea"
                        style={{ height: "100px" }}
                        value={category.description}
                        onChange={(event) => handleChange(event, "description")}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm={12}>
                      <Button
                        type="submit"
                        variant="outline-success"
                        className="fw-bold col-5 float-start"
                      >
                        Submit
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
                </Form>{" "}
              </CardFooter>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCategory;
