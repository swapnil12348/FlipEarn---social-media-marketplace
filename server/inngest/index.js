import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "profile-marketplace" });

// INNgest function to save user data to a database

const syncUserCreation = inngest.createFunction(
    {id: "sync-user-from-clerk" },
    {event: "clerk/user.created" },
    async({event}) =>{
        const {data} = event

        //check if user already exists in the database
        const user = await prisma.user.findFirst({
            where: {id: data.id},
           
        })

        if(user){
            //Update user data if it exists

            await prisma.user.update({
                where: {id:data.id},
                data:{
                email: data?.email_addresses[0]?.email_address,
                }
            })
        }
    }
)
    


// Create an empty array where we'll export future Inngest functions
export const functions = [];