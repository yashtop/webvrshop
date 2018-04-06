import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class Login extends Component {
  render() {
    return (
      <div>
        <h2>Login</h2>
        <Form>
        <FormGroup>
          <Label for="exampleEmail">Username</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </FormGroup>
        </Form>
         <Button>Submit</Button>
      </div>
    );
  }
}

export default Login;
