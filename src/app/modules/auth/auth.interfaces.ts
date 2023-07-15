export type ILoginInfo = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    userId: string;
    email: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
  };
};
export type IRefreshResponse = {
  accessToken: string;
};
