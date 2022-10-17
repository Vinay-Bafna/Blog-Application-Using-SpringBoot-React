import React from "react";

import { Row, Col } from "reactstrap";
import CategoryCardView from "../Component/CategoryCardView";
import NewFeed from "./NewFeed";

const Home = () => {
  return (
    <Row className="border border-5">
      <Col md={{ size: 2 }} className="bg-primary">
        <CategoryCardView />
      </Col>
      <Col md={{ size: 10 }} className=" bg-info">
        <NewFeed />
      </Col>
    </Row>
  );
};
export default Home;
