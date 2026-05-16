import React from "react";
import { Form, Input, Button, message } from "antd";
import type { FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import { useLoginMutation } from "../../authApi";
import { setCredentials } from "../../authSlice";
import styles from "./LoginForm.module.scss";

export interface ILoginFormValues {
  username: string;
  password: string;
  remember?: boolean;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish: FormProps<ILoginFormValues>["onFinish"] = async (values) => {
    try {
      const data = await login({
        username: values.username,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ username: data.name, token: data.token }));
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
  );
};

export default LoginForm;