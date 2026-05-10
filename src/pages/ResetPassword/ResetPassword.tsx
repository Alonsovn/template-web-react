import React from "react";
import { Form, Input, Button, Layout, message } from "antd";
import type { FormProps } from "antd";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useResetPasswordMutation } from "../../features/auth/passwordApi";
import styles from "./ResetPassword.module.scss";

const { Header, Content } = Layout;

interface IResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onFinish: FormProps<IResetPasswordFormValues>["onFinish"] = async (
    values,
  ) => {
    if (!token) return;
    try {
      await resetPassword({ token, password: values.password }).unwrap();
      message.success("Password reset successfully. Please log in.");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Password reset failed";
      message.error(errorMessage);
    }
  };

  if (!token) {
    return (
      <Layout className={styles.layout}>
        <Header className={styles.header}>Reset Password</Header>
        <Content className={styles.content}>
          <div className={styles.form}>
            <p>Invalid or missing reset token.</p>
            <Link to="/login" className={styles.backLink}>
              Back to Login
            </Link>
          </div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>Reset Password</Header>
      <Content className={styles.content}>
        <Form
          name="resetPassword"
          className={styles.form}
          onFinish={onFinish}
        >
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
          >
            <Input.Password placeholder="New Password" className={styles.input} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm New Password"
              className={styles.input}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              loading={isLoading}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default ResetPassword;
