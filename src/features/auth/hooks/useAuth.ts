import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../shared/store/store';
import { logout, restoreSession, selectAuth } from '../model/authSlice';
import { clearAuthToken, getAuthToken, setAuthToken } from '../model/authStorage';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => selectAuth(state));

  useEffect(() => {
    const token = getAuthToken();

    if (token && !auth.isAuthenticated) {
      dispatch(restoreSession(token));
    }
  }, [auth.isAuthenticated, dispatch]);

  const setSession = (token: string) => {
    setAuthToken(token);
    dispatch(restoreSession(token));
  };

  const clearSession = () => {
    clearAuthToken();
    dispatch(logout());
  };

  return {
    ...auth,
    setSession,
    clearSession,
  };
};

export default useAuth;