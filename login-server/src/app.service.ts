import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { consumer_key, consumer_secret } from './utils/datas';

@Injectable()
export class AppService {
  getClient() {
    return new TwitterApi({
      appKey: consumer_key,
      appSecret: consumer_secret,
    });
  }

  async getRequestToken(callBackUrl: string) {
    return await this.getClient().generateAuthLink(callBackUrl, {
      linkMode: 'authorize',
    });
  }

  async getAccessToken(
    access_token_key: string,
    access_token_secret: string,
    oauth_verifier: string,
  ) {
    const twitter = new TwitterApi({
      appKey: access_token_key,
      appSecret: access_token_secret,
      accessToken: access_token_key,
      accessSecret: access_token_secret,
    });
    const { userId, screenName, accessToken, accessSecret } =
      await twitter.login(oauth_verifier);
    return {
      userId,
      screenName,
      accessToken,
      accessSecret,
    };
  }
}
