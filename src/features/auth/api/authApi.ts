import { apiSlice } from "../../../shared/api/apiSlice";

interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  name: string;
  token: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
