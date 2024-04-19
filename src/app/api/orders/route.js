import { connectToDB } from "@/utlis/database";
import Order from "@/models/order";
import User from "@/models/user";
import {getServerSession} from "next-auth";
import {handler} from "../auth/[...nextauth]/route";

export const GET = async(request) => {
    try {
        await connectToDB();
        const session = await getServerSession(handler);
        const userEmail = session?.user?.email;
        const user = await User.findOne({ email: userEmail });

        if (user) {
            const orders = await Order.find({ user: user._id });
            console.log(orders);
            return new Response(JSON.stringify(orders), { status: 200 });
        } else {
            // If the user is not found, return an error response
            return new Response("User not found", { status: 404 });
        }
    } catch(error) {
        return new Response("Failed to fetch", {
            status: 500
        })
    }
}