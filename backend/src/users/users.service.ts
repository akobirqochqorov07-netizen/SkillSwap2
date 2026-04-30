import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                skills: true,
            },
        });
    }

    async findAll() {
        return this.prisma.user.findMany({
            include: {
                skills: true,
            },
        });
    }

    async update(id: string, data: any) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async updateSkillScore(userId: string, newScore: number) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const currentScore = user?.skillScore || 0;

        return this.prisma.user.update({
            where: { id: userId },
            data: {
                skillScore: Math.round((currentScore + newScore) / 2),
            },
        });
    }
}
