export interface LoginRequest {
  username: string;
  password: string;
}

export interface RawLoginResponse {
  access_token: string;
  token_type: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}