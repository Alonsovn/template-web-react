import { apiSlice } from "../../api/apiSlice";

interface IForgotPasswordRequest {
  email: string;
}

interface IForgotPasswordResponse {
  message: string;
  token: string;
}

interface IResetPasswordRequest {
  token: string;
  password: string;
}

interface IResetPasswordResponse {
  message: string;
}

export const passwordApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<IForgotPasswordResponse, IForgotPasswordRequest>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<IResetPasswordResponse, IResetPasswordRequest>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = passwordApi;
