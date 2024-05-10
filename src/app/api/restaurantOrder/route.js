import { connectToDB } from "@/utlis/database";
import Order from "@/models/order";

export const GET = async(request) => {
    try {
        await connectToDB();

        const orders = await Order.find()
        return new Response(JSON.stringify(orders), {
            status: 200
        })
    } catch(error) {
        return new Response("Failed to fetch", {
            status: 500
        })
    }
}