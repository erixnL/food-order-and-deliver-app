import { connectToDB } from "@/utlis/database";
import Order from "@/models/order";
import User from "@/models/user.js";



export const GET = async(request, {params}) => {
    try {
        await connectToDB();
        const user = await User.findById(params.id);
        console.log(user);

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