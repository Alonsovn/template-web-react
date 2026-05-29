import { Card, Layout, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../shared/store/store';
import { useLoginMutation } from '../api/authApi';
import LoginForm, { type LoginFormValues } from '../components/login-form/LoginForm';
import { useAuth } from '../hooks/useAuth';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  selectAuthError,
} from '../model/authSlice';
import styles from './Login.module.scss';

const { Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const error = useSelector((state: RootState) => selectAuthError(state));
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values: LoginFormValues) => {
    dispatch(loginStart());

    try {
      const response = await login(values).unwrap();
      setSession(response.token);
      dispatch(loginSuccess(response.token));
      navigate('/', { replace: true });
    } catch {
      dispatch(loginFailure('Invalid credentials'));
    }
  };

  return (
    <Layout className={styles.page}>
      <Content className={styles.content}>
        <Card className={styles.card}>
          <div className={styles.header}>
            <span className={styles.brand}>Template App</span>
            <Title level={2} className={styles.title}>
              Login
            </Title>
            <Text type="secondary" className={styles.subtitle}>
              Enter your credentials to continue
            </Text>
          </div>

          <LoginForm
            onSubmit={handleSubmit}
            loading={isLoading}
            error={error ?? undefined}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;