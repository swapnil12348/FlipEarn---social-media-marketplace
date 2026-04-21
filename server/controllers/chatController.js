//Controller for getiing chat(creating if not exists)

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
            existingChat = await
            
        }


    } catch (error) {
        
    }
}