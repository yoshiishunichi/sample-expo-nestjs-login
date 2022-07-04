import { Platform } from "react-native";
import { makeRedirectUri, startAsync } from "expo-auth-session";
import {
  API_ACCESS_TOKEN_URL,
  API_REQUEST_TOKEN_URL,
  API_TWEET_URL,
  AUTH_ENDPOINT,
} from "../utils/endpoints";
import { AccountInformation, AuthResult, RequestToken } from "../types";
import ky from "ky";

export const toQueryString = (params: any) =>
  "?" +
  Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
    )
    .join("&");

export const twitterLogin = async () => {
  try {
    const useProxy = Platform.select({ default: true, web: false });
    const redirect = makeRedirectUri({ useProxy });
    const requestRes = await ky(
      `${API_REQUEST_TOKEN_URL}${toQueryString({
        callback_url: redirect,
      })}`,
      {
        method: "GET",
      }
    );
    const tokens = (await requestRes.json()) as RequestToken;
    const authResponse = await startAsync({
      authUrl: `${AUTH_ENDPOINT}${toQueryString(tokens)}`,
    });
    if (
      authResponse.type === "cancel" ||
      authResponse.type === "locked" ||
      authResponse.type === "error"
    )
      throw new Error("cancel auth");
    const authResponseResult = authResponse as AuthResult;
    if (authResponseResult.params && authResponseResult.params.denied)
      throw new Error("cancel auth");
    const { oauth_token, oauth_token_secret } = tokens;
    const accessRes = await ky(
      `${API_ACCESS_TOKEN_URL}${toQueryString({
        oauth_token,
        oauth_token_secret,
        oauth_verifier: authResponseResult.params.oauth_verifier,
      })}`,
      {
        method: "GET",
      }
    );
    return (await accessRes.json()) as AccountInformation;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const postTweet = async (
  { accessToken, accessSecret }: AccountInformation,
  text: string
) => {
  await ky.post(API_TWEET_URL, {
    json: {
      accessToken,
      accessSecret,
      text,
    },
  });
};
