import { ApiProperty } from '@nestjs/swagger';
export class LoginResponseDto {
  @ApiProperty({ example: 'access_token' })
  access_token: string;
}
