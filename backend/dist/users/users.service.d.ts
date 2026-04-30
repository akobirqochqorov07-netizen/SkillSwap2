import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<({
        skills: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.SkillType;
            level: number;
            verified: boolean;
            userId: string;
        }[];
    } & {
        email: string;
        password: string;
        name: string;
        university: string | null;
        id: string;
        bio: string | null;
        skillScore: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    findAll(): Promise<({
        skills: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.SkillType;
            level: number;
            verified: boolean;
            userId: string;
        }[];
    } & {
        email: string;
        password: string;
        name: string;
        university: string | null;
        id: string;
        bio: string | null;
        skillScore: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    update(id: string, data: any): Promise<{
        email: string;
        password: string;
        name: string;
        university: string | null;
        id: string;
        bio: string | null;
        skillScore: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateSkillScore(userId: string, newScore: number): Promise<{
        email: string;
        password: string;
        name: string;
        university: string | null;
        id: string;
        bio: string | null;
        skillScore: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
