import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Table,
  Label,
  CardFooter,
} from "reactstrap";
import { getCurrentUserDetails } from "../auth";
import UserPosts from "./UserPosts";
import UserComments from "./UserComments";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    about: "",
    roles: [],
    id: "",
  });

  useEffect(() => {
    setProfile(getCurrentUserDetails());
  }, []);

  return (
    <>
      <Row>
        <Col md={{ offset: 1, size: 10 }} className="mt-3">
          <Card>
            <CardBody>
              <CardFooter>
                <Label className="h3">Profile: -</Label>

                <Card>
                  <CardBody>
                    <Row className="mt-1">
                      <Col md={{ size: 2, offset: 0 }}>
                        <img
                          alt="profile.png"
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          height="190px"
                          width="200px"
                        />
                      </Col>
                      <Col md={{ size: 6, offset: 1 }} className="mb-3">
                        <Table>
                          <tbody>
                            <tr>
                              <th scope="row">Name:-</th>
                              <td>{profile?.name}</td>
                            </tr>
                            <tr>
                              <th scope="row">Email:-</th>
                              <td>{profile?.email}</td>
                            </tr>
                            <tr>
                              <th scope="row">User-Access:-</th>
                              <td>{profile?.roles[0]?.name}</td>
                            </tr>
                            <tr>
                              <th scope="row">About:-</th>
                              <td>{profile?.about}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>{" "}
                    </Row>
                  </CardBody>
                </Card>
              </CardFooter>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Injecting User Posts Component! */}
      <UserPosts />
      {/* Injecting User Comment Component! */}
      <UserComments />
    </>
  );
};

export default UserProfile;
