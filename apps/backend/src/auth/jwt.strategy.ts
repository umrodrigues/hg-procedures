import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET') || 'secret-key';
    console.log('🔐 JWT_SECRET carregado no JwtStrategy:', secret.substring(0, 20) + '...');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    console.log('🔐 JWT Payload recebido:', payload);
    return { 
      userId: payload.sub, 
      username: payload.username,
      role: payload.role 
    };
  }
}

