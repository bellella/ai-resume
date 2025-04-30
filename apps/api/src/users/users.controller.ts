import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../types/request.types';
import { UserInfo } from '@ai-resume/types';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  getUserInfo(@Req() req: RequestWithUser): Promise<UserInfo> {
    return this.usersService.getUserInfo(req.user.id);
  }

  @Put('me')
  updateProfile(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(updateUserDto);
  }

  @Post('me/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfileImage(@UploadedFile() file: any) {
    return this.usersService.uploadProfileImage(file);
  }
}
