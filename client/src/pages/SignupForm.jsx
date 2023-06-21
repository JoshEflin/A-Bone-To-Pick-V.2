import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert, Space } from "antd";
import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

const Signup = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [form] = Form.useForm();
  const [validated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    try {
      const { confirm, ...userData } = userFormData;
      console.log(userData)
      const response = await addUser({
        variables: { ...userData },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }
      Auth.login(response.data.addUser.token);
    } catch (err) {
      console.error(err);
      form.resetFields();
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
      confirm: "",
    });
  };

  return (
    <Form form={form} onFinish={handleFormSubmit}>
      {error && (
        <Alert
          dismissible
          message="Error"
          description="Something went wrong with your registration credentials!"
          type="error"
          closable
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        ></Alert>
      )}

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please choose a username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          value={userFormData.username}
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={userFormData.email}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
        hasFeedback
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        // label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          className="site-form-item-icon"
          type="password"
          placeholder="Confirm Password"
          name="confirm"
          onChange={handleInputChange}
          value={userFormData.confirm}
        />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Signup
        </Button>
        Or <a href="/login">Already a user? Login now!</a>
      </Form.Item>
    </Form>
  );
};
export default Signup;
