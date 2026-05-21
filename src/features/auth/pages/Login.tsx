import React from "react";
import { Layout } from "antd";
import LoginForm from '../ui/login-form/LoginForm';

const { Header, Content } = Layout;

const Login: React.FC = () => (
  <Layout>
    <Header>Login</Header>
    <Content>
      <LoginForm />
    </Content>
  </Layout>
);

export default Login;