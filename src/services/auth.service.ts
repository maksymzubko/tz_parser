import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from '@services/dto/auth/request.dto';
import { LoginResponseDto } from '@services/dto/auth/response.dto';
import { AdminService } from '@services/admin.service';
import { ExceptionUnauthorized } from '@exceptions/http.exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _adminService: AdminService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(loginData: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this._adminService.validateAdmin(loginData.username, loginData.password);
    if (!user) throw new ExceptionUnauthorized('Incorrect user data!');

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
