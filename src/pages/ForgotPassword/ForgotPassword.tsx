import React from "react";
import { Form, Input, Button, Layout, message } from "antd";
import type { FormProps } from "antd";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/auth/passwordApi";
import styles from "./ForgotPassword.module.scss";

const { Header, Content } = Layout;

interface IForgotPasswordFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish: FormProps<IForgotPasswordFormValues>["onFinish"] = async (
    values,
  ) => {
    try {
      await forgotPassword({ email: values.email }).unwrap();
      message.success(
        "If that email exists, a reset link has been sent.",
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Request failed";
      message.error(errorMessage);
    }
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>Forgot Password</Header>
      <Content className={styles.content}>
        <Form
          name="forgotPassword"
          className={styles.form}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Email" className={styles.input} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              loading={isLoading}
            >
              Send Reset Link
            </Button>
          </Form.Item>

          <Link to="/login" className={styles.backLink}>
            Back to Login
          </Link>
        </Form>
      </Content>
    </Layout>
  );
};

export default ForgotPassword;
