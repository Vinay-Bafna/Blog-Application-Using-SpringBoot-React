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
import { deletePost } from "./../Service/post-service";
import { toast } from "react-toastify";

const UserPosts = () => {
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
  }, []);

  const changePage = (pageNumber = 0, pageSize = 1) => {
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

  const DeletePost = (postId) => {
    deletePost(postId)
      .then((response) => {
        toast.success("Post Deleted Successfully!");
        changePage(0);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  return (
    <Row>
      <Col md={{ offset: 1, size: 10 }} className="mt-3">
        <Card className="mb-3">
          <CardBody>
            <h3 className="text-center mb-2">
              <u>My-Posts</u>
            </h3>
            <CardFooter>
              <Table responsive size="sm">
                <thead>
                  <tr className="text-center">
                    <th>#</th>
                    <th>PostTitle</th>
                    <th>PostDescription</th>
                    <th>Post-Date</th>
                    <th>View Post</th>
                  </tr>
                </thead>
                <tbody className="border border-0">
                  {userPosts.content.map((post, index) => (
                    <tr key={index}>
                      <td>
                        <ListGroup>
                          <ListGroupItem className="mt-1 mb-1 ms-1">
                            {index}
                          </ListGroupItem>
                        </ListGroup>
                      </td>
                      <td>
                        {" "}
                        <ListGroup>
                          <ListGroupItem className="mt-1 mb-1 ms-1">
                            {post?.title}{" "}
                          </ListGroupItem>
                        </ListGroup>
                      </td>
                      <td>
                        <ListGroup>
                          <ListGroupItem
                            className="mt-1 mb-1 ms-1"
                            dangerouslySetInnerHTML={{
                              __html: post?.content?.substring(0, 900),
                            }}
                          />
                        </ListGroup>
                      </td>
                      <td>
                        <ListGroup>
                          <ListGroupItem className="mt-1 mb-1 ms-1">
                            {new Date(post?.addedDate).toLocaleString()}{" "}
                          </ListGroupItem>
                        </ListGroup>
                      </td>
                      <td>
                        <Col sm={{ size: 9 }}>
                          <ListGroup>
                            <ListGroupItem className="mt-1 mb-1 ms-1">
                              <Button
                                tag={Link}
                                className="text-black"
                                to={"/viewPost/" + post.postId}
                                color="success"
                                style={{ height: "40px", width: "80px" }}
                                outline
                              >
                                View
                              </Button>
                              <Button
                                className="mt-2 text-black"
                                tag={Link}
                                to={"/user/update-post/" + post.postId}
                                color="warning"
                                style={{ height: "40px", width: "80px" }}
                                outline
                              >
                                Update
                              </Button>
                              <Button
                                className="mt-2 text-black"
                                type="button"
                                onClick={() => DeletePost(post.postId)}
                                color="danger"
                                style={{ height: "40px", width: "80px" }}
                                outline
                              >
                                Delete
                              </Button>
                            </ListGroupItem>
                          </ListGroup>
                        </Col>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardFooter>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default UserPosts;
