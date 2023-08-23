import { Module } from '@nestjs/common';
import { AuthController } from '@controllers/auth.controller';
import { AuthService } from '@services/auth.service';
import { AdminModule } from '@modules/admin.module';

@Module({
  imports: [AdminModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
