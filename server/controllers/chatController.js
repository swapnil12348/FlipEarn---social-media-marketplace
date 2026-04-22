//Controller for getiing chat(creating if not exists)

import prisma from "../configs/prisma";

export const getChat = async (req, res)=>{
    try {
        const {userId} = await req.auth();
        const {listingId, chatId} = req.body;

        const listing = await prisma.listing.findUnique({
            where: {id: listingId}
        })

        if (!listing) {
            return res.status(404).json({message: "Listing not found"});
        }

        //Find existing chat

        let exitingChat = null;

        if (chatId) {
            existingChat = await prisma.chat.findFirst({
                where: {id: chatId, OR: [{ chatUserId: userId}, {ownerUserId: userId}]},
                include: {listing: true, ownerUser: true, chatUser: true, messages: true}
            })
            
        }else{
            exitingChat = await prisma.chat.findFirst({
                where: {listingId, chatUserId: userId, ownerUserId: listing.ownerId},
                include: {listing: true, ownerUser: true, chatUser: true, messages: true}
            })
        }


    } catch (error) {
        console.log(error)
        
    }
}