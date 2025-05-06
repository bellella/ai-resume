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
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves the user information for the currently authenticated user.
   */
  @Get('me')
  getUserInfo(@Req() req: RequestWithUser): Promise<UserInfo> {
    return this.usersService.getUserInfo(req.user.id);
  }

  /**
   * Updates the profile of the currently authenticated user.
   */
  @Put('me')
  updateProfile(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(updateUserDto);
  }

  /**
   * Uploads a profile image for the currently authenticated user.
   */
  @Post('me/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfileImage(@UploadedFile() file: any) {
    return this.usersService.uploadProfileImage(file);
  }
}
