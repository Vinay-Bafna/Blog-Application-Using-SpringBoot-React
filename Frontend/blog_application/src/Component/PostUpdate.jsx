import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadAllCategories } from "../Service/category-services";
import {
  doGetSinglePost,
  updateUserPost,
  uploadFile,
} from "../Service/post-service";
import {
  Container,
  Card,
  CardBody,
  Label,
  Input,
  Form,
  Button,
} from "reactstrap";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";

function PostUpdate() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [allCategories, setAllCategories] = useState([]);
  const editor = useRef(null);

  const [post, setPost] = useState(null);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        // console.log(data);
        setAllCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    doGetSinglePost(postId)
      .then((response) => {
        console.log(response);
        setPost({ ...response, categoryId: response.category.categoryId });
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [ ]);

  const handlePost = (event, property) => {
    setPost({ ...post, [property]: event.target.value });
  };

  const [image, setImage] = useState(null);

  const handlechangeImage = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/PNG" ||
      event.target.files[0].type === "image/jpe" ||
      event.target.files[0].type === "image/JPE" ||
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/JPEG"
    ) {
      setImage(event.target.files[0]);
      console.log(image);
    } else {
      toast.error("Only PNG and JPEG file Supported!");
    }
  };

  const updatePostHandle = (event) => {
    event.preventDefault();

    updateUserPost(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then((response) => {
        uploadFile(image, response.postId)
          .then((response) => {
            console.log(response);
            toast.success("Image Uploaded Successfully!");
          })
          .catch((Error) => {
            console.log(Error);
          });
        //console.log(response);
        toast.success("Post updated Successfully!");
        navigate("/viewPost/" + post.postId);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const updateHtml = () => {
    return (
      <Container>
        <Card className="shadow-sm mt-3">
          <CardBody>
            <h3 className="text-center">Update Post:</h3>
            <Form onSubmit={updatePostHandle}>
              {/* {JSON.stringify(post)} */}
              <div className="my-3">
                <Label for="title">Title of Post :-</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter Here!"
                  className="rounded-0"
                  name="title"
                  value={post.title}
                  onChange={(event) => {
                    handlePost(event, "title");
                  }}
                />
              </div>
              <div className="my-3">
                <Label for="content">Post Content :-</Label>
                <br />
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange={(newContent) =>
                    setPost({ ...post, content: newContent })
                  }
                />
              </div>

              <div className="my-3">
                <Label for="Image">File:-</Label>
                <Input
                  id="Image"
                  name="file"
                  type="file"
                  onChange={(e) => {
                    handlechangeImage(e);
                  }}
                />
              </div>

              <div className="my-3">
                <Label for="category">Post Category :-</Label>
                <Input
                  id="category"
                  name="categoryId"
                  type="select"
                  className="rounded-0"
                  onChange={(event) => {
                    handlePost(event, "categoryId");
                  }}
                  value={post.categoryId}
                  //defaultValue={0}
                >
                  <option disabled value={0}>
                    --Select Categories---
                  </option>
                  {allCategories.map((categories) => (
                    <option
                      key={categories?.categoryId}
                      value={categories?.categoryId}
                    >
                      {categories?.title}
                    </option>
                  ))}
                </Input>
              </div>

              <div className="my-3 text-center">
                <Button type="submit" color="primary" className="rounded-0">
                  Update-Post
                </Button>
                <Button type="reset" color="danger" className="ms-2 rounded-0">
                  Reset
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  };

  return <Container>{post && updateHtml()}</Container>;
}
export default PostUpdate;
