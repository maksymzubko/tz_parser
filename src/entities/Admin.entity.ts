import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'admins' })
export class AdminEntity extends BaseEntity {
  @ApiProperty({ example: 'username' })
  @Column({ nullable: false })
  username: string;

  @ApiProperty({
    example: '1b21hb2hb1u2gu3g2fxy1v2ux1v2y3vu12g4u3ggvgu43598sa89da98sd79adshuavusdva9sdguasd',
  })
  @Column({ nullable: false })
  password: string;
}
