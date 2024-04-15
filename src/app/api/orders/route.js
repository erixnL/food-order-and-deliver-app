import { connectToDB } from "@/utlis/database";
import Order from "@/models/order";
import {getServerSession} from "next-auth";


export const GET = async(request) => {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;


        const orders = await Order.find({});
        return new Response(JSON.stringify(restaurants), {
            status: 200
        })
    } catch(error) {
        return new Response("Failed to fetch", {
            status: 500
        })
    }
}