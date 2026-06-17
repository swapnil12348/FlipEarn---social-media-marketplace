// middlewares/authMiddleware.js
import { clerkClient } from "@clerk/express";
import prisma from "../configs/prisma.js";

export const protect = async (req, res, next) => {
    try {
        const { userId, has } = await req.auth();

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // ✅ Safety net: if Inngest hasn't synced the user yet, do it now
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            const clerkUser = await clerkClient.users.getUser(userId);

            await prisma.user.create({
                data: {
                    id: userId,
                    email: clerkUser.emailAddresses[0].emailAddress,
                    name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
                    image: clerkUser.imageUrl,
                }
            });
        }

        const hasPremiumPlan = await has({ plan: "premium" });
        req.plan = hasPremiumPlan ? "premium" : "free";

        return next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.code || error.message });
    }
};


export const protectAdmin = async (req, res,next) =>{
    try {
        const {user} = await clerkClient.users.getUser(await req.auth())
    } catch (error) {
        
    }
}