import React, { useState, useContext } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody
} from "reactstrap";

import JoblyApi from "./Api";
import UserContext from "./UserContext";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const intialState = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  };

  const [formData, setFormData] = useState(intialState);

  const [saveConfirmed, setSaveConfirmed] = useState(false);

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.saveProfile(username, profileData);
    } catch (err) {
      console.log(err);
      return;
    }

    setFormData((f) => ({ ...f, password: "" }));
    setSaveConfirmed(true);
    setCurrentUser(updatedUser);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
  }

  return (
    <div className="col-md-6">
      <h3>Profile</h3>
      <Card>
        <CardBody>
          <div>Username</div>
          <p className="lead">{formData.username}</p>
          <Form>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={handleChange}
                name="email"
                value={formData.email}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">
                Confirm password to make changes:
              </Label>
            </FormGroup>
            <FormGroup>
              <Input
                onChange={handleChange}
                type="password"
                name="password"
                value={formData.password}
              />
              {saveConfirmed ? <div className="my-3" style={{color: 'green'}}> Updated successfully </div> : null}
            </FormGroup>
            <Button className="my-3 btn btn-primary" onClick={handleSubmit}>
                Save Changes
              </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProfileForm;
