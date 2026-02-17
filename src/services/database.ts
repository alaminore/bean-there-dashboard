import { PrismaClient, Admin } from "@prisma/client";

const prisma = new PrismaClient;

export async function findAdminById ( id: number ): Promise<Admin|null> {
    const admin = await prisma.admin.findUnique ( {
        where: { id }
    });

    return admin;
}

export async function findAdminByUsername ( username: string ): Promise<Admin|null> {
    const admin = await prisma.admin.findUnique ( {
        where: { username }
    });

    return admin;
}

