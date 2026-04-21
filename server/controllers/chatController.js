//Controller for getiing chat(creating if not exists)

export const getChat = async (req, res)=>{
    try {
        const {userId} = await req.auth();
        const {listingId, chatId} = req.body;

        const listing = await prisma.listing.findUnique({
            where: {id: listingId}
        })

        
    } catch (error) {
        
    }
}