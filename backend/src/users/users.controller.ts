import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('profile')
    async getProfile(@Request() req) {
        return this.usersService.findOne(req.user.userId);
    }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Patch('profile')
    async updateProfile(@Request() req, @Body() data: any) {
        return this.usersService.update(req.user.userId, data);
    }
}
