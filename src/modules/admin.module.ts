import { Module } from '@nestjs/common';
import { AdminController } from '@controllers/admin.controller';
import { AdminService } from '@services/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from '@entities/Admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
