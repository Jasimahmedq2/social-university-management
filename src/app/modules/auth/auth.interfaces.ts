export type ILoginInfo = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken: string;
};
export type IRefreshResponse = {
  accessToken: string;
};
