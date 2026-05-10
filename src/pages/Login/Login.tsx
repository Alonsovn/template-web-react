import React from "react";
import { Form, Input, Button, Layout, message } from "antd";
import type { FormProps } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUsername } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApi";
import styles from "./Login.module.scss";

const { Header, Content } = Layout;

interface ILoginFormValues {
  username: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.auth.username);
  const [login, { isLoading }] = useLoginMutation();

  const onFinish: FormProps<ILoginFormValues>["onFinish"] = async (values) => {
    try {
      const data = await login({
        username: values.username,
        password: values.password,
      }).unwrap();
      dispatch(setUsername(data.name));
      navigate("/");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      message.error(errorMessage);
    }
  };

  const onFinishFailed: FormProps<ILoginFormValues>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.error("Login submit failed", { errorInfo });
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>Login</Header>
      <Content className={styles.content}>
        <Form
          name="login"
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username or email!",
              },
            ]}
          >
            <Input placeholder="Username/Email" className={styles.input} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" className={styles.input} />
          </Form.Item>

          <Form.Item>
            <Link to="/forgot-password">Forgot password?</Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
              loading={isLoading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        {username ? <p>Logged in as: {username}</p> : null}
      </Content>
    </Layout>
  );
};

export default Login;
