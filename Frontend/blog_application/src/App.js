import React from "react";
import "./App.css";
import Home from "./Component/Home";
import { Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";

import CreateCategory from "./User-Routes/CreateCategory";

import About from "./Component/About";
import Login from "./Login-Registration-Logout/Login";
import CreatePost from "./User-Routes/CreatePost";
import Registrtion from "./Login-Registration-Logout/Registrtion";
import ForgotPass from "./Login-Registration-Logout/Forgotpass";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./Component/PrivateRoutes";
import UserProfile from "./User-Routes/UserProfile";
import MainNavbar from "./Component/MainNavbar.jsx";
import UserPosts from "./User-Routes/UserPosts";

import ViewPost from "./Component/ViewPost";
import UserComments from "./User-Routes/UserComments";
import Category from "./Component/Category";
import PostUpdate from "./Component/PostUpdate";


class App extends React.Component {
  render() {
    return (
      <div>
        <MainNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/register" element={<Registrtion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewPost/:postId" element={<ViewPost />} />
          <Route path="/about" element={<About />} />

          <Route path="/user" element={<PrivateRoutes />}>
            <Route path="CreatePost" element={<CreatePost />} />
            <Route path="CreateCategory" element={<CreateCategory />} />
            <Route path="UserProfile" element={<UserProfile />} />
            <Route path="myposts" element={<UserPosts />} />
            <Route path="mycomment" element={<UserComments />} />
            <Route path="update-post/:postId" element={<PostUpdate />} />
          </Route>
        </Routes>

        <Container>
          <ToastContainer position="top-right" autoClose={1500} />
        </Container>
      </div>
    );
  }
}

export default App;
