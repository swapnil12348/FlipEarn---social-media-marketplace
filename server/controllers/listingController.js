// Controller for adding listing to database

import imagekit from "../configs/imageKit";
import prisma from "../configs/prisma";
import fs from 'fs';

export const addListing = async (req, res) => {
    try {
        const { userId } = await req.auth();
        if (req.plan !== "premium") {
            const listingCount = await prisma.listing.count({
                where: { ownerId: userId }
            })

            if (listingCount >= 5) {
                return res.status(400).json({ message: "you have reached the free listing limit" })
            }
        }

        const accountDetails = JSON.parse(req.body.accountDetails)

        accountDetails.followers_count = parseFloat(accountDetails.followers_count)
        accountDetails.engagement_rate = parseFloat(accountDetails.engagement_rate)
        accountDetails.monthly_views = parseFloat(accountDetails.monthly_views)
        accountDetails.price = parseFloat(accountDetails.price)
        accountDetails.platform = accountDetails.platform.toLowerCase();
        accountDetails.nice = accountDetails.platform.toLowerCase()

        accountDetails.username.startsWith("@") ? accountDetails.username = accountDetails.username.slice(1) : null

        const uploadImages = req.files.map(async (file) => {


            const response = await imagekit.files.upload({
                file: fs.createReadStream(file.path),
                fileName: `${Date.now()}.png`,
                folder: "flip-earn",
                transformation: { pre: "w-1280, h-auto" }

            });

            return response.url

        })

        // Wait for all uploads to complete

        const images = await Promise.all(uploadImages)

        const listing = await prisma.listing.create({
            data: {
                ownerId: userId,
                images,
                ...accountDetails
            }
        })

        return res.status(201).json({ message: "account Listed successfully", listing })


    } catch (error) {

        console.log(error);
        res.status(500).json({ message: error.code || error.message })

    }

}

//Controller ofr Getting All Public Listing


export const getAllPublicListing = async (req, res) => {
    try {
        const listings = await prisma.listing.findMany({
            where: { status: "active" },
            include: { owner: true },
            orderBy: { createdAt: "desc" },

        })

        if (!listings || listings.length === 0) {
            return res.json({ listings: [] });
        }

        return res.json({ listings });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message })
    }
}

// Controller for getting all user listing

export const getAllUserListing = async (req, res) => {
    try {
        const { userId } = await req.auth();
        // get all listings except deleted

        const listings = await prisma.listing.findMany({
            where: { ownerId: userId, status: { not: "deleted" } },
            orderBy: { createdAt: "desc" }
        })

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        const balance = {
            earned: user.earned,
            withdrawn: user.withdrawn,
            available: user.earned - user.withdrawn
        }

        if (!listings || listings.length === 0) {
            return res.json({ listings: [], balance });

        }

        return res.json({ listings, balance })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message })

    }
}


// Controller for updating listing in database

export const updateListing = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const accountDetails = JSON.parse(req.body.accountDetails)

        if (req.files.length + accountDetails.images.length > 5) {
            return res.status(400).json({ message: "You can only upload up to 5 images" })
        }

        accountDetails.followers_count = parseFloat(accountDetails.followers_count)
        accountDetails.engagement_rate = parseFloat(accountDetails.engagement_rate)
        accountDetails.monthly_views = parseFloat(accountDetails.monthly_views)
        accountDetails.price = parseFloat(accountDetails.price)
        accountDetails.platform = accountDetails.platform.toLowerCase();
        accountDetails.niche = accountDetails.niche.toLowercase();

        accountDetails.username.startsWith("@") ? accountDetails.username = accountDetails.username.slice(1) : null

        const listing = await prisma.listing.update({
            where: { id: accountDetails.id, ownerId: userId },
            data: accountDetails
        })

        if (!listing) {
            return res.status(400).json({ message: "Listing not found" });
        }

        if (listing.status === "sold") {
            return res.status(400).json({ message: "you can't update sold listing" })
        }

        if (req.files.length > 0) {
            const uploadImages = req.files.map(async (file) => {

                const response = await imagekit.files.upload({


                    file: fs.createReadStream(file.path),
                    fileName: `${Date.now()}.png`,
                    folder: "flip-earn",
                    transformation: { pre: "w-1280, h-auto" }
                });
                return response.url
            })

                // wait for all uploads to complete 

                const images = await Promise.all(uploadImages);

                const listing = await prisma.listing.update({
                    where: { id: accountDetails.id, ownerId: userId },
                    data: {
                        ownerId: userId,
                        ...accountDetails,
                        images: [...accountDetails.images, ...images]
                    }
                })

                return res.json ({message: "Account Updated successsfully", listing})
        }

        return res.json ({message: "Account Updated successfully", listing})



    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.code || error.message})

    }
}



