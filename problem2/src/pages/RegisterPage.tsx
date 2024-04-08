import { Button, Col, Form, Input, Row } from "antd";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const onFinish = async (values: any) => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/users",
      values
    );
    if (response.data.success) toast("Created Successfully");
    else toast("Created Failed");
  };
  return (
    <Col className="min-h-screen flex flex-col gap-y-2 justify-center items-center bg-[#34e8eb]">
      <Form onFinish={onFinish} labelCol={{ span: 24 }}>
        <Row className="gap-x-2">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Enter your first name!" },
              { min: 3, message: "First name must be at least 3 characters" },
              {
                max: 15,
                message: "First name must be less than 15 characters",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Enter your last name!" },
              { min: 3, message: "Last name must be at least 3 characters" },
              { max: 15, message: "Last name must be less than 15 characters" },
            ]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Enter your email!" },
            { type: "email", message: "Your email is not valid" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Enter your password!" },
            { min: 5, message: "Password must be at least 5 characters" },
            { max: 15, message: "Password must be less than 15 characters" },
          ]}
        >
          <Input.Password type="password" />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="w-full text-center"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </Col>
  );
};

export default RegisterPage;
