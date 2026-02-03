import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const valideRoles: string[] = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );

    if (!valideRoles || valideRoles.length === 0) {
      console.log('Warning: Roles is undefined by Guards');
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) {
      throw new BadRequestException('User is not exist');
    }
    for (const role of user.roles) {
      if (valideRoles.includes(role)) {
        return true;
      }
    }
    throw new ForbiddenException(
      `User ${user.name} nees a valid role . Valid Roles: [ ${valideRoles.join(', ')} ]`,
    );
  }
}
