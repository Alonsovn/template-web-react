import React from "react";
import { Layout } from "antd";
import LoginForm from "../../features/auth/components/login-form/LoginForm";
import styles from "./Login.module.scss";

const { Header, Content } = Layout;

const Login: React.FC = () => (
  <Layout className={styles.layout}>
    <Header className={styles.header}>Login</Header>
    <Content className={styles.content}>
      <LoginForm />
    </Content>
  </Layout>
);

export default Login;