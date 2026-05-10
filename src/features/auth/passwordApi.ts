import { apiSlice } from "../../api/apiSlice";

interface IForgotPasswordRequest {
  email: string;
}

interface IResetPasswordRequest {
  token: string;
  password: string;
}

export const passwordApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<{ message: string }, IForgotPasswordRequest>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, IResetPasswordRequest>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = passwordApi;
