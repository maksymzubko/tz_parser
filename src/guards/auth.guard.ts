import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as process from 'process';
import { ExceptionUnauthorized } from '@exceptions/http.exceptions';
import { SKIP_AUTH_KEY } from '@decorators/skip-auth.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new ExceptionUnauthorized("Accept only 'Bearer' tokens!");
    }
    try {
      request['user'] = new Promise(async (resolve, reject) => {
        await this.jwtService
          .verifyAsync(token, {
            secret: process.env.JWT_SECRET,
          })
          .then((res) => resolve(res))
          .catch((err) => {
            if (err?.name === 'TokenExpiredError') {
              const decoded = this.jwtService.decode(token, { json: true });
              if (decoded['username'] && decoded['sub']) {
                const newToken = this.jwtService.sign({ username: decoded['username'], sub: decoded['sub'] });
                const date = new Date();
                date.setDate(date.getDate() + 1);
                response.cookie('access_token_tz_demo', newToken, {
                  httpOnly: false,
                  secure: false,
                  sameSite: 'lax',
                  expires: date,
                });
                resolve(decoded);
              }
            }
            reject(err);
          });
      });
    } catch {
      throw new ExceptionUnauthorized('Incorrect token!');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
