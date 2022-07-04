import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('request-token')
  async getRequestToken(@Req() request: Request) {
    const { callback_url } = request.query;
    if (!callback_url) return null;
    return this.appService.getRequestToken(callback_url as string);
  }

  @Get('access-token')
  async getAccessToken(@Req() request: Request) {
    const { oauth_token, oauth_token_secret, oauth_verifier } = request.query;
    return await this.appService.getAccessToken(
      oauth_token as string,
      oauth_token_secret as string,
      oauth_verifier as string,
    );
  }

  @Post('tweet')
  async postTweet(@Req() request: Request) {
    const { accessToken, accessSecret, text } = request.body;
    await this.appService.postTweet(accessToken, accessSecret, text);
  }
}
