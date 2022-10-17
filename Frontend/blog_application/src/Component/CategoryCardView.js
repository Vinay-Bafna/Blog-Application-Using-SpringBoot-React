import React, { useEffect, useState } from "react";
import { loadAllCategories } from "./../Service/category-services";
import { Card, Button, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const CategoryCardView = () => {
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setAllCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Button
        color="warning"
        tag={Link}
        to="/"
        style={{
          width: "100%",
        }}
        className="border border-0 rounded-0"
      >
        <h3>All Categories</h3>
      </Button>

      <Card>
        <ListGroup className="border border-0" flush>
          {allCategories &&
            allCategories.map((categories, index) => (
              <ListGroupItem
                tag={Link}
                to={"/category/" + categories.categoryId}
                key={index}
                action={true}
              >
                {categories?.title}
              </ListGroupItem>
            ))}
        </ListGroup>
      </Card>
    </div>
  );
};
export default CategoryCardView;
