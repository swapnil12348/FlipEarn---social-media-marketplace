// Controller for adding listing to database

import prisma from "../configs/prisma";

export const addListing = async (req,res) => {
    try {
        const {userId} = await req.auth();
        if (req.plan !== "premium") {
            const listingCount = await prisma.listing.count({
                where: {ownerId: userId}
            })

            if (listingCount >= 5) {
                return res.status(400).json({message: "you have reached the free listing limit"})   
            }
        }

        const accountDetails = JSON.parse(req.body.accountDetails)

    } catch (error) {
        
    }
    
}