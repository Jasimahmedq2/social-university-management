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
    profilePic?: string;
  };
};
export type IRefreshResponse = {
  accessToken: string;
};
