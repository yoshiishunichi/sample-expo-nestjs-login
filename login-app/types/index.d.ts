export type AuthResult = {
  authentication: TokenResponse | null;
  error?: AuthError | null;
  errorCode: string | null;
  params: {
    [key: string]: string;
  };
  type: "error" | "success";
  url: string;
};

export type RequestToken = {
  url: string;
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: string;
};

export type AccountInformation = {
  userId: string;
  accessToken: string;
  accessSecret: string;
  photoUrl: string;
  screenName: string;
};
