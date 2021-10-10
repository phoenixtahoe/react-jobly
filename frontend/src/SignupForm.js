import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Label, Input, Button } from "reactstrap";

function SignupForm({ signup }) {
  const history = useHistory();
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  async function sendUserData(e) {
    e.preventDefault();

    let res = await signup(formData);

    if (res.success) {
      history.push("/");
    } else {
      alert("Error creating account");
    }
  }

  return (
    <Form onSubmit={sendUserData}>
      <Label htmlFor="username">Username</Label>
      <Input
        required
        type="text"
        onChange={handleChange}
        id="username"
        name="username"
        value={formData.username}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        required
        onChange={handleChange}
        type="password"
        id="password"
        name="password"
        value={formData.password}
      />
      <Label htmlFor="first_name">First Name</Label>
      <Input
        required
        type="text"
        onChange={handleChange}
        id="first_name"
        name="firstName"
        value={formData.firstName}
      />
      <Label htmlFor="last_name">Last Name</Label>
      <Input
        required
        type="text"
        onChange={handleChange}
        id="last_name"
        name="lastName"
        value={formData.lastName}
      />
      <Label htmlFor="email">Email</Label>
      <Input
        required
        onChange={handleChange}
        type="email"
        id="email"
        name="email"
        value={formData.email}
      />
      <Button className="mt-2">Add Item</Button>
    </Form>
  );
}

export default SignupForm;
