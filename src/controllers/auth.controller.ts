import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@services/auth.service';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '@services/dto/response.dto';
import { LoginRequestDto } from '@services/dto/auth/request.dto';
import { LoginResponseDto } from '@services/dto/auth/response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login admin',
    description: 'Authorization like admin user, using username and password.',
  })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiInternalServerErrorResponse({ type: ResponseDto })
  login(@Body() loginData: LoginRequestDto): Promise<LoginResponseDto> {
    return this._authService.login(loginData);
  }
}
