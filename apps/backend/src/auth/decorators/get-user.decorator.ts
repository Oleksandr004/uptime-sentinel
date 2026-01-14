import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Если в декоратор передано поле (например @GetUser('userId')), вернем только его
    return data ? user?.[data] : user;
  },
);