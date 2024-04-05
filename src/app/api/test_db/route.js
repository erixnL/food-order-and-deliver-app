import { connectToDB } from "@/utlis/database";

export const GET = async(request) => {
    try {
        await connectToDB();
        
        return new Response("MongoDB connection test successful", {
            status: 200
        })
    } catch(error) {
        return new Response("Failed to fetch", {
            status: 500
        })
    }
}