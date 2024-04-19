import { connectToDB } from "@/utlis/database";
import Order from "@/models/order";
import User from "@/models/user.js";
import {getServerSession} from "next-auth";
import {hanlder} from "../auth/[...nextauth]/route.js";


export const GET = async(request) => {
    try {
        await connectToDB();
        const session = await getServerSession(hanlder);
        const userEmail = session?.user?.email;
        const user = await User.findOne({email: userEmail});

        if (user) {
            const orders = await Order.find({user: user._id});
        return new Response(JSON.stringify(orders), {
            status: 200
        })
        } else {
            return new Response("User not found", {status: 400});
        }
    } catch(error) {
        return new Response("Failed to fetch", {
            status: 500
        })
    }
}