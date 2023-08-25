import { ApiProperty } from '@nestjs/swagger';
export class AdminResponseDto {
  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({
    example: '1b21hb2hb1u2gu3g2fxy1v2ux1v2y3vu12g4u3ggvgu43598sa89da98sd79adshuavusdva9sdguasd',
  })
  password: string;
}
