import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col, Table, Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import CategoryCardView from "./CategoryCardView";
import { getPostByCategory } from "./../Service/post-service";
const Category = () => {
  const [catPost, setCatPost] = useState([]);
  const { categoryId } = useParams();
  useEffect(() => {
    getPostByCategory(categoryId)
      .then((data) => {
        setCatPost([...data]);
        window.scroll(0,0);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [categoryId]);

  return (
    <Row className="border border-5">
      <Col md={{ size: 2 }} className="bg-primary">
        <CategoryCardView />
      </Col> 
      <Col md={{ size: 10 }} className=" bg-info">
        <Card className="mb-3">
          <CardBody>
            <Table
              responsive
              size="sm"
              className="table table-bordered px-2 py-2"
            >
              <thead>
                <tr className="text-center table-info">
                  <th>#</th>
                  <th>PostTitle</th>
                  <th>PostDescription</th>
                  <th>Post-Date</th>
                  <th>View Post</th>
                </tr>
              </thead>
              {/* {catPost && catPost.map((post, index) => console.log(post?.title))} */}
              <tbody>
                {catPost &&
                  catPost.map((post, index) => (
                    <tr className="text-center" key={index}>
                      <td className="px-4">{index}</td>
                      <td className="px-4">{post?.title} </td>
                      <td className="px-4">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post?.content?.substring(0, 900),
                          }}
                        />
                      </td>
                      <td className="px-4">
                        {new Date(post?.addedDate).toLocaleString()}{" "}
                      </td>
                      <td className="px-4">
                        <Button
                          tag={Link}
                          to={"/viewPost/" + post.postId}
                          color="success"
                          style={{ height: "40px", width: "60px" }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>{" "}
            </Table>
            {catPost.length <= 0 ? (
              <h3 className="text-center">
                "No Post for This Category!"
              </h3>
            ) : (
              ""
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default Category;
