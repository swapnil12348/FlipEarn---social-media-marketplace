// middlewares/authMiddleware.js
import { clerkClient } from "@clerk/express";
import prisma from "../configs/prisma.js";

export const protect = async (req, res, next) => {
    try {
        // ✅ We put 'await req.auth()' back!
        const { userId, has } = await req.auth();

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

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

        const hasPremiumPlan = has ? has({ plan: "premium" }) : false;
        req.plan = hasPremiumPlan ? "premium" : "free";

        return next();

    } catch (error) {
        console.error("🔥 Protect Middleware Crashed:", error);
        res.status(401).json({ message: error.message });
    }
};

export const protectAdmin = async (req, res, next) => {
    try {
        // ✅ We put 'await req.auth()' back!
        const authData = await req.auth();
        const userId = authData.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const user = await clerkClient.users.getUser(userId);

        const adminEmailsEnv = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || ""; 
        const isAdmin = adminEmailsEnv.split(",").includes(user.emailAddresses[0].emailAddress);

        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized - You are not an admin" });
        }

        return next();

    } catch (error) {
        console.error("🔥 ProtectAdmin Middleware Crashed:", error);
        res.status(401).json({ message: error.message });
    }
};