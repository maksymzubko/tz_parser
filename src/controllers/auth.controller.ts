import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '@services/auth.service';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '@services/dto/response.dto';
import { LoginRequestDto } from '@services/dto/auth/request.dto';
import { LoginResponseDto } from '@services/dto/auth/response.dto';
import { Request, Response } from 'express';

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
    const date = new Date();
    date.setDate(date.getDate() + 1);
    console.log(date);
    res.cookie('access_token_tz_demo', result.access_token, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      expires: date,
    });
    return result;
  }

  @Get('verify-token')
  @ApiOperation({
    summary: 'Verify token',
  })
  @ApiCreatedResponse({ type: Boolean })
  @ApiForbiddenResponse({ type: Boolean })
  @ApiInternalServerErrorResponse({ type: ResponseDto })
  async verifyToken(@Req() req: Request): Promise<boolean> {
    const dataArray = req.headers.authorization?.split(' ');
    if (dataArray?.length !== 2) return false;
    return await this._authService.verify(dataArray.at(1));
  }
}
