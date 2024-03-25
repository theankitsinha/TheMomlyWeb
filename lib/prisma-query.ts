import prisma from "@/lib/prisma";

export async function getPollsAndPosts() {
    return prisma.feeds.findMany({
        take: 20,
        orderBy: {
            id: 'desc',
        },
    });
}