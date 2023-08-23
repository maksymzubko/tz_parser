import { Controller, Post } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from '@services/admin.service';
import { ResponseDto } from '@services/dto/response.dto';
import { AdminResponseDto } from '@services/dto/admin/response.dto';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly _adminService: AdminService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'Generate admin',
    description: '!ONLY FOR TEST!',
  })
  @ApiOkResponse({ type: AdminResponseDto })
  @ApiInternalServerErrorResponse({ type: ResponseDto })
  generateNew(): Promise<AdminResponseDto> {
    return this._adminService.generateNew();
  }
}
