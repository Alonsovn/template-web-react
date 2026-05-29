import { Alert, Button, Form, Input } from 'antd';
import type { FC } from 'react';
import styles from './LoginForm.module.scss';

export interface LoginFormValues {
  username: string;
  password: string;
}

interface Props {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
  error?: string;
}

const LoginForm: FC<Props> = ({ onSubmit, loading = false, error }) => {
  return (
    <Form<LoginFormValues>
      layout="vertical"
      onFinish={onSubmit}
      className={styles.form}
      autoComplete="on"
    >
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          className={styles.alert}
        />
      )}

      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" autoComplete="username" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          placeholder="Password"
          autoComplete="current-password"
        />
      </Form.Item>

      <Form.Item className={styles.submitWrapper}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className={styles.button}
          block
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;