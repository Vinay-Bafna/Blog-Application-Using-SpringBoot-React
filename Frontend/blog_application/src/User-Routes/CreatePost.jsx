import React, { useState, useRef, useEffect } from "react";
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
import { loadAllCategories } from "../Service/category-services";
import { doCreatePost, uploadFile } from "../Service/post-service";
import { getCurrentUserDetails } from "../auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreatePost = (event) => {
  const Navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const Editor = useRef(null);
  const [user, setUser] = useState(undefined);
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: 0,
  });
  const [image, setImage] = useState(null);
  const handlechangeImage = (event) => {
    if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/PNG" ||
      event.target.files[0].type === "image/jpe" ||
      event.target.files[0].type === "image/JPE" ||
      event.target.files[0].type === "image/jpeg"||
      event.target.files[0].type === "image/JPEG"
    ) {
      setImage(event.target.files[0]);
      console.log(image);
    } else {
      toast.error("Only PNG and JPEG file Supported!");
    }
  };

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        // console.log(data);
        setAllCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setUser(getCurrentUserDetails());
  }, []);

  const handlePost = (event, property) => {
    setPost({ ...post, [property]: event.target.value });
  };
  const contentEditorChanged = (data) => {
    setPost({ ...post, content: data });
  };

  const CreatePost = (event) => {
    event.preventDefault();
    if (post.title.trim() === "") {
      toast.error("Title Required!......");
      return;
    } else if (post.content.trim() === "") {
      toast.error("Post Content is Required!......");
      return;
    } else if (post.postCategoryID === 0) {
      toast.error("Category is Required!......");
      return;
    } else {
      post["userId"] = user.id;
      doCreatePost(post)
        .then((response) => {
          uploadFile(image, response.postId)
            .then((response) => {
              console.log(response);
              toast.success("Image Uploaded Successfully!");
            })
            .catch((Error) => {
              console.log(Error);
            });

          toast.success("Post Created Successfully!");
          // console.log(response);
          Navigate("/user/blogs");
        })
        .catch((error) => {
          //toast.error(error);
          console.log(error);
        });
    }
  };

  return (
    <Container>
      <Card className="shadow-sm mt-3">
        <CardBody>
          <h3>what going on?</h3>
          <Form onSubmit={CreatePost}>
            {/* {JSON.stringify(post)} */}
            <div className="my-3">
              <Label for="title">Title of Post :-</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter Here!"
                className="rounded-0"
                name="title"
                onChange={(event) => {
                  handlePost(event, "title");
                }}
              />
            </div>
            <div className="my-3">
              <Label for="content">Post Content :-</Label>
              <br />
              <JoditEditor
                ref={Editor}
                value={post.content}
                onChange={(newContent) => {
                  contentEditorChanged(newContent);
                }}
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
                  handlePost(event, "postCategoryID");
                }}
                defaultValue={0}
              >
                <option disabled value={0}>
                  --Select Categories---
                </option>
                {allCategories.map((categories) => (
                  <option key={categories?.categoryId} value={categories?.categoryId}>
                    {categories?.title}
                  </option>
                ))}
              </Input>
            </div>

            <div className="my-3 text-center">
              <Button type="submit" color="primary" className="rounded-0">
                Create-Post
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

export default CreatePost;
