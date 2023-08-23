import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '@services/auth.service';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '@services/dto/response.dto';
import { LoginRequestDto } from '@services/dto/auth/request.dto';
import { LoginResponseDto } from '@services/dto/auth/response.dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login admin',
    description: 'Authorization like admin user, using username and password.',
  })
  @ApiCreatedResponse({ type: LoginResponseDto })
  @ApiInternalServerErrorResponse({ type: ResponseDto })
  async login(@Body() loginData: LoginRequestDto, @Res({ passthrough: true }) res: Response): Promise<LoginResponseDto> {
    const result = await this._authService.login(loginData);
    res.cookie('access_token_tz_demo', result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 24 * 60 * 1000),
    });
    return result;
  }
}
