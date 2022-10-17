import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col,Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { doGetAllPosts } from "../Service/post-service";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from 'react-toastify';

const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    lastPage: false,
    pageNumber: "",
    pageSize: "",
    totoalElements: "",
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 10) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }

    doGetAllPosts(pageNumber, pageSize)
      .then((response) => {
        // console.log(response);
        toast.success("All Post Loaded Sucessfully!");
        setPostContent({
          content: [...postContent.content, ...response.content],
          totalPages: response.totalPages,
          lastPage: response.lastPage,
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          totoalElements: response.totoalElements,
        });
        // window.scroll(0, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePageInfinite = () => {
    console.log("Page change!");
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
     
      <Row >
        <Col md={{ size: 12}}>
          <Card className="mb-3">
            <h3 className="text-center mb-2 mt-3">
              <u>All-Posts</u>
            </h3>
            <CardBody>

              {/* Infinte Scrolling of an Table */}
              <InfiniteScroll
                dataLength={postContent.content.length} //This is important field to render the next data
                next={changePageInfinite}


                hasMore={!postContent.lastPage}
              >
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
                  <tbody>
                    {postContent.content.map((post, index) => (
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
                  </tbody>
                </Table>
              </InfiniteScroll>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NewFeed;


// BELOW CODE IS FOR PAGINATION
// <Pagination className="mt-2 ">
//   <PaginationItem
//     onClick={() => {
//       changePage(postContent.pageNumber - 1);
//     }}
//     disabled={postContent.pageNumber === 0}
//   >
//     <PaginationLink>Previous</PaginationLink>
//   </PaginationItem>

//   {[...Array(postContent.totalPages)].map((item, index) => (
//     <PaginationItem
//       onClick={() => {
//         changePage(index);
//       }}
//       key={index}
//       active={index === postContent.pageNumber}
//     >
//       <PaginationLink>{index + 1}</PaginationLink>
//     </PaginationItem>
//   ))}

//   <PaginationItem
//     onClick={() => {
//       changePage(postContent.pageNumber + 1, postContent.pageSize);
//     }}
//     disabled={postContent.lastPage}
//   >
//     <PaginationLink>Next</PaginationLink>
//   </PaginationItem>
// </Pagination>;
