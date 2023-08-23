import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AdminResponseDto } from '@services/dto/admin/response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '@entities/Admin.entity';
import { Repository } from 'typeorm';
import { randomString } from 'helpers/helper';
import { ExceptionNotFound } from '@exceptions/http.exceptions';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly _adminRepository: Repository<AdminEntity>,
  ) {}

  async findUserByUsername(username: string): Promise<AdminEntity> {
    return this._adminRepository.findOneBy({ username });
  }

  async createAdmin(username: string, password: string): Promise<AdminEntity> {
    const admin = this._adminRepository.create({ username, password });
    await this._adminRepository.save(admin);
    return admin;
  }

  async validateAdmin(username: string, password: string): Promise<AdminEntity | null> {
    const admin = await this.findUserByUsername(username);

    if (!admin) throw new ExceptionNotFound('User with this username not found!');

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (isValidPassword) return admin;
    else return null;
  }

  // ONLY FOR TEST, SHOULD DELETE IN PROD
  async generateNew(): Promise<AdminResponseDto> {
    let randomName: string = randomString(7);

    while (await this.findUserByUsername(randomName)) randomName = randomString(7);

    const password = randomString(8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.createAdmin(randomName, hashedPassword);
    return { username: admin.username, password };
  }
}
