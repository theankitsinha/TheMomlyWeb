import {PrismaClient} from '@prisma/client'
import {withAccelerate} from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
//@ts-ignore
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    }).$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma