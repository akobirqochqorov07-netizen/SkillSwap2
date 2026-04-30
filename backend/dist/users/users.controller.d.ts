import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<({
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
    updateProfile(req: any, data: any): Promise<{
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
