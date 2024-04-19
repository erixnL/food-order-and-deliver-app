import { connectToDB } from "@/utlis/database";
import Restaurant from "@/models/restuarant";

export const GET = async(request) => {
    try {
        await connectToDB();
        const restaurants = await Restaurant.find({});
        return new Response(JSON.stringify(restaurants), {
            status: 200
        })
    } catch(error) {
        return new Response("Failed to fetch", {
            status: 500
        })
    }
}