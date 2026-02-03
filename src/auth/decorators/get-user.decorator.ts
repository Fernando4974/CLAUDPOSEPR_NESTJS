import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator<
  keyof User | undefined,
  User | User[keyof User]
>(
  // 1. Usamos 'unknown' para 'data' inicialmente y luego validamos,
  // o lo hacemos opcional con 'keyof User'
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }

    // 2. Si no hay data ( @GetUser() ), devolvemos todo el usuario
    if (!data) return user;

    // 3. Verificamos si la propiedad existe
    if (!(data in user)) {
      throw new InternalServerErrorException(
        `Property "${String(data)}" not found in user`,
      );
    }

    // 4. Retornamos el valor (TypeScript ya sabe que data es una key válida)
    return user[data];
  },
);
