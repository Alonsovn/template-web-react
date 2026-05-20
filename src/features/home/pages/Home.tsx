import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from '../../../shared/store/hooks';
import styles from "./Home.module.scss";

const { Header, Content } = Layout;

const Home: React.FC = () => {
  const username = useAppSelector((state) => state.auth.username);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>Home Page</Header>
      <Content className={styles.content}>
        <h1>Hello</h1>
        {username ? <p>Logged in as: {username}</p> : null}
        <Link to="/login">Go to Login</Link>
      </Content>
    </Layout>
  );
};

export default Home;
