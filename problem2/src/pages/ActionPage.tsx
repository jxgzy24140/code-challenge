import { Button, Col, Row, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
interface IUserDto {
  id: number;
  roleId: number;
  roleName: string;
  firstName: string;
  lastName: string;
  scores: number;
  email: string;
  createdDate: Date;
  updatedDate?: Date;
}

const ActionPage = () => {
  const [user, setUser] = useState<IUserDto>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getCurrentLoginInfo = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/get-current-login-infomation",
      {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
        },
      }
    );

    if (response.data.success) setUser(response.data.data);
  };
  useEffect(() => {
    getCurrentLoginInfo();
  }, []);

  const handleIncreaseScores = async (userId: number, value: number) => {
    const response = await axios.patch(
      `http://localhost:8000/api/v1/users/update-scores/${userId}`,
      {
        id: userId,
        scores: value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
        },
      }
    );

    if (response.data.success) {
      setUser(response.data.data);
      toast(`You earned ${value} scores, keep going!`);
    } else toast("Something went wrong, please try again!");
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);

    const response = await axios.post(
      "http://localhost:8000/api/v1/auth/login",
      values
    );
    if (response?.data.success) {
      localStorage.setItem("accessToken", response?.data?.data?.accessToken);
      setUser(response?.data?.data?.user);
    }
    setIsLoading(false);
  };

  return (
    <Col className="min-h-screen flex flex-col gap-y-2 justify-center items-center bg-[#34e8eb]">
      {user ? (
        <div>
          <Row className="justify-center items-center mb-20 text-black text-3xl">
            Hi! {user.firstName + user.lastName}. Your scores are {user.scores}
          </Row>
          <Row className="gap-5">
            <Button
              type="primary"
              onClick={() => handleIncreaseScores(user.id, 1)}
            >
              Click to earn 1 score
            </Button>
            <Button
              type="primary"
              onClick={() => handleIncreaseScores(user.id, 5)}
            >
              Click to earn 5 score
            </Button>
            <Button
              type="primary"
              onClick={() => handleIncreaseScores(user.id, 10)}
            >
              Click to earn 10 score
            </Button>
          </Row>
        </div>
      ) : (
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="flex flex-col justify-start"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Input your email" },
              { type: "email", message: "Your email is invalid!" },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Input your password" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="w-full"
              disabled={isLoading}
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      )}
      <ToastContainer autoClose={3000} />
    </Col>
  );
};

export default ActionPage;
