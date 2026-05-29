import { apiSlice } from '../../../shared/api/apiSlice';
import type {
  LoginRequest,
  LoginResponse,
  RawLoginResponse,
} from '../types/auth.types';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: RawLoginResponse): LoginResponse => ({
        token: response.access_token,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
