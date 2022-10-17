import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Table,
  CardFooter,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { getCurrentUserDetails } from "../auth";
import { getAllPostByUser } from "../Service/post-service";
import { deleteUserPostComment } from "../Service/comment-service";
import { toast } from 'react-toastify';
const UserComments = () => {
  const [userPosts, setUserPosts] = useState({
    content: [],
    totalPages: "",
    lastPage: false,
    pageNumber: "",
    pageSize: "",
    totoalElements: "",
  });
  useEffect(() => {
    changePage(0);
  },[]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > userPosts.pageNumber && userPosts.lastPage) {
      return;
    }
    if (pageNumber < userPosts.pageNumber && userPosts.pageNumber === 0) {
      return;
    }

    getAllPostByUser(getCurrentUserDetails().id, pageNumber, pageSize)
      .then((response) => {
        // console.log(response);
        setUserPosts(response);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const handleCommentDelete = (commentID) => {
    deleteUserPostComment(commentID)
      .then((response) => {
        //console.log(response);
        toast.success(response.messeage);
        changePage(0);
      })
      .catch((Error) => console.log(Error));
  };

  var x = 0;
  return (
    <Row>
      <Col md={{ offset: 1, size: 10 }} className="mt-3">
        <Card className="mb-3">
          <CardBody>
            <h3 className="text-center mb-2">
              <u>My-Comments</u>
            </h3>
            <CardFooter>
              <Table responsive size="sm">
                <thead>
                  <tr className="text-center">
                    <th>#</th>
                    <th>Post-Title</th>
                    <th>Comment</th>
                    <th>Comment-Date</th>
                    <th>View Post</th>
                  </tr>
                </thead>
                <tbody>
                  {userPosts?.content?.map(
                    (post, index) =>
                      post?.comment[0] && (
                        <tr>
                          <td>
                            <ListGroup key={index}>
                              <ListGroupItem className="mt-1 mb-1 ms-1">
                                {x++}
                              </ListGroupItem>
                            </ListGroup>
                          </td>
                          <td>
                            <ListGroup key={index}>
                              <ListGroupItem className="mt-1 mb-1 ms-1">
                                {post?.title}
                              </ListGroupItem>
                            </ListGroup>
                          </td>
                          <td style={{ height: "100%" }}>
                            {post?.comment?.map(
                              (com, index) =>
                                com && (
                                  <ListGroup key={index}>
                                    <Row>
                                      <Col md={{ size: 6 }}>
                                        <ListGroupItem
                                          style={{ width: "100%" }}
                                          className="mt-1 mb-1 ms-1"
                                        >
                                          {com?.content}
                                        </ListGroupItem>
                                      </Col>
                                      <Col md={{ size: 4 }}>
                                        <div className="text-center">
                                          <Button
                                            type="button"
                                            onClick={() => {
                                              handleCommentDelete(com?.id);
                                            }}
                                            color="danger"
                                            className="mt-2 mb-2 text-black"
                                            outline
                                          >
                                            Delete
                                          </Button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </ListGroup>
                                )
                            )}
                          </td>
                          <td>
                            {post?.comment?.map(
                              (com, index) =>
                                com && (
                                  <>
                                    {" "}
                                    <ListGroup key={index}>
                                      <ListGroupItem className="mt-1 mb-1 ms-1">
                                        {new Date(
                                          com?.commentPostDate
                                        ).toLocaleString()}
                                      </ListGroupItem>
                                    </ListGroup>
                                  </>
                                )
                            )}
                          </td>
                          <td>
                            <ListGroup>
                              <ListGroupItem className="mt-1 mb-1">
                                <Button
                                  className="text-black"
                                  tag={Link}
                                  to={"/viewPost/" + post?.postId}
                                  color="success"
                                  style={{ height: "40px", width: "80px" }}
                                  outline
                                >
                                  View
                                </Button>
                              </ListGroupItem>
                            </ListGroup>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </Table>
            </CardFooter>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default UserComments;
