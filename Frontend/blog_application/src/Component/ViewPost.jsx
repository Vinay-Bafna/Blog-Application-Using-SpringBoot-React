import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Label,
  CardImg,
  CardFooter,
  Form,
  FormGroup,
  Button,
  Input,
} from "reactstrap";

import { useEffect, useState } from "react";
import { doGetSinglePost } from "../Service/post-service";
import { Link } from "react-router-dom";
import { base_url } from "./../Service/AxiosHelper.js";
import { createComment } from "../Service/comment-service";
import { getCurrentUserDetails } from "../auth";

const ViewPost = () => {
  useEffect(() => {
    getpostDetails();
  }, [ ]);
  const ObjParamID = useParams();
  const [singlePost, setSinglePost] = useState({
    comment: [],
  });

  

  const getpostDetails = () => {
    doGetSinglePost(ObjParamID.postId)
      .then((response) => {
        setSinglePost(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [userComment, setUserComment] = useState(undefined);

  const submitComments = (event) => {
    event.preventDefault();
    //console.log(userComment);
    if(userComment?.content.trim()===''){
      return ;
    }
    createComment(userComment, getCurrentUserDetails()?.id, singlePost?.postId)
      .then((response) => {
        //console.log(response);
        setUserComment({
          content: "",
        });
        getpostDetails();
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const onchangecomment = (event, property) => {
    setUserComment({ ...userComment, [property]: event.target.value });
  };

  return (
    
    <Container className="mt-2">
      {/*Single Post Section */}
      <Row>
        <Col md={{ size: 10, offset: 1 }} className="px-4 text-black">
          <Link to="/" className="text-white">
            NewFeed
          </Link>

          <Label> &nbsp;{"-->"}</Label>
          {singlePost && (
            <Link className="text-white" to="">
              {" "}
              {singlePost.title}
            </Link>
          )}
        </Col>

        <Col md={{ size: 10, offset: 1 }}>
          <Card className="mt-2 shadow-sm border-2 rounded-0">
            <Label className="mt-2 px-3">
              <b> Post is </b> Created By <b>{singlePost?.user?.name}</b> on{" "}
              <b>{new Date(singlePost?.addedDate).toLocaleString()}</b>
            </Label>
            <Label className="mt-2 px-3">
              <b>Post-Category:-</b> {singlePost?.category?.title}
            </Label>

            <CardBody>
              <CardTitle className="border-3 mt-1">
                <h1>{singlePost.title}</h1>
              </CardTitle>
              {singlePost.imageName && (
                <CardImg
                  alt=""
                  className="img-fluid  shadow rounded"
                  style={{ maxWidth: "50%" }}
                  src={base_url + "/posts/image/" + singlePost.imageName}
                />
              )}
              <CardText
                dangerouslySetInnerHTML={{
                  __html: singlePost.content,
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/*Comment Section */}
      <Row className="mt-1 shadow-sm  rounded-0">
        <Col md={{ size: 10, offset: 1 }}>
          <Card>
            <Label className="h4 mt-1 px-3">
              Total Number of Comments:- {singlePost?.comment?.length}
            </Label>

            <Col md={{ size: 10, offset: 1 }} className="mb-5">
              {singlePost?.comment?.map((c, index) => (
                <div key={index}>
                  <CardTitle className="mt-3 h6">
                    Created By {c?.user?.name} on{" "}
                    {new Date(c?.commentPostDate).toLocaleString()}
                    {"!"}
                  </CardTitle>
                  <CardFooter className="mt-2 border-2 rounded" key={index}>
                    <CardBody>
                      <CardText>Comment: &nbsp; {c?.content}</CardText>
                    </CardBody>
                  </CardFooter>
                </div>
              ))}
            </Col>
            {getCurrentUserDetails() && (
              <Col md={{ size: 10, offset: 1 }} className="mb-2">
                <CardFooter>
                  {" "}
                  <CardBody className="px-2 py-2">
                    <Form>
                      <FormGroup>
                        <Input
                          id="content"
                          name="content"
                          type="textarea"
                          placeholder=" Enter Comment Here!"
                          style={{ height: "100%", width: "100%" }}
                          onChange={(e) => onchangecomment(e, "content")}
                          value={userComment?.content}
                        />
                      </FormGroup>
                      <Button
                        block
                        color="success"
                        size="sm"
                        onClick={submitComments}
                      >
                        Submit
                      </Button>
                    </Form>
                  </CardBody>
                </CardFooter>
              </Col>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ViewPost;
