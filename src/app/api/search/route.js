import { connectToDB } from "@/utlis/database";
import Restaurant from "@/models/restuarant";

export const GET = async(request) => {
    try {
        await connectToDB();
        const searchParams = new URLSearchParams(request[Symbol(state)].url.search);
        const keyword = searchParams.get("name");
        console.log(request[Symbol(state)].url.search);
        const restaurants = await Restaurant.find({ name: keyword}).exec();
        
        return new Response(JSON.stringify(restaurants), {
            status: 200
        });
    } catch(error) {
        return new Response("Failed to fetch restaurant information", {
            status: 500
        });
    }   
}