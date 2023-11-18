import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

const mockedToken = '123';
export const KeepExecution = Reflector.createDecorator<boolean>();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const keepExecution = this.reflector.get(
      KeepExecution,
      context.getHandler(),
    );

    if (keepExecution) {
      request.userAuthorized = token === mockedToken;
    } else {
      if (!token || token !== mockedToken) {
        throw new UnauthorizedException();
      }
    }

    request.authorized = true;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
