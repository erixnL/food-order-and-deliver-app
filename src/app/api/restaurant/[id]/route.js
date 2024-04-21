import { connectToDB } from "@/utlis/database";
import Restaurant from "@/models/restuarant";

export const GET = async(request, {params}) => {
    try {
        await connectToDB();
        console.log(params.id)
        const restaurant = await Restaurant.findById(params.id);
        return new Response(JSON.stringify(restaurant), {
            status: 200
        })
    } catch(error) {
        return new Response("Failed to fetch restaurant information", {
            status: 500
        })
    }   
}