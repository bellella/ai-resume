import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResumeJson, UserInfo } from '@ai-resume/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        defaultResumeJson: true,
        imageUrl: true,
        coins: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      defaultResumeJson: user.defaultResumeJson as ResumeJson,
      imageUrl: user.imageUrl,
      coins: user.coins,
    };
  }

  updateProfile(updateUserDto: UpdateUserDto) {
    // TODO: Implement profile update
    return 'This action updates the user profile';
  }

  uploadProfileImage(file: any) {
    // TODO: Implement profile image upload
    return 'This action uploads the profile image';
  }
}
