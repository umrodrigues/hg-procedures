import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    console.log('🛡️ JWT Guard - Authorization Header:', authHeader ? 'Presente' : 'Ausente');
    
    if (!authHeader) {
      console.error('❌ JWT Guard - Sem Authorization header');
    }
    
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.error('❌ JWT Guard - Erro:', err?.message || info?.message || 'Usuário não autenticado');
      throw err || new UnauthorizedException();
    }
    console.log('✅ JWT Guard - Usuário autenticado:', user.username);
    return user;
  }
}

